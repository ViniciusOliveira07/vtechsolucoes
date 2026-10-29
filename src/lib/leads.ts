import { z } from "zod";
import type { L, Locale } from "@/lib/i18n";

// Captação de leads compartilhada pelo formulário de contato e pelo download de materiais do blog.
// O aviso no grupo do WhatsApp (EVO) é feito pelo servidor em /api/lead, para que a apikey
// da instância nunca vá para o navegador.

const phoneRegex = /^[\d\s()+\-]{8,20}$/;

const FIELD_ERRORS: L<{ name: string; nameLong: string; phone: string; phoneLong: string; phoneChars: string; email: string; emailLong: string }> = {
  pt: {
    name: "Informe seu nome completo",
    nameLong: "Nome muito longo",
    phone: "Telefone inválido",
    phoneLong: "Telefone muito longo",
    phoneChars: "Use apenas números, espaços, +, ( ) e -",
    email: "Email inválido",
    emailLong: "Email muito longo",
  },
  en: {
    name: "Enter your full name",
    nameLong: "Name is too long",
    phone: "Invalid phone number",
    phoneLong: "Phone number is too long",
    phoneChars: "Use only numbers, spaces, +, ( ) and -",
    email: "Invalid email",
    emailLong: "Email is too long",
  },
  es: {
    name: "Ingrese su nombre completo",
    nameLong: "Nombre demasiado largo",
    phone: "Teléfono inválido",
    phoneLong: "Teléfono demasiado largo",
    phoneChars: "Use solo números, espacios, +, ( ) y -",
    email: "Email inválido",
    emailLong: "Email demasiado largo",
  },
};

/** Validação dos campos de contato, com as mensagens de erro no idioma de quem preenche. */
export function leadFieldsFor(locale: Locale) {
  const e = FIELD_ERRORS[locale];
  return {
    name: z.string().trim().min(2, e.name).max(100, e.nameLong),
    phone: z.string().trim().min(8, e.phone).max(20, e.phoneLong).regex(phoneRegex, e.phoneChars),
    email: z.string().trim().email(e.email).max(255, e.emailLong),
  };
}

/** Mesma validação, usada pelo servidor (as mensagens não chegam a ser exibidas). */
export const leadFields = leadFieldsFor("pt");

export function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export type Lead = { name: string; phone: string; email: string; message: string };
export type LeadSource = "contato" | "download" | "blog";

/**
 * Envia o lead para o grupo do WhatsApp (via /api/lead). Nunca lança erro:
 * uma falha de rede não pode travar o formulário nem o download.
 * `website` é o campo-armadilha para robôs (deve vir vazio).
 * `consentAt` é o momento (ISO) em que a pessoa marcou o aceite da política de privacidade;
 * vai junto para o grupo como registro do consentimento (LGPD).
 * `locale` é o idioma em que a pessoa navegava, para a equipe responder no mesmo idioma.
 */
export async function sendLead(lead: Lead, source: LeadSource, website: string, consentAt: string, locale: Locale = "pt") {
  const page = typeof window !== "undefined" ? window.location.href : undefined;

  await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, source, page, website, consent: true, consentAt, locale }),
  }).catch(() => undefined);
}

// Lembra os dados de quem já preencheu, para não pedir de novo no próximo download.
const SAVED_KEY = "vt-lead";

export function loadSavedLead(): Partial<Lead> {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveLead(lead: Pick<Lead, "name" | "phone" | "email">) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(lead));
  } catch {
    // armazenamento indisponível (aba anônima, bloqueio) — só não pré-preenche
  }
}

/** Campo-armadilha: invisível para pessoas, preenchido por robôs que leem o HTML. */
export const HONEYPOT_NAME = "website";
