import { useState, type FormEvent } from "react";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";

// ─── Configuração ────────────────────────────────────────────────────────────
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQAapbmB2I1EaMU8WPd92kfTe07_fRZeA08rUhSdOM_l2oGfk078p_JXPhX4bPTmWumA/exec";

// Número do WhatsApp no formato internacional (sem + ou espaços)
const WA_NUMBER = "5511544441926";
// ─────────────────────────────────────────────────────────────────────────────

const phoneRegex = /^[\d\s()+\-]{8,20}$/;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo")
    .max(100, "Nome muito longo"),
  phone: z
    .string()
    .trim()
    .min(8, "Telefone inválido")
    .max(20, "Telefone muito longo")
    .regex(phoneRegex, "Use apenas números, espaços, +, ( ) e -"),
  email: z
    .string()
    .trim()
    .email("Email inválido")
    .max(255, "Email muito longo"),
  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais sobre o projeto")
    .max(1000, "Mensagem muito longa"),
});

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = { name: "", phone: "", email: "", message: "" };

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function buildWhatsAppUrl(values: FormState) {
  const text =
    `Olá! Vim pelo site da Vtech Soluções e gostaria de iniciar um projeto.\n\n` +
    `*Nome:* ${values.name}\n` +
    `*Telefone:* ${values.phone}\n` +
    `*Email:* ${values.email}\n\n` +
    `*Sobre o projeto:*\n${values.message}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

    setLoading(true);

    // 1. Salva no Google Sheets (silencioso — não bloqueia o fluxo)
    if (APPS_SCRIPT_URL) {
      try {
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          // mode no-cors é necessário para Apps Script; a resposta não é lida
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name: values.name,
            phone: values.phone,
            email: values.email,
            message: values.message,
          }),
        });
      } catch {
        // Falha silenciosa — o lead ainda chegará pelo WhatsApp
      }
    }

    // 2. Abre WhatsApp com a mensagem pré-preenchida
    window.open(buildWhatsAppUrl(values), "_blank", "noopener,noreferrer");

    setLoading(false);
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Nome"
          name="name"
          required
          value={values.name}
          error={errors.name}
          onChange={(v) => setField("name", v)}
          onBlur={() => handleBlur("name")}
          autoComplete="name"
        />
        <Field
          label="Telefone"
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
        label="Email"
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
        label="Conte sobre o projeto"
        name="message"
        textarea
        required
        value={values.message}
        error={errors.message}
        onChange={(v) => setField("message", v)}
        onBlur={() => handleBlur("message")}
        maxLength={1000}
        helper={`${values.message.length}/1000`}
      />

      {submitError && (
        <p className="flex items-center gap-1.5 text-[13px] text-destructive">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {submitError}
        </p>
      )}

      <div className="pt-3">
        <button
          type="submit"
          disabled={loading || sent}
          className={cn(
            "group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 sm:w-auto sm:px-8 sm:py-4",
            "shadow-[0_0_24px_-6px_oklch(0.62_0.21_258_/_0.7)] hover:shadow-[0_0_32px_-4px_oklch(0.7_0.22_255_/_0.9)] hover:scale-[1.02]",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none",
          )}
        >
          {sent ? (
            <>
              <Check className="h-4 w-4" />
              Mensagem enviada!
            </>
          ) : loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Enviando…
            </>
          ) : (
            <>
              Enviar mensagem
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
        {sent && (
          <p className="mt-4 text-sm text-muted-foreground">
            Seu WhatsApp foi aberto com a mensagem pronta. Basta enviar!
          </p>
        )}
      </div>
    </form>
  );
}

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
}

function Field({
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
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(error);

  const inputClass = cn(
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-[14px] text-foreground outline-none placeholder-white/20 transition-all duration-200",
    hasError
      ? "border-destructive/60 focus:border-destructive"
      : focused
        ? "border-primary/50 bg-white/[0.05]"
        : "border-white/[0.08] hover:border-white/[0.14]",
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[12px] font-medium tracking-wide text-white/40">
        {label}
        {required && <span className={cn("ml-0.5", hasError ? "text-destructive" : "text-primary/70")}>*</span>}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={5}
          value={value}
          maxLength={maxLength}
          placeholder="Descreva brevemente o que você precisa…"
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur(); }}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError}
          aria-describedby={error ? `${name}-error` : helper ? `${name}-helper` : undefined}
          className={cn(inputClass, "resize-none leading-relaxed")}
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
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur(); }}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError}
          aria-describedby={error ? `${name}-error` : undefined}
          className={inputClass}
        />
      )}

      <div className="flex min-h-[16px] items-center justify-between gap-3 text-[11px]">
        {hasError ? (
          <span id={`${name}-error`} className="flex items-center gap-1 text-destructive">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {error}
          </span>
        ) : (
          <span />
        )}
        {helper && !hasError && (
          <span id={`${name}-helper`} className="text-white/25">
            {helper}
          </span>
        )}
      </div>
    </div>
  );
}
