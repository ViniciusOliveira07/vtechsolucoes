
# Novo Header — pílula flutuante estilo "Teku AI"

Substituir o header atual (full-width com glassmorphism) por uma **pill bar flutuante centralizada** no topo, inspirada na referência mas elevada em qualidade.

## Visual

- **Container**: pílula (`rounded-full`) flutuando a ~16px do topo, centralizada horizontalmente, com largura máxima ~880px (auto-shrink no mobile).
- **Fundo**: glassmorphism real — preto com 60% de opacidade, `backdrop-blur(24px) saturate(180%)`, borda de 1px em `white/10`, e um leve **inner glow** (box-shadow interno azul muito sutil) para dar a sensação premium que falta na referência.
- **Logo (esquerda)**: mantém o ícone geométrico azul + wordmark "Vtech **Soluções**" (Soluções em azul elétrico, como o "AI" da referência).
- **Nav (centro)**: links Início, Serviços, Contato. Item ativo recebe **cor azul + um pill highlight animado** que desliza entre os itens no hover (efeito "magic line" estilo Linear/Vercel) — supera a referência que só muda a cor.
- **CTA (direita)**: botão pílula branco "Iniciar projeto" com texto preto, hover com leve scale.

## Comportamento

- **Sempre flutuante** (não muda no scroll — a pílula já é visualmente destacada por design). Apenas adiciona uma sombra mais forte ao rolar para reforçar elevação.
- **Entrada**: fade + slide-down de 8px no mount (300ms).
- **Hover na nav**: o "pill highlight" (background sutil branco/5%) faz morph entre os itens com `layoutId` do Framer Motion — transição suave em ~300ms.
- **Mobile (<768px)**: pílula vira só logo + ícone hamburger; CTA e nav vão pro overlay full-screen (já existente, mantido com pequenos ajustes visuais).

## Detalhes técnicos

- Reescrever `src/components/site/Header.tsx`:
  - Trocar `fixed inset-x-0` por `fixed top-4 left-1/2 -translate-x-1/2` + `max-w-[880px] w-[calc(100%-2rem)]`.
  - Container com classes: `rounded-full border border-white/10 bg-black/60 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]`.
  - Implementar magic-pill com `framer-motion` (já instalado): `motion.div` com `layoutId="nav-pill"` posicionado no item em hover/active.
  - Wordmark com "Soluções" em `text-primary` (azul) para espelhar o "AI" azul-ciano da referência.
- Ajustar `src/styles.css` se necessário (adicionar utilitário `.pill-glass` opcional — provavelmente não preciso, classes inline bastam).
- `main` no `__root.tsx` não precisa de mudança — o header já era `fixed`. O Hero atual já tem `padding-top` suficiente, mas vou verificar e ajustar se a pílula precisar de mais respiro (~24px extra no topo).

## O que NÃO fazer

- Não usar borda colorida grossa nem gradiente de fundo na pílula (manteria o ar premium discreto).
- Não animar o hamburger com algo gritante — fade simples.
- Não mexer no overlay mobile existente além de pequenos ajustes de cor pra combinar.
