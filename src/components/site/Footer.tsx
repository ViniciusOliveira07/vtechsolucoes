import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-5 py-14 sm:px-8 md:py-16 lg:px-12 xl:px-16">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 md:grid-cols-12">
          <div className="sm:col-span-2 md:col-span-3">
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

          <div className="md:col-span-2">
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
                <Link to="/contato" className="text-muted-foreground hover:text-foreground">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-eyebrow">Serviços</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/servicos/sites-institucionais" className="text-muted-foreground hover:text-foreground">
                  Sites institucionais
                </Link>
              </li>
              <li>
                <Link to="/servicos/sistemas-web" className="text-muted-foreground hover:text-foreground">
                  Sistemas web
                </Link>
              </li>
              <li>
                <Link to="/servicos/automacoes-com-ia" className="text-muted-foreground hover:text-foreground">
                  Automações com IA
                </Link>
              </li>
              <li>
                <Link to="/servicos/integracoes" className="text-muted-foreground hover:text-foreground">
                  Integrações
                </Link>
              </li>
              <li>
                <Link to="/servicos/consultoria-tech" className="text-muted-foreground hover:text-foreground">
                  Consultoria tech
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-eyebrow">Legal</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  to="/politica-de-privacidade"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-de-cookies"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link
                  to="/termos-e-condicoes"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Termos e Condições
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-de-seguranca"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Política de Segurança
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-eyebrow">Contato</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/551154441926?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Vtech%20Solu%C3%A7%C3%B5es%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary"
                >
                  WhatsApp · +55 11 5444-1926
                </a>
              </li>
              <li className="text-muted-foreground">São Paulo · Brasil</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-[11px] text-muted-foreground sm:mt-16 sm:pt-8 sm:text-xs md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Vtech Soluções. Todos os direitos reservados.</p>
          <p>Empresa de tecnologia B2B · CNPJ sob consulta</p>
        </div>
      </div>
    </footer>
  );
}
