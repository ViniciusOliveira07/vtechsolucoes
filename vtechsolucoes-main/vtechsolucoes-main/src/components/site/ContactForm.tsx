import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <Field label="Nome" name="name" required />
      <Field label="Empresa" name="company" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Conte sobre o projeto" name="message" textarea required />

      <button
        type="submit"
        disabled={loading || sent}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all hover:opacity-85 disabled:opacity-60",
        )}
      >
        {sent ? (
          <>
            <Check className="h-4 w-4" />
            Mensagem enviada
          </>
        ) : loading ? (
          "Enviando…"
        ) : (
          <>
            Enviar mensagem
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}

function Field({ label, name, type = "text", textarea, required }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const isFloating = focused || value.length > 0;

  const baseClass =
    "peer w-full bg-transparent border-0 border-b border-border-strong px-0 pt-7 pb-3 text-base text-foreground outline-none transition-colors focus:border-primary";

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={cn(
          "pointer-events-none absolute left-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isFloating
            ? "top-1 text-xs text-muted-foreground"
            : "top-7 text-base text-muted-foreground",
        )}
      >
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          className={cn(baseClass, "resize-none")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          className={baseClass}
        />
      )}
    </div>
  );
}
