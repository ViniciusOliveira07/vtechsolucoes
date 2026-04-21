

# Arquitetura SEO + 5 páginas individuais de serviço

Hoje todos os serviços vivem em `/servicos` como cards. Vou separar em **5 rotas dedicadas**, cada uma otimizada para captação de leads B2B via busca orgânica.

## 1. Estrutura de rotas

```
/servicos                            → hub (já existe, vira "índice de serviços")
/servicos/sites-institucionais       → nova
/servicos/sistemas-web               → nova
/servicos/automacoes-com-ia          → nova
/servicos/integracoes                → nova
/servicos/consultoria-tech           → nova
```

Arquivos TanStack (file-based, dot-separated):
- `src/routes/servicos.sites-institucionais.tsx`
- `src/routes/servicos.sistemas-web.tsx`
- `src/routes/servicos.automacoes-com-ia.tsx`
- `src/routes/servicos.integracoes.tsx`
- `src/routes/servicos.consultoria-tech.tsx`

A rota `/servicos` continua como **hub**, mas os cards passam a ser `<Link>` clicáveis para cada página individual.

## 2. Template de página de serviço (consistente)

Cada página usa o mesmo esqueleto premium para garantir velocidade de criação, manutenção e SEO uniforme:

```text
┌────────────────────────────────────────────────┐
│ HERO                                           │
│  • Eyebrow (categoria)                         │
│  • H1 (palavra-chave principal + benefício)    │
│  • Subheadline (dor + transformação)           │
│  • CTA primário ("Solicitar proposta") + secundário ("Ver processo") │
│  • Trust strip (3 micro-provas)                │
├────────────────────────────────────────────────┤
│ PROBLEMA → SOLUÇÃO  (H2)                       │
│  Lista de dores comuns + como resolvemos       │
├────────────────────────────────────────────────┤
│ O QUE ENTREGAMOS  (H2)                         │
│  6 entregáveis em grid (H3 cada)               │
├────────────────────────────────────────────────┤
│ STACK & DIFERENCIAIS  (H2)                     │
│  Tecnologias + por que importam                │
├────────────────────────────────────────────────┤
│ PROCESSO DEDICADO  (H2)                        │
│  4 etapas adaptadas ao serviço                 │
├────────────────────────────────────────────────┤
│ FAQ  (H2)                                      │
│  5–6 perguntas (alimenta FAQPage schema)       │
├────────────────────────────────────────────────┤
│ SERVIÇOS RELACIONADOS (interlinking)           │
│  Cards para os outros 4 serviços               │
├────────────────────────────────────────────────┤
│ CTA final  (H2 + botão)                        │
└────────────────────────────────────────────────┘
```

Componente reutilizável: `src/components/site/ServicePageLayout.tsx` recebendo props tipadas (`hero`, `problemas`, `entregaveis`, `stack`, `processo`, `faq`, `relacionados`).

## 3. Copy + SEO por página (resumo executivo)

### 3.1 Sites institucionais — `/servicos/sites-institucionais`
- **Meta title** (≤60c): `Sites Institucionais B2B sob medida | Vtech Soluções`
- **Meta description** (≤155c): `Site institucional premium com SEO técnico, performance Core Web Vitals e identidade estúdio. Entrega em 30 dias. Solicite proposta.`
- **H1**: `Sites institucionais que vendem confiança antes da primeira reunião`
- **Subheadline**: `Para empresas B2B que precisam de presença digital à altura do ticket que cobram.`
- **Keywords principais**: `site institucional B2B`, `criação de site empresarial`, `agência site premium`
- **Secundárias**: `site corporativo SEO`, `desenvolvimento site empresa SP`, `site institucional alta conversão`, `site institucional com Next.js`

