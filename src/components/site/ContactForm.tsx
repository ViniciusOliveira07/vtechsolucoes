import { useState, type FormEvent } from "react";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Events } from "@/lib/analytics";
import { COMPANY } from "@/lib/site";
import { formatPhone, HONEYPOT_NAME, leadFieldsFor, saveLead, sendLead, type LeadSource } from "@/lib/leads";
import { LOCALES, useLocale, useT, type L, type Locale } from "@/lib/i18n";

const MESSAGE_ERRORS: L<{ short: string; long: string }> = {
  pt: { short: "Conte um pouco mais sobre o projeto", long: "Mensagem muito longa" },
  en: { short: "Tell us a bit more about the project", long: "Message is too long" },
  es: { short: "Cuéntenos un poco más sobre el proyecto", long: "Mensaje demasiado largo" },
};

function buildContactSchema(locale: Locale) {
  const e = MESSAGE_ERRORS[locale];
  return z.object({
    ...leadFieldsFor(locale),
    message: z.string().trim().min(10, e.short).max(1000, e.long),
  });
}

// Uma versão do schema por idioma (mensagens de erro no idioma de quem preenche), montada uma vez só
const CONTACT_SCHEMAS = Object.fromEntries(LOCALES.map((l) => [l, buildContactSchema(l)])) as L<
  ReturnType<typeof buildContactSchema>
>;

const TEXT = {
  pt: {
    name: "Nome",
    phone: "Telefone",
    email: "Email",
    message: "Conte sobre o projeto",
    sent: "Mensagem enviada!",
    sending: "Enviando…",
    submit: "Enviar mensagem",
    sentNote: "Seu WhatsApp foi aberto com a mensagem pronta. Basta enviar!",
  },
  en: {
    name: "Name",
    phone: "Phone",
    email: "Email",
    message: "Tell us about the project",
    sent: "Message ready",
    sending: "Sending…",
    submit: "Send message",
    sentNote: "WhatsApp opened with your message ready. Just hit send.",
  },
  es: {
    name: "Nombre",
    phone: "Teléfono",
    email: "Email",
    message: "Cuéntenos sobre el proyecto",
    sent: "Mensaje listo",
    sending: "Enviando…",
    submit: "Enviar mensaje",
    sentNote: "Su WhatsApp se abrió con el mensaje listo. Solo tiene que enviarlo.",
  },
};

