
# Vtech Soluções — site corporativo Apple-like

Site institucional B2B em rota única (`/`) com 8 seções cinematográficas de 100vh, navegação por âncora suave e rotas separadas para páginas que precisam de SEO próprio (`/servicos`, `/portfolio`, `/contato`). Tudo em SSR no TanStack Start.

## Identidade visual

- **Paleta**: preto absoluto `#000`, branco puro `#FFF`, cinza muito escuro para superfícies, **azul elétrico `#0A84FF`** como acento único — usado com parcimônia (CTAs, hover states, glow do spotlight).
- **Tipografia**: stack neo-grotesque estilo Söhne/Neue Haas — usar **Inter Tight** (Google Fonts, com `font-feature-settings` ajustado e `letter-spacing` negativo agressivo). Display até ~120px com peso 600/700, corpo em 400.
- **Mood**: preto profundo, hierarquia tipográfica como protagonista, micro-interações refinadas.

## Recursos visuais "wow"

- **Spotlight do cursor**: gradiente radial azul que segue o mouse no fundo do hero e seções escuras. Hook reutilizável `useSpotlight`.
- **Cursor customizado**: ponto + halo que cresce sobre elementos interativos.
- **Scroll reveals**: stagger nas palavras/linhas (Framer Motion + IntersectionObserver) — frase de posicionamento se revela palavra a palavra.
- **Counters animados** nos diferenciais ("3×", "10+ projetos", etc.).
- **Hover magnético** nos botões e itens da lista de serviços.
- **Shimmer text** sutil no headline principal.
- **Linhas de grade animadas** no fundo do CTA final.
- **Glassmorphism real** (blur + borda de luz) no header sticky.

## Arquitetura de seções (home)

1. **Hero (100vh)** — headline em 2 linhas com letter-spacing negativo, sub em 1 linha, dois CTAs (`Iniciar projeto` / `Ver trabalhos`), fundo preto com spotlight do cursor + grid sutil.
2. **Posicionamento** — uma frase enorme centralizada, revelada palavra-por-palavra no scroll: *"Não somos uma agência. Somos uma empresa de tecnologia que resolve problemas reais com IA."*
3. **Serviços** — lista numerada vertical editorial (01 → 05), cada item com peso tipográfico forte; hover expande descrição com transição suave. Itens: Sites institucionais, Sistemas web, Automações com IA, Integrações, Consultoria tech.
4. **Como funciona** — timeline vertical com 4 etapas (Diagnóstico → Proposta fechada → Build com IA → Entrega), revelada em cascata no scroll.
5. **Diferenciais / Números** — 3 métricas em tipografia gigante, sem cards: **3× mais rápido**, **IA embarcada**, **Projeto fechado**. Números contam ao entrar na viewport.
6. **Portfólio** — 3 projetos fictícios com mockups gerados (cards grandes, full-bleed, hover com overlay azul + info do case). Setores: SaaS B2B, e-commerce industrial, plataforma logística.
7. **CTA final (100vh)** — frase única "Pronto para construir algo que funcione de verdade?" + botão único, fundo preto com aurora sutil.
8. **Contato + Footer** — formulário minimalista à esquerda (nome, empresa, email, mensagem) com validação visual elegante, infos de contato à direita (email, LinkedIn, localização). Footer tipográfico minimalista.

## Estrutura de rotas (SSR/SEO)

- `/` — home com todas as seções acima
- `/servicos` — página dedicada com detalhamento dos serviços (head meta próprio)
- `/portfolio` — grade dos cases (head meta próprio)
- `/contato` — formulário em página própria (head meta próprio)

Header sticky com glassmorphism aparece após scroll do hero, com indicador de seção ativa (bolinha que desliza). Menu mobile com animação de abertura cinematográfica (overlay full-screen).

## Componentização

- `Spotlight`, `MagneticButton`, `CustomCursor`, `RevealText`, `AnimatedCounter`, `SectionShell` (wrapper 100vh padrão), `Header`, `Footer`, `ContactForm`.
- Mockups de portfólio gerados como SVG/PNG estilizados (interfaces dark fictícias) — sem stock photos.

## O que NÃO faremos (regras travadas)

- Nada de cards uniformes com bordas finas, emojis como ícones, bento grids rasos, gradientes de acento espalhados, tipografia system pura, espaçamento apertado.