### 3.2 Sistemas web — `/servicos/sistemas-web`
- **Meta title**: `Desenvolvimento de Sistemas Web sob Medida | Vtech`
- **Meta description**: `Sistemas web sob medida para operações B2B: ERPs internos, painéis, portais. Stack moderna, deploy contínuo, sem mensalidade refém.`
- **H1**: `Sistemas web sob medida para operações que não cabem em planilha`
- **Keywords principais**: `desenvolvimento de sistema web`, `software sob medida B2B`, `sistema web personalizado`
- **Secundárias**: `criar sistema interno empresa`, `desenvolvimento SaaS`, `painel administrativo sob medida`, `dashboard interno empresarial`

### 3.3 Automações com IA — `/servicos/automacoes-com-ia`
- **Meta title**: `Automação com IA para Empresas | Agentes e RAG | Vtech`
- **Meta description**: `Automatize processos com agentes de IA, RAG e integração com seus dados. Reduza custo operacional em semanas, não meses.`
- **H1**: `Automações com IA que substituem horas de trabalho repetitivo`
- **Keywords principais**: `automação com IA empresas`, `agentes de IA B2B`, `consultoria automação inteligência artificial`
- **Secundárias**: `chatbot IA empresarial`, `RAG sob medida`, `automatizar atendimento com IA`, `IA generativa para empresas`

### 3.4 Integrações — `/servicos/integracoes`
- **Meta title**: `Integrações de Sistemas, ERPs e APIs | Vtech Soluções`
- **Meta description**: `Integramos ERP, CRM, gateways de pagamento e APIs internas. Fim do retrabalho manual entre sistemas. Diagnóstico em 7 dias.`
- **H1**: `Integrações entre sistemas que finalmente conversam entre si`
- **Keywords principais**: `integração de sistemas`, `integração ERP API`, `integração CRM empresa`
- **Secundárias**: `integração gateway pagamento`, `middleware empresarial`, `webhook automação`, `integração Bling Omie Tiny`

### 3.5 Consultoria tech — `/servicos/consultoria-tech`
- **Meta title**: `Consultoria de Tecnologia para Empresas | Vtech`
- **Meta description**: `Consultoria sênior em arquitetura, escolha de stack e roadmap técnico. Decisões certas antes de gastar R$100k em código.`
- **H1**: `Consultoria de tecnologia que evita decisões caras de reverter`
- **Keywords principais**: `consultoria de tecnologia empresarial`, `consultoria CTO as a service`, `consultoria desenvolvimento de software`
- **Secundárias**: `arquitetura de software consultoria`, `due diligence técnica`, `roadmap tecnológico empresa`, `fractional CTO Brasil`

## 4. Hierarquia de headings (rule)

Por página: **1× H1** (com keyword principal) → **6 a 8× H2** (seções) → **H3** apenas em listas de entregáveis e FAQ. Nunca pular níveis.

## 5. Estratégia de interlinking

```text
        ┌──────────── /servicos (hub) ────────────┐
        │                                          │
   sites-institucionais ◄──► sistemas-web         │
        ▲                       ▲                  │
        │                       │                  │
        └─► automacoes-com-ia ◄─┘                  │
                  ▲                                 │
                  │                                 │
              integracoes ◄──► consultoria-tech ◄──┘
```

Regras:
- **Hub `/servicos`** linka para os 5 (já estará).
- Cada página de serviço tem bloco "Serviços relacionados" com **2 a 3 links contextuais** (ex.: Sites Institucionais → Sistemas Web + Consultoria).
- **Footer** ganha sub-itens dos 5 serviços abaixo de "Serviços".
- **Header**: mantém `Serviços` apontando ao hub (sem dropdown — preserva o pill design atual).
- Dentro do corpo, links âncora descritivos: ex. `"...nosso processo de [integração de ERPs](/servicos/integracoes)..."`.
- Hub `/servicos`: cards passam de `<div>` para `<Link>` com `aria-label` descritivo.

## 6. Eventos Google Analytics 4 (rastreamento)

Implemento via `gtag('event', ...)` num helper `src/lib/analytics.ts`. Eventos sugeridos:

