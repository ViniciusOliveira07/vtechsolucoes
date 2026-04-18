import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="relative h-7 w-7">
                <div className="absolute inset-0 rounded-md bg-primary" />
                <div className="absolute inset-[5px] rounded-sm bg-background" />
                <div className="absolute inset-[9px] rounded-[2px] bg-primary" />
              </div>
              <span className="text-[15px] font-semibold tracking-tight">Vtech Soluções</span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Empresa de tecnologia B2B. Sites e sistemas inteligentes com IA — entregues no
              prazo, sem mensalidade.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-eyebrow">Navegação</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-muted-foreground hover:text-foreground">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-muted-foreground hover:text-foreground">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground hover:text-foreground">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-eyebrow">Contato</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:contato@vtechsolucoes.com"
                  className="text-foreground hover:text-primary"
                >
                  contato@vtechsolucoes.com
                </a>
              </li>
              <li className="text-muted-foreground">São Paulo · Brasil</li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Vtech Soluções. Todos os direitos reservados.</p>
          <p>Empresa de tecnologia B2B · CNPJ sob consulta</p>
        </div>
      </div>
    </footer>
  );
}
