import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { AlertCircle, Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CONSENT_ERROR, Field, Honeypot, PrivacyConsent } from "@/components/site/ContactForm";
import { Events } from "@/lib/analytics";
import { formatPhone, HONEYPOT_NAME, leadFieldsFor, loadSavedLead, saveLead, sendLead } from "@/lib/leads";
import { absoluteUrl } from "@/lib/site";
import { LOCALES, useLocale, useT, type L } from "@/lib/i18n";
import type { Post } from "@/lib/blog";

// Uma versão do schema por idioma, para as mensagens de erro saírem no idioma de quem preenche
const SCHEMAS = Object.fromEntries(LOCALES.map((l) => [l, z.object(leadFieldsFor(l))])) as L<
  z.ZodObject<ReturnType<typeof leadFieldsFor>>
>;
type Values = z.infer<(typeof SCHEMAS)["pt"]>;
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", phone: "", email: "" };

const TEXT = {
  pt: {
    button: "Baixar em PDF",
    doneTitle: "Download iniciado",
    doneDesc: (title: string) =>
      `O PDF de "${title}" está sendo salvo no seu dispositivo. Se o download não começou, use o botão abaixo.`,
    again: "Baixar novamente",
    back: "Voltar ao artigo",
    kicker: "Material em PDF",
    title: "Baixe este artigo",
    desc: (title: string) => `Informe seus dados para receber "${title}" em PDF.`,
    name: "Nome",
    email: "Email",
    phone: "Telefone",
    error: "Não foi possível gerar o PDF. Verifique sua conexão e tente de novo.",
    generating: "Gerando PDF…",
    submit: "Baixar PDF",
  },
  en: {
    button: "Download as PDF",
    doneTitle: "Download started",
    doneDesc: (title: string) =>
      `The PDF of "${title}" is being saved to your device. If the download did not start, use the button below.`,
    again: "Download again",
    back: "Back to the article",
    kicker: "PDF material",
    title: "Download this article",
    desc: (title: string) => `Enter your details to get "${title}" as a PDF.`,
    name: "Name",
    email: "Email",
    phone: "Phone",
    error: "Could not generate the PDF. Check your connection and try again.",
    generating: "Generating PDF…",
    submit: "Download PDF",
  },
  es: {
    button: "Descargar en PDF",
    doneTitle: "Descarga iniciada",
    doneDesc: (title: string) =>
      `El PDF de "${title}" se está guardando en su dispositivo. Si la descarga no comenzó, use el botón de abajo.`,
    again: "Descargar de nuevo",
    back: "Volver al artículo",
    kicker: "Material en PDF",
    title: "Descargue este artículo",
    desc: (title: string) => `Ingrese sus datos para recibir "${title}" en PDF.`,
    name: "Nombre",
    email: "Email",
    phone: "Teléfono",
    error: "No fue posible generar el PDF. Verifique su conexión e intente de nuevo.",
    generating: "Generando PDF…",
    submit: "Descargar PDF",
  },
};

export function DownloadPostButton({ post, className }: { post: Post; className?: string }) {
  const [open, setOpen] = useState(false);
  const t = useT(TEXT);
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
        {t.button}
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
  const locale = useLocale();
  const t = useT(TEXT);
  const schema = SCHEMAS[locale];
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
    const r = schema.shape[name].safeParse(v.trim());
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
    if (!consentAt) setConsentError(CONSENT_ERROR[locale]);
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
    // A mensagem vai para o grupo interno da equipe, por isso o rótulo fica em português.
    const leadSent = sendLead(
      { ...values, message: `[Download de material] ${post.title} — ${absoluteUrl(`/blog/${post.slug}`)}` },
      "download",
      honeypot,
      consentAt,
      locale,
    );
    try {
      const { downloadPostPdf } = await import("@/lib/post-pdf");
      await downloadPostPdf(post);
      await leadSent;
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const retry = async () => {
    try {
      const { downloadPostPdf } = await import("@/lib/post-pdf");
      await downloadPostPdf(post);
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
            <DialogTitle className="text-[1.375rem] font-medium tracking-[-0.02em]">{t.doneTitle}</DialogTitle>
            <DialogDescription className="text-[0.9375rem] text-muted-foreground">
              {t.doneDesc(post.title)}
            </DialogDescription>
            <div className="mt-2 flex flex-wrap gap-3">
              <button type="button" className="btn" onClick={retry}>
                {t.again}
              </button>
              <button type="button" className="btn btn-line" onClick={() => onOpenChange(false)}>
                {t.back}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="relative grid gap-4">
            <Honeypot />
            <div className="pr-8">
              <p className="kicker text-signal">{t.kicker}</p>
              <DialogTitle className="mt-3 text-[1.375rem] font-medium leading-tight tracking-[-0.02em]">
                {t.title}
              </DialogTitle>
              <DialogDescription className="mt-2 text-[0.9375rem] text-muted-foreground">
                {t.desc(post.title)}
              </DialogDescription>
            </div>
            <Field
              label={t.name}
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
              label={t.email}
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
              label={t.phone}
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
                {t.error}
              </p>
            )}
            <button type="submit" className="btn mt-1 w-full" disabled={status === "loading"}>
              {status === "loading" ? t.generating : t.submit}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
