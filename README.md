# my-css

Framework CSS utilitario propio construido sobre UnoCSS.

## Dev

```bash
pnpm install
pnpm dev
```

## Estructura

- `uno.config.js` — tokens, shortcuts, reglas custom
- `src/style.css` — imports de UnoCSS

## Añadir tokens

Edita `uno.config.js` → sección `theme.colors` / `theme.spacing`.

## Añadir shortcuts

```js
shortcuts: {
  'mi-componente': 'flex items-center gap-2 px-4 py-2 ...',
}
```

## Añadir reglas custom

```js
rules: [
  ['mi-utilidad', { 'css-property': 'value' }],
  [/^dynamic-(\w+)$/, ([, val]) => ({ 'some-prop': val })],
]
```
