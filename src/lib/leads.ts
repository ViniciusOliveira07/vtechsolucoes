import { z } from "zod";

// Captação de leads compartilhada pelo formulário de contato e pelo download de materiais do blog.
// O aviso no grupo do WhatsApp (EVO) é feito pelo servidor em /api/lead, para que a apikey
// da instância nunca vá para o navegador.

// Planilha Google: mantida em paralelo só até a EVO estar ativa em produção.
// Quando o primeiro lead chegar no grupo, remover esta constante e o bloco que a usa.
export const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwQAapbmB2I1EaMU8WPd92kfTe07_fRZeA08rUhSdOM_l2oGfk078p_JXPhX4bPTmWumA/exec";

const phoneRegex = /^[\d\s()+\-]{8,20}$/;

export const leadFields = {
  name: z.string().trim().min(2, "Informe seu nome completo").max(100, "Nome muito longo"),
  phone: z
    .string()
    .trim()
    .min(8, "Telefone inválido")
    .max(20, "Telefone muito longo")
    .regex(phoneRegex, "Use apenas números, espaços, +, ( ) e -"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
};

export function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export type Lead = { name: string; phone: string; email: string; message: string };
export type LeadSource = "contato" | "download";

/**
 * Envia o lead para o grupo (via /api/lead) e para a planilha. Nunca lança erro:
 * uma falha de rede não pode travar o formulário nem o download.
 * `website` é o campo-armadilha para robôs (deve vir vazio).
 */
export async function sendLead(lead: Lead, source: LeadSource, website = "") {
  const page = typeof window !== "undefined" ? window.location.href : undefined;

  const toGroup = fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, source, page, website }),
  }).catch(() => undefined);

  const toSheet = APPS_SCRIPT_URL
    ? fetch(APPS_SCRIPT_URL, {
        method: "POST",
        // mode no-cors é necessário para Apps Script; a resposta não é lida
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp: new Date().toISOString(), ...lead }),
      }).catch(() => undefined)
    : Promise.resolve();

  await Promise.all([toGroup, toSheet]);
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
