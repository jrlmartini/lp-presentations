# STYLEGUIDE — Sistema de Slides (`/teste`)

Este documento oficializa os padrões visuais atuais de `/teste` com base no estado presente de `index.html`.

## 1) Princípios

### 1.1 Identidade básica
- **Estética tech premium com alto contraste**: fundo escuro em gradiente para destaque de conteúdo e sensação de profundidade.
- **Marca tipográfica em duas camadas**:
  - **Heading**: `Orbitron` para títulos e elementos de assinatura.
  - **Body**: `Inter` para leitura de conteúdo.
- **Acento único de ação**: uso do vermelho (`--c-accent`) como marcador visual (bullets, barra de progresso, detalhes de ícones).
- **Leitura orientada por hierarquia**:
  - títulos com tracking e line-height controlados,
  - blocos de conteúdo com largura máxima,
  - espaçamentos fluidos com `clamp()` e `cqw`.

### 1.2 Extensibilidade
- **Tema por composição de classes**:
  - base: `.slide`
  - variação de tema: `.dark` / `.light`
  - variação de propósito: `.cover`, `.content-slide`, `.section-divider` (já preparada no CSS).
- **Design token-first**: novas variações devem nascer a partir das variáveis em `:root`, evitando valores “hardcoded”.
- **Escala responsiva nativa**: manter `clamp()` e unidades relativas para preservar proporções entre telas.
- **Componentização visual simples**: padrões como `.visual-box`, `.cards`, `.package`, `.folder` devem ser reutilizados antes de criar novos elementos.

---

## 2) Tabela de tokens principais (oficial)

> Valores extraídos do estado atual e registrados como padrão oficial.

| Nome do token | Função | Valor default |
|---|---|---|
| `--c-navy-950` | Base escura profunda | `#070a12` |
| `--c-navy-900` | Base escura principal dos slides dark | `#080824` |
| `--c-purple-900` | Reserva cromática escura secundária | `#241445` |
| `--c-light-100` | Superfície clara primária / texto em dark | `#e7ecf6` |
| `--c-light-200` | Superfície clara secundária | `#c8d2e8` |
| `--c-accent` | Cor de acento principal | `#f20f46` |
| `--c-wine` | Acento alternativo para tema light | `#7b0037` |
| `--font-heading` | Fonte de títulos e assinatura | `"Orbitron", sans-serif` |
| `--font-body` | Fonte de corpo e interface | `"Inter", system-ui, sans-serif` |
| `--slide-w` | Largura do deck (16:9 adaptável) | `min(95vw, 180vh)` |
| `--slide-h` | Altura do deck (16:9 adaptável) | `min(95vh, 56.25vw)` |
| `--space` | Padding geral do slide | `clamp(1rem, 2.3cqw, 2.8rem)` |
| `--radius` | Raio estrutural do deck e blocos | `clamp(10px, 1.2cqw, 24px)` |
| `--text-title` | Escala tipográfica de título | `clamp(1.6rem, 4.2cqw, 4.2rem)` |
| `--text-subtitle` | Escala tipográfica de subtítulo | `clamp(1.2rem, 2.75cqw, 2.95rem)` |
| `--text-body` | Escala tipográfica de corpo/listas | `clamp(1.2rem, 2.2cqw, 2.2rem)` |
| `--text-caption` | Escala tipográfica auxiliar | `clamp(0.82rem, 1.08cqw, 1.22rem)` |

---

## 3) Presets de slide e quando usar

### 3.1 Cover (`.slide.cover`)
**Quando usar**
- abertura de apresentação;
- mensagem macro da sessão;
- framing inicial com alto impacto.

**Padrão atual**
- conteúdo centralizado verticalmente (`.slide.cover .content`);
- título em escala ampliada (`.slide.cover h1/h2`);
- header com tag + logo.

### 3.2 Content (`.slide.content-slide`)
**Quando usar**
- explicação de tema;
- listas, passos, promessas, critérios;
- combinação de texto com bloco visual de apoio.

**Padrão atual**
- header com margem inferior dedicada;
- conteúdo com `max-width: 88%` e `margin-top` maior para “respirar”;
- subtítulo + bullets + componente visual opcional (`.visual-box`, `.cards`, `.package`).

### 3.3 Divider (`.slide.section-divider`)
**Quando usar**
- transição entre módulos;
- mudança de capítulo/seção;
- pausa de ritmo entre blocos densos.

**Padrão atual**
- já suportado no CSS junto ao cover;
- conteúdo centralizado e título ampliado;
- idealmente pouco texto e alta legibilidade.

---

## 4) Receitas comuns

### 4.1 “Aumentar título de conteúdo”
Opção recomendada (global):
1. Ajustar `--text-subtitle` em `:root` para toda a apresentação.

Opção localizada (somente content slide):
1. Criar/editar regra `.slide.content-slide h2 { font-size: ... }`.
2. Manter `line-height` e `letter-spacing` herdados para preservar identidade.

### 4.2 “Descer conteúdo”
1. Ajustar `margin-top` de `.slide.content-slide .content` (padrão atual: `clamp(1.9rem, 3.4cqw, 3.8rem)`).
2. Se necessário, reduzir `max-width` para evitar sensação de bloco “pesado” no topo.
3. Evitar alterar `grid-template-rows` da `.slide` sem necessidade.

### 4.3 “Aumentar ocupação do slide”
1. Expandir largura de conteúdo: elevar `.slide.content-slide .content { max-width }` (padrão: `88%`).
2. Expandir componentes internos:
   - `.visual-box` (padrão: `width: min(70cqw, 650px)`),
   - grades `.cards` / `.package` via `grid-template-columns` e `gap`.
3. Validar leitura em aspect ratio menor (`@media (max-aspect-ratio: 16/10)`).

### 4.4 “Criar novo bloco visual mantendo identidade”
Passo a passo:
1. **Partir de um bloco existente** (`.visual-box`, `.card`, `.folder`) para herdar linguagem.
2. **Reusar tokens** de cor, raio, tipografia e escala (`var(--radius)`, `var(--text-body)`, `var(--c-accent)`).
3. **Usar bordas e fundos sem opacidade agressiva** com `color-mix(...)` como no padrão atual.
4. **Preservar ritmo vertical**: `margin-top` e `gap` próximos dos blocos originais.
5. **Respeitar build step**: se o bloco for progressivo, usar `data-step="n"`.

---

## 5) Checklist de consistência visual para novos slides

Use este checklist antes de considerar um slide pronto:

- [ ] A estrutura usa preset adequado (`cover`, `content-slide` ou `section-divider`).
- [ ] Tipografia segue `Orbitron` em títulos e `Inter` no corpo.
- [ ] Cores vêm dos tokens oficiais (sem hexadecimal ad-hoc, salvo exceção justificada).
- [ ] Escalas e espaçamentos usam `clamp()`/tokens existentes.
- [ ] Header de marca (tag + logo) está consistente com o tema (`Logo-light` em dark, `Logo-dark` em light).
- [ ] Conteúdo mantém largura confortável (`max-width`) e não “encosta” nas bordas.
- [ ] Bullets e marcadores preservam linguagem de acento.
- [ ] Blocos visuais mantêm borda suave, raio e contraste do sistema.
- [ ] Progressão de conteúdo (build) funciona com `data-step` quando aplicável.
- [ ] Legibilidade foi conferida em tema dark/light e em aspecto mais compacto.

---

## Nota de baseline

Este guia reflete exatamente o baseline atual de `/teste` e define esses valores como padrão oficial para evolução incremental do template.
