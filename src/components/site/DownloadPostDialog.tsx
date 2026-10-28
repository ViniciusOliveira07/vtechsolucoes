import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { AlertCircle, Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CONSENT_ERROR, Field, Honeypot, PrivacyConsent } from "@/components/site/ContactForm";
import { Events } from "@/lib/analytics";
import { formatPhone, HONEYPOT_NAME, leadFields, loadSavedLead, saveLead, sendLead } from "@/lib/leads";
import { absoluteUrl } from "@/lib/site";
import type { Post } from "@/lib/blog";

const schema = z.object(leadFields);
type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", phone: "", email: "" };

export function DownloadPostButton({ post, className }: { post: Post; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          Events.ctaClick("Baixar material", "blog_post", post.slug);
        }}
        className={className ?? "btn btn-line"}
      >
        <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M2.5 13.5h11" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Baixar em PDF
      </button>
      <DownloadPostDialog post={post} open={open} onOpenChange={setOpen} />
    </>
  );
}

function DownloadPostDialog({
  post,
  open,
  onOpenChange,
}: {
  post: Post;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [consentAt, setConsentAt] = useState<string | null>(null);
  const [consentError, setConsentError] = useState<string>();

  // Pré-preenche com os dados de quem já preencheu algum formulário neste navegador.
  useEffect(() => {
    if (!open) return;
    const saved = loadSavedLead();
    setValues({ name: saved.name ?? "", phone: saved.phone ?? "", email: saved.email ?? "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
    // o aceite é pedido a cada envio, mesmo com os dados pré-preenchidos
    setConsentAt(null);
    setConsentError(undefined);
  }, [open]);

  const validate = (name: keyof Values, v: string) => {
    const r = leadFields[name].safeParse(v.trim());
    setErrors((e) => ({ ...e, [name]: r.success ? undefined : r.error.issues[0].message }));
  };

  const setField = (name: keyof Values, value: string) => {
    const v = name === "phone" ? formatPhone(value) : value;
    setValues((s) => ({ ...s, [name]: v }));
    if (touched[name]) validate(name, v);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(values);
    if (!consentAt) setConsentError(CONSENT_ERROR);
    if (!r.success) {
      const fe: Errors = {};
      for (const issue of r.error.issues) {
        const k = issue.path[0] as keyof Values;
        fe[k] ??= issue.message;
      }
      setErrors(fe);
      setTouched({ name: true, phone: true, email: true });
      return;
    }
    if (!consentAt) return;
    const honeypot = String(new FormData(e.currentTarget).get(HONEYPOT_NAME) ?? "");
    setStatus("loading");
    Events.generateLead(`download:${post.slug}`);
    saveLead(values);
    // O lead é enviado junto com a geração do arquivo; uma falha de rede não impede o download.
    const leadSent = sendLead(
      { ...values, message: `[Download de material] ${post.title} — ${absoluteUrl(`/blog/${post.slug}`)}` },
      "download",
      honeypot,
      consentAt,
    );
    try {
      const { downloadPostPdf } = await import("@/lib/post-pdf");
      downloadPostPdf(post);
      await leadSent;
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const retry = async () => {
    try {
      const { downloadPostPdf } = await import("@/lib/post-pdf");
      downloadPostPdf(post);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[28.75rem] gap-0 overflow-y-auto rounded-[0.875rem] border-border-strong bg-surface p-6 sm:p-8 [&>button]:right-3 [&>button]:top-3 [&>button]:inline-flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center">
        {status === "done" ? (
          <div className="grid gap-4 py-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ok/40 text-ok">
              <Check className="h-5 w-5" />
            </span>
            <DialogTitle className="text-[1.375rem] font-medium tracking-[-0.02em]">Download iniciado</DialogTitle>
            <DialogDescription className="text-[0.9375rem] text-muted-foreground">
              O PDF de "{post.title}" está sendo salvo no seu dispositivo. Se o download não começou, use o botão abaixo.
            </DialogDescription>
            <div className="mt-2 flex flex-wrap gap-3">
              <button type="button" className="btn" onClick={retry}>
                Baixar novamente
              </button>
              <button type="button" className="btn btn-line" onClick={() => onOpenChange(false)}>
                Voltar ao artigo
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="relative grid gap-4">
            <Honeypot />
            <div className="pr-8">
              <p className="kicker text-signal">Material em PDF</p>
              <DialogTitle className="mt-3 text-[1.375rem] font-medium leading-tight tracking-[-0.02em]">
                Baixe este artigo
              </DialogTitle>
              <DialogDescription className="mt-2 text-[0.9375rem] text-muted-foreground">
                Informe seus dados para receber "{post.title}" em PDF.
              </DialogDescription>
            </div>
            <Field
              label="Nome"
              name="dl-name"
              required
              value={values.name}
              error={errors.name}
              onChange={(v) => setField("name", v)}
              onBlur={() => {
                setTouched((t) => ({ ...t, name: true }));
                validate("name", values.name);
              }}
              autoComplete="name"
            />
            <Field
              label="Email"
              name="dl-email"
              type="email"
              required
              value={values.email}
              error={errors.email}
              onChange={(v) => setField("email", v)}
              onBlur={() => {
                setTouched((t) => ({ ...t, email: true }));
                validate("email", values.email);
              }}
              autoComplete="email"
              inputMode="email"
            />
            <Field
              label="Telefone"
              name="dl-phone"
              type="tel"
              required
              value={values.phone}
              error={errors.phone}
              onChange={(v) => setField("phone", v)}
              onBlur={() => {
                setTouched((t) => ({ ...t, phone: true }));
                validate("phone", values.phone);
              }}
              autoComplete="tel"
              inputMode="tel"
            />
            <PrivacyConsent
              id="dl-privacidade"
              checked={Boolean(consentAt)}
              error={consentError}
              onChange={(v) => {
                setConsentAt(v ? new Date().toISOString() : null);
                if (v) setConsentError(undefined);
              }}
            />
            {status === "error" && (
              <p role="alert" className="flex items-center gap-1.5 text-[0.8125rem] text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                Não foi possível gerar o PDF. Verifique sua conexão e tente de novo.
              </p>
            )}
            <button type="submit" className="btn mt-1 w-full" disabled={status === "loading"}>
              {status === "loading" ? "Gerando PDF…" : "Baixar PDF"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
