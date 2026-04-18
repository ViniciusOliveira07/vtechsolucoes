import { ContactForm } from "@/components/site/ContactForm";

export function Contact() {
  return (
    <section className="relative bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-eyebrow mb-6">06 — Contato</p>
            <h2 className="text-display-md font-display mb-10">
              Vamos conversar<span className="text-primary">.</span>
            </h2>
            <ContactForm />
          </div>

          <div className="lg:col-span-5 lg:pl-12">
            <div className="space-y-10 lg:sticky lg:top-32">
              <div>
                <p className="text-eyebrow">Email</p>
                <a
                  href="mailto:contato@vtechsolucoes.com"
                  className="mt-3 block text-xl font-display tracking-tight text-foreground hover:text-primary"
                >
                  contato@vtechsolucoes.com
                </a>
              </div>
              <div>
                <p className="text-eyebrow">Localização</p>
                <p className="mt-3 text-xl font-display tracking-tight text-foreground">
                  São Paulo · Brasil
                </p>
              </div>
              <div>
                <p className="text-eyebrow">Atendimento</p>
                <p className="mt-3 text-xl font-display tracking-tight text-foreground">
                  Exclusivamente B2B
                </p>
              </div>
              <div>
                <p className="text-eyebrow">Responsta</p>
                <p className="mt-3 text-xl font-display tracking-tight text-foreground">
                  Até 24 horas úteis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
