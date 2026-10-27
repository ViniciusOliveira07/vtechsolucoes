import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { leadFields } from "@/lib/leads";

// Recebe o lead do site e avisa o grupo do WhatsApp pela Evolution API (EVO).
// As credenciais ficam em variáveis de ambiente da hospedagem, nunca no código do navegador:
//   EVO_URL        ex.: https://evo.suaempresa.com
//   EVO_INSTANCE   nome da instância
//   EVO_API_KEY    apikey da instância
//   EVO_GROUP_JID  ex.: 120363XXXXXXXXXXXX@g.us

const bodySchema = z.object({
  ...leadFields,
  message: z.string().trim().max(1500),
  source: z.enum(["contato", "download"]),
  page: z.string().max(300).optional(),
  // Campo invisível para humanos: se vier preenchido, é robô.
  website: z.string().max(200).optional(),
});

const TITLES = {
  contato: "Forms Vtech Soluções",
  download: "Download de material do blog",
} as const;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      GET: () => json({ ok: false, error: "use_post" }, 405),
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = bodySchema.safeParse(await request.json());
        } catch {
          return json({ ok: false, error: "corpo_invalido" }, 400);
        }
        if (!parsed.success) return json({ ok: false, error: "dados_invalidos" }, 400);
        const lead = parsed.data;
        if (lead.website) return json({ ok: true });

        const { EVO_URL, EVO_INSTANCE, EVO_API_KEY, EVO_GROUP_JID } = process.env;
        if (!EVO_URL || !EVO_INSTANCE || !EVO_API_KEY || !EVO_GROUP_JID) {
          return json({ ok: false, error: "evo_nao_configurada" }, 503);
        }

        const text =
          `🆕 Novo Lead — ${TITLES[lead.source]}\n\n` +
          `*Nome:* ${lead.name}\n` +
          `*Telefone:* ${lead.phone}\n` +
          `*Email:* ${lead.email}\n\n` +
          (lead.source === "contato" ? `*Sobre o projeto:*\n` : `*Material:*\n`) +
          `${lead.message}` +
          (lead.page ? `\n\n*Página:* ${lead.page}` : "");

        try {
          const r = await fetch(`${EVO_URL.replace(/\/+$/, "")}/message/sendText/${encodeURIComponent(EVO_INSTANCE)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", apikey: EVO_API_KEY },
            body: JSON.stringify({ number: EVO_GROUP_JID, text }),
            signal: AbortSignal.timeout(10_000),
          });
          if (!r.ok) {
            console.error("[lead] EVO respondeu", r.status, (await r.text()).slice(0, 300));
            return json({ ok: false, error: "evo_falhou" }, 502);
          }
        } catch (err) {
          console.error("[lead] falha ao chamar a EVO", err);
          return json({ ok: false, error: "evo_indisponivel" }, 502);
        }
        return json({ ok: true });
      },
    },
  },
});