| Evento | Trigger | Parâmetros |
|---|---|---|
| `service_page_view` | mount de cada página de serviço | `service_slug` |
| `cta_click` | clique em qualquer CTA | `cta_label`, `cta_location`, `service_slug` |
| `whatsapp_click` | clique no botão flutuante | `page_path` |
| `scroll_depth` | 25/50/75/100% scroll | `depth`, `page_path` |
| `faq_open` | abrir item FAQ | `question`, `service_slug` |
| `related_service_click` | clique em interlink de relacionados | `from_service`, `to_service` |
| `form_start` | foco no primeiro input do form | `form_id` |
| `generate_lead` | submit OK do formulário (conversão GA4) | `service_interest`, `value` |
| `outbound_click` | links externos | `outbound_url` |

Marcar `generate_lead` como **conversão** no GA4. Recomendar GTM se o usuário quiser editar sem deploy (futuro).

## 7. Recomendações técnicas de SEO

- **Schema.org JSON-LD** por página, injetado via `head().scripts`:
  - Hub e páginas filhas: `Service` schema (com `provider`, `areaServed: "BR"`, `serviceType`).
  - FAQ: `FAQPage` schema (alimentado pelo array de FAQ da página).
  - Root: `Organization` schema (logo, sameAs, contactPoint WhatsApp).
- **Sitemap dinâmico** em `src/routes/sitemap[.]xml.tsx` listando todas as rotas (incluindo as 5 novas + legais).
- **`robots.txt`** em `public/robots.txt` permitindo tudo + apontando para o sitemap.
- **Canonical** por rota via `<link rel="canonical">` no `head()`.
- **OG tags por rota** (já é regra do projeto): `og:title`, `og:description`, `og:type=website`, `og:url`. Sem `og:image` global (respeita a regra do TanStack head).
- **Performance / Core Web Vitals**:
  - Lazy-load de seções abaixo da dobra com `loading="lazy"` em imagens.
  - `font-display: swap` (verificar Inter/display fonts).
  - Preconnect já existe — adicionar `dns-prefetch` para `wa.me`.
- **Acessibilidade (impacta SEO)**: `aria-label` nos CTAs, contraste AA garantido (já está), `lang="pt-BR"` no `<html>` (já está).
- **URLs**: minúsculas, com hífen, sem acentos (proposto acima — `automacoes-com-ia` em vez de `automações-com-ia`).
- **Breadcrumb** visual + `BreadcrumbList` schema em cada página filha (`Início › Serviços › Sites Institucionais`).
- **Atualizar `head()` da rota `/servicos` atual**: hoje o title é só "Vtech Soluções" — vira `Serviços de Tecnologia B2B | Vtech Soluções`.

## 8. Arquivos criados / editados

**Criados (8):**
- `src/components/site/ServicePageLayout.tsx`
- `src/components/site/ServiceFAQ.tsx` (accordion + JSON-LD)
- `src/lib/analytics.ts` (helper `track()`)
- `src/routes/servicos.sites-institucionais.tsx`
- `src/routes/servicos.sistemas-web.tsx`
- `src/routes/servicos.automacoes-com-ia.tsx`
- `src/routes/servicos.integracoes.tsx`
- `src/routes/servicos.consultoria-tech.tsx`
- `src/routes/sitemap[.]xml.tsx`
- `public/robots.txt`

**Editados (4):**
- `src/components/site/sections/Services.tsx` — cards viram `<Link>` para as 5 páginas
- `src/routes/servicos.tsx` — atualizar `head()` (title/description otimizados)
- `src/components/site/Footer.tsx` — adicionar sub-itens dos 5 serviços
- `src/components/site/WhatsAppButton.tsx` — disparar evento `whatsapp_click`

## 9. Pré-requisitos do usuário

Para o GA4 funcionar de verdade preciso de **1 informação** depois (não bloqueia a implementação — deixo placeholder e marco TODO):

- ID de medição GA4 (formato `G-XXXXXXXXXX`). Se você ainda não tem, sigo com o helper pronto e você só cola o ID depois em `src/lib/analytics.ts`.

