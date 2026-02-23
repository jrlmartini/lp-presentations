# Styleguide de Extensão

Esta seção define convenções mínimas para criar novos componentes de slide sem quebrar consistência visual.

## 1) Prefixo obrigatório de classes

- Todo componente novo deve usar classes com prefixo `slide-*`.
- Evite classes genéricas como `.box`, `.item`, `.wrapper` para componentes do sistema.
- Exemplo recomendado:
  - Bloco: `.slide-callout`
  - Elementos internos: `.slide-callout__title`, `.slide-callout__text`

## 2) Regra de dependência de tokens

Antes de criar novos tokens CSS (`--*`), siga esta ordem:

1. Reutilize tokens semânticos já existentes (`--space`, `--radius`, `--text-body`, `--c-light-100`, etc.).
2. Se faltar variação, prefira funções derivadas em nível de componente (`color-mix`, `calc`) sem novo token global.
3. Só crie token novo quando houver reutilização clara entre dois ou mais componentes.

> Regra prática: todo novo componente nasce consumindo tokens existentes; novos tokens são exceção documentada.

## 3) Template mínimo para novo componente

### Estrutura HTML (base)

```html
<aside class="slide-callout" role="note" aria-label="Destaque">
  <h3 class="slide-callout__title">Título curto do destaque</h3>
  <p class="slide-callout__text">Texto de apoio em linguagem direta.</p>
</aside>
```

### Variáveis obrigatórias no CSS

Todo componente novo deve declarar/usar, no mínimo:

- `padding` baseado em `--space`
- `border-radius` baseado em `--radius`
- `font-size` baseado em `--text-body` (ou `--text-caption` quando aplicável)
- `color` e `background` baseados em tokens de cor semânticos (`--c-*`) já existentes

### Exemplo CSS mínimo

```css
.slide-callout {
  padding: calc(var(--space) * 0.5);
  border-radius: calc(var(--radius) * 0.7);
  font-size: var(--text-body);
  color: var(--c-light-100);
  background: color-mix(in oklab, var(--c-light-100) 8%, transparent);
}
```