// Mensagem pré-preenchida do WhatsApp, no idioma de quem preenche
const WHATSAPP_TEXT: L<{ intro: string; name: string; phone: string; email: string; about: string }> = {
  pt: {
    intro: "Olá! Vim pelo site da Vtech Soluções e gostaria de iniciar um projeto.",
    name: "Nome",
    phone: "Telefone",
    email: "Email",
    about: "Sobre o projeto",
  },
  en: {
    intro: "Hi! I came through the Vtech Soluções website and would like to start a project.",
    name: "Name",
    phone: "Phone",
    email: "Email",
    about: "About the project",
  },
  es: {
    intro: "¡Hola! Llegué por el sitio de Vtech Soluções y me gustaría iniciar un proyecto.",
    name: "Nombre",
    phone: "Teléfono",
    email: "Email",
    about: "Sobre el proyecto",
  },
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = { name: "", phone: "", email: "", message: "" };

function buildWhatsAppUrl(values: FormState, locale: Locale, context?: string) {
  const w = WHATSAPP_TEXT[locale];
  const text =
    `${w.intro}\n\n` +
    (context ? `${context}\n\n` : "") +
    `*${w.name}:* ${values.name}\n` +
    `*${w.phone}:* ${values.phone}\n` +
    `*${w.email}:* ${values.email}\n\n` +
    `*${w.about}:*\n${values.message}`;
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Formulário de contato. Usado na página de contato e na oferta do fim de cada artigo do blog.
 * `context` (ex.: oferta e artigo de origem) vai junto no aviso do grupo e na mensagem do WhatsApp,
 * para a equipe saber o que a pessoa pediu sem ter de perguntar. Os textos já vêm no idioma da página.
 */
export function ContactForm({
  source = "contato",
  context,
  messageLabel,
  messagePlaceholder,
  submitLabel,
  consentId = "contato-privacidade",
}: {
  source?: LeadSource;
  context?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  consentId?: string;
} = {}) {
  const locale = useLocale();
  const t = useT(TEXT);
  const contactSchema = CONTACT_SCHEMAS[locale];
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [consentAt, setConsentAt] = useState<string | null>(null);
  const [consentError, setConsentError] = useState<string>();

  const setField = (name: keyof FormState, value: string) => {
    const v = name === "phone" ? formatPhone(value) : value;
    setValues((s) => ({ ...s, [name]: v }));
    if (touched[name]) {
      const result = contactSchema.shape[name].safeParse(v.trim());
      setErrors((e) => ({ ...e, [name]: result.success ? undefined : result.error.issues[0].message }));
    }
  };

  const handleBlur = (name: keyof FormState) => {
    setTouched((t) => ({ ...t, [name]: true }));
    const result = contactSchema.shape[name].safeParse(values[name].trim());
    setErrors((e) => ({ ...e, [name]: result.success ? undefined : result.error.issues[0].message }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const result = contactSchema.safeParse(values);
    if (!consentAt) setConsentError(CONSENT_ERROR[locale]);
    if (!result.success) {
      const fieldErrors: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setTouched({ name: true, phone: true, email: true, message: true });
      return;
    }
    if (!consentAt) return;

    setLoading(true);
    Events.generateLead();

    // 1–2. Aviso no grupo do WhatsApp (silencioso: a conversa ainda abre no WhatsApp da pessoa)
    const honeypot = String(new FormData(e.currentTarget).get(HONEYPOT_NAME) ?? "");
    const message = context ? `${context}\n\n${values.message}` : values.message;
    await sendLead({ ...values, message }, source, honeypot, consentAt, locale);
    saveLead(values);

    // 3. Abre WhatsApp com a mensagem pré-preenchida
    window.open(buildWhatsAppUrl(values, locale, context), "_blank", "noopener,noreferrer");

    setLoading(false);
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full space-y-[clamp(0.5rem,1.6vh,1rem)]">
      <Honeypot />
      {/* nome e telefone lado a lado até no celular, para o formulário caber numa tela */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Field
          label={t.name}
          name="name"
          required
          value={values.name}
          error={errors.name}
          onChange={(v) => setField("name", v)}
          onBlur={() => handleBlur("name")}
          autoComplete="name"
        />
        <Field
          label={t.phone}
          name="phone"
          type="tel"
          required
          value={values.phone}
          error={errors.phone}
          onChange={(v) => setField("phone", v)}
          onBlur={() => handleBlur("phone")}
          autoComplete="tel"
          inputMode="tel"
        />
      </div>
      <Field
        label={t.email}
        name="email"
        type="email"
        required
        value={values.email}
        error={errors.email}
        onChange={(v) => setField("email", v)}
        onBlur={() => handleBlur("email")}
        autoComplete="email"
        inputMode="email"
      />
      <Field
        label={messageLabel ?? t.message}
        name="message"
        textarea
        required
        value={values.message}
        error={errors.message}
        onChange={(v) => setField("message", v)}
        onBlur={() => handleBlur("message")}
        maxLength={1000}
        helper={`${values.message.length}/1000`}
        placeholder={messagePlaceholder}
      />

      <PrivacyConsent
        id={consentId}
        checked={Boolean(consentAt)}
        error={consentError}
        onChange={(v) => {
          setConsentAt(v ? new Date().toISOString() : null);
          if (v) setConsentError(undefined);
        }}
      />

      {submitError && (
        <p className="flex items-center gap-1.5 text-[0.8125rem] text-destructive">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {submitError}
        </p>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={loading || sent}
          className="btn group w-full sm:w-auto sm:px-7"
        >
          {sent ? (
            <>
              <Check className="h-4 w-4" />
              {t.sent}
            </>
          ) : loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
              {t.sending}
            </>
          ) : (
            <>
              {submitLabel ?? t.submit}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
        {sent && (
          <p className="mt-4 text-sm text-muted-foreground">
            {t.sentNote}
          </p>
        )}
      </div>
    </form>
  );
}

/** Erro do aceite de privacidade, por idioma: `CONSENT_ERROR[locale]`. */
export const CONSENT_ERROR: L<string> = {
  pt: "Para enviar, aceite a política de privacidade.",
  en: "To submit, please accept the privacy policy.",
  es: "Para enviar, acepte la política de privacidad.",
};

const CONSENT_TEXT = {
  pt: { before: "Li e aceito a", link: "política de privacidade", after: "e autorizo o contato da Vtech Soluções." },
  en: { before: "I have read and accept the", link: "privacy policy", after: "and authorize Vtech Soluções to contact me." },
  es: { before: "He leído y acepto la", link: "política de privacidad", after: "y autorizo a Vtech Soluções a contactarme." },
};

/**
 * Aceite obrigatório da política de privacidade em todo formulário que coleta contato.
 * A caixa é o checkbox do Radix (sem o controle nativo do navegador); o texto inteiro
 * também marca/desmarca, e o link abre a política em outra aba sem perder o que foi digitado.
 */
export function PrivacyConsent({
  id,
  checked,
  error,
  onChange,
}: {
  id: string;
  checked: boolean;
  error?: string;
  onChange: (checked: boolean) => void;
}) {
  const t = useT(CONSENT_TEXT);
  return (
    <div className="grid gap-1">
      <div className="flex items-start gap-2.5">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(v) => onChange(v === true)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "mt-0.5 h-[1.125rem] w-[1.125rem] rounded-[0.3rem] border-border-strong bg-background data-[state=checked]:border-signal data-[state=checked]:bg-signal data-[state=checked]:text-background [&_svg]:h-3 [&_svg]:w-3",
            error && "border-destructive/70",
          )}
        />
        <label htmlFor={id} className="cursor-pointer text-[0.8125rem] leading-snug text-muted-foreground">
          {t.before}{" "}
          <a
            href="/politica-de-privacidade"
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            className="text-foreground underline underline-offset-2 hover:text-signal"
          >
            {t.link}
          </a>{" "}
          {t.after}
        </label>
      </div>
      {error && (
        <span id={`${id}-error`} role="alert" className="flex items-center gap-1 pl-7 text-[max(11px,0.6875rem)] text-destructive">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </span>
      )}
    </div>
  );
}

/** Campo-armadilha para robôs: fora da tela, fora da ordem de tabulação e escondido de leitores de tela. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[624.9375rem] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

const TEXTAREA_PLACEHOLDER = {
  pt: "Descreva brevemente o que você precisa…",
  en: "Briefly describe what you need…",
  es: "Describa brevemente lo que necesita…",
};

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text" | "numeric";
  maxLength?: number;
  helper?: string;
  placeholder?: string;
}

export function Field({
  label,
  name,
  type = "text",
  textarea,
  required,
  value,
  error,
  onChange,
  onBlur,
  autoComplete,
  inputMode,
  maxLength,
  helper,
  placeholder,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const defaultPlaceholder = useT(TEXTAREA_PLACEHOLDER);
  const hasError = Boolean(error);

  const inputClass = cn(
    "min-h-11 w-full rounded-lg border bg-background px-3.5 py-[clamp(0.5rem,1.4vh,0.75rem)] text-[0.9375rem] text-foreground outline-none placeholder:text-faint transition-colors duration-200",
    hasError
      ? "border-destructive/70 focus:border-destructive"
      : focused
        ? "border-signal"
        : "border-border-strong hover:border-faint",
  );

  return (
    <div className="flex min-w-0 flex-col gap-1">
      <label htmlFor={name} className="font-mono text-[0.75rem] text-muted-foreground">
        {label}
        {required && <span aria-hidden className={cn("ml-0.5", hasError ? "text-destructive" : "text-signal")}>*</span>}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={5}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder ?? defaultPlaceholder}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur(); }}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError}
          aria-describedby={error ? `${name}-error` : helper ? `${name}-helper` : undefined}
          className={cn(inputClass, "h-[clamp(4.5rem,13vh,9rem)] resize-none leading-relaxed")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          value={value}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur(); }}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError}
          aria-describedby={error ? `${name}-error` : undefined}
          className={inputClass}
        />
      )}

      {/* linha de erro/contador só ocupa espaço quando tem algo a mostrar */}
      {(hasError || helper) && (
        <div
          className={cn(
            "flex items-center justify-between gap-3 text-[max(11px,0.6875rem)]",
            !hasError && "hide-short", // o contador some em telas muito baixas; erro sempre aparece
          )}
        >
          {hasError ? (
            <span id={`${name}-error`} className="flex items-center gap-1 text-destructive">
              <AlertCircle className="h-3 w-3 shrink-0" />
              {error}
            </span>
          ) : (
            <span />
          )}
          {helper && !hasError && (
            <span id={`${name}-helper`} className="font-mono text-faint">
              {helper}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
