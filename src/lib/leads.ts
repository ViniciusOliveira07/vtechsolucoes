import { z } from "zod";

// Captação de leads compartilhada pelo formulário de contato e pelo download de materiais do blog.
// Os dois enviam o mesmo formato para a mesma planilha, então o Apps Script atual não muda.

// ─── Configuração ────────────────────────────────────────────────────────────
export const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwQAapbmB2I1EaMU8WPd92kfTe07_fRZeA08rUhSdOM_l2oGfk078p_JXPhX4bPTmWumA/exec";

// ─── Integração EVO (preencher quando disponível) ────────────────────────────
const EVO_URL = ""; // Ex: "https://evo.suaempresa.com"
const EVO_INSTANCE = ""; // Ex: "vtech"
const EVO_API_KEY = ""; // Token de autenticação da instância
const EVO_GROUP_JID = ""; // Ex: "120363XXXXXXXX@g.us"
// ─────────────────────────────────────────────────────────────────────────────

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

/** Salva o lead na planilha e avisa o grupo via EVO (se configurado). Nunca lança erro. */
export async function sendLead(lead: Lead, title = "Forms Vtech Soluções") {
  // 1. Salva no Google Sheets (silencioso — não bloqueia o fluxo)
  if (APPS_SCRIPT_URL) {
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        // mode no-cors é necessário para Apps Script; a resposta não é lida
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp: new Date().toISOString(), ...lead }),
      });
    } catch {
      // Falha silenciosa
    }
  }

  // 2. Notifica grupo via EVO (silencioso — preencher constantes acima para ativar)
  if (EVO_URL && EVO_INSTANCE && EVO_API_KEY && EVO_GROUP_JID) {
    const evoText =
      `🆕 Novo Lead — ${title}\n\n` +
      `*Nome:* ${lead.name}\n` +
      `*Telefone:* ${lead.phone}\n` +
      `*Email:* ${lead.email}\n\n` +
      `*Mensagem:*\n${lead.message}`;
    try {
      await fetch(`${EVO_URL}/message/sendText/${EVO_INSTANCE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: EVO_API_KEY },
        body: JSON.stringify({ number: EVO_GROUP_JID, text: evoText }),
      });
    } catch {
      // Falha silenciosa
    }
  }
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
