# @ardanazangel/styles

Sistema de utilidades CSS construido sobre UnoCSS. Sin dependencias externas, escala fluid basada en viewport, y easing tokens listos para usar.

## Instalación

```bash
npx github:ardanazangel/styles
```

Detecta el framework, instala las dependencias y configura todo automáticamente.

## Instalación manual

```bash
npm install github:ardanazangel/styles
```

```js
// uno.config.js
import myStyles from '@ardanazangel/styles'
export default { ...myStyles }
```

**Next.js** — `next.config.js`
```js
import UnoCSS from '@unocss/webpack'

export default {
  webpack(config) {
    config.plugins.push(UnoCSS())
    return config
  }
}
```

**Astro** — `astro.config.mjs`
```js
import UnoCSS from 'unocss/astro'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [UnoCSS()]
})
```

## Sistema de escala fluid

El tamaño base del proyecto se calcula en función del viewport. Todo usa `em` — al redimensionar la ventana, el layout escala proporcionalmente sin media queries adicionales.

```
Desktop  → base ideal: 1920px → 1em ≈ 16px
Tablet   → base ideal: 834px  → 1em ≈ 16px
Mobile   → base ideal: 390px  → 1em ≈ 16px
```

## Colores

El sistema no incluye colores — se definen en el `globals.css` de cada proyecto.

```css
:root {
  --primary: #000000;
  --bg: #ffffff;
}
```

Y se usan con las clases:

```html
<div class="bg-[--bg] text-[--primary]">...</div>
```

## Responsive (desktop-first)

Las clases base aplican a desktop. Los prefijos sobreescriben hacia abajo.

```
xl:   ≤ 1536px
lg:   ≤ 1280px
md:   ≤ 992px
sm:   ≤ 768px
xs:   ≤ 480px
```

```html
<div class="grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
```

## Easing tokens

18 curvas cubic-bezier disponibles como variables CSS.

```
--i1  --o1  --io1   ← suave
--i2  --o2  --io2
--i3  --o3  --io3   ← medio
--i4  --o4  --io4
--i5  --o5  --io5   ← fuerte
--i6  --o6  --io6   ← extremo
```

```css
transition: opacity 0.3s var(--io3);
```

`i` = ease-in · `o` = ease-out · `io` = ease-in-out
