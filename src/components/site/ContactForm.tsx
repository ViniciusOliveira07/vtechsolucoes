import { useState, type FormEvent } from "react";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";

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

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
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

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading || sent}
          className={cn(
            "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-[0_12px_32px_-8px_rgba(255,255,255,0.3)]",
            "disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100",
          )}
        >
          {sent ? (
            <>
              <Check className="h-4 w-4" />
              Mensagem enviada
            </>
          ) : loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
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
            Recebemos sua mensagem. Retornaremos em até 24 horas úteis.
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
  const isFloating = focused || value.length > 0;
  const hasError = Boolean(error);

  const baseClass = cn(
    "peer w-full bg-transparent border-0 border-b px-0 pt-7 pb-3 text-base text-foreground outline-none transition-colors duration-300",
    hasError
      ? "border-destructive focus:border-destructive"
      : "border-border-strong focus:border-primary",
  );

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={cn(
          "pointer-events-none absolute left-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isFloating
            ? "top-1 text-xs"
            : "top-7 text-base",
          hasError
            ? "text-destructive"
            : isFloating && focused
              ? "text-primary"
              : "text-muted-foreground",
        )}
      >
        {label}
        {required && <span className={hasError ? "text-destructive" : "text-primary"}>*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          value={value}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur();
          }}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError}
          aria-describedby={error ? `${name}-error` : helper ? `${name}-helper` : undefined}
          className={cn(baseClass, "resize-none")}
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
          onBlur={() => {
            setFocused(false);
            onBlur();
          }}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError}
          aria-describedby={error ? `${name}-error` : undefined}
          className={baseClass}
        />
      )}

      {/* underline glow on focus */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 h-px bg-primary transition-all duration-500",
          focused && !hasError ? "w-full opacity-100" : "w-0 opacity-0",
        )}
      />

      <div className="mt-2 flex min-h-[18px] items-center justify-between gap-3 text-xs">
        {hasError ? (
          <span
            id={`${name}-error`}
            className="flex items-center gap-1.5 text-destructive animate-fade-in"
          >
            <AlertCircle className="h-3 w-3" />
            {error}
          </span>
        ) : (
          <span />
        )}
        {helper && !hasError && (
          <span id={`${name}-helper`} className="text-muted-foreground">
            {helper}
          </span>
        )}
      </div>
    </div>
  );
}
