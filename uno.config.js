import { defineConfig } from "unocss";

// ─── Design Tokens ───────────────────────────────────────────────────────────

// Espaciado en em — escala con --size-font del body
const spacing = {
  px: "1px",
  0: "0",
  1: "0.25em",
  2: "0.5em",
  3: "0.75em",
  4: "1em",
  5: "1.25em",
  6: "1.5em",
  8: "2em",
  10: "2.5em",
  12: "3em",
  16: "4em",
  20: "5em",
  24: "6em",
  32: "8em",
  40: "10em",
  48: "12em",
  64: "16em",
};

const fontSize = {
  xs: "0.75em",
  sm: "0.875em",
  base: "1em",
  lg: "1.125em",
  xl: "1.25em",
  "2xl": "1.5em",
  "3xl": "1.875em",
  "4xl": "2.25em",
  "5xl": "3em",
  "6xl": "3.75em",
};

const borderRadius = {
  none: "0",
  sm: "0.25em",
  md: "0.375em",
  lg: "0.5em",
  xl: "0.75em",
  "2xl": "1em",
  "3xl": "1.5em",
  full: "9999px",
};

// Breakpoints alineados con el sistema del proyecto
const breakpoints = {
  xl:  '1536px',  // wide desktop
  lg:  '1280px',  // desktop
  md:  '992px',   // tablet landscape
  sm:  '768px',   // tablet portrait
  xs:  '480px',   // mobile
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const sp = () => Object.entries(spacing);

// ─── Rules ───────────────────────────────────────────────────────────────────

const rules = [
  // ── Display ───────────────────────────────────────────────────────────────
  ["flex", { display: "flex" }],
  ["inline-flex", { display: "inline-flex" }],
  ["grid", { display: "grid" }],
  ["block", { display: "block" }],
  ["inline-block", { display: "inline-block" }],
  ["inline", { display: "inline" }],
  ["hidden", { display: "none" }],

  // ── Flex ──────────────────────────────────────────────────────────────────
  ["flex-row", { "flex-direction": "row" }],
  ["flex-col", { "flex-direction": "column" }],
  ["flex-wrap", { "flex-wrap": "wrap" }],
  ["flex-nowrap", { "flex-wrap": "nowrap" }],
  ["flex-1", { flex: "1 1 0%" }],
  ["flex-auto", { flex: "1 1 auto" }],
  ["flex-none", { flex: "none" }],
  ["flex-shrink-0", { "flex-shrink": "0" }],

  // ── Justify & Align ───────────────────────────────────────────────────────
  ["justify-start", { "justify-content": "flex-start" }],
  ["justify-end", { "justify-content": "flex-end" }],
  ["justify-center", { "justify-content": "center" }],
  ["justify-between", { "justify-content": "space-between" }],
  ["items-start", { "align-items": "flex-start" }],
  ["items-end", { "align-items": "flex-end" }],
  ["items-center", { "align-items": "center" }],
  ["items-stretch", { "align-items": "stretch" }],
  ["self-start", { "align-self": "flex-start" }],
  ["self-end", { "align-self": "flex-end" }],
  ["self-center", { "align-self": "center" }],

  // ── Grid ──────────────────────────────────────────────────────────────────
  [
    /^grid-cols-(\d+)$/,
    ([, n]) => ({ "grid-template-columns": `repeat(${n}, minmax(0, 1fr))` }),
  ],
  [/^col-span-(\d+)$/, ([, n]) => ({ "grid-column": `span ${n} / span ${n}` })],
  ["col-span-full", { "grid-column": "1 / -1" }],

  // ── Gap ───────────────────────────────────────────────────────────────────
  ...sp().flatMap(([k, v]) => [
    [`gap-${k}`, { gap: v }],
    [`gap-x-${k}`, { "column-gap": v }],
    [`gap-y-${k}`, { "row-gap": v }],
  ]),

  // ── Margin ────────────────────────────────────────────────────────────────
  ...sp().flatMap(([k, v]) => [
    [`m-${k}`, { margin: v }],
    [`mt-${k}`, { "margin-top": v }],
    [`mb-${k}`, { "margin-bottom": v }],
    [`ml-${k}`, { "margin-left": v }],
    [`mr-${k}`, { "margin-right": v }],
    [`mx-${k}`, { "margin-left": v, "margin-right": v }],
    [`my-${k}`, { "margin-top": v, "margin-bottom": v }],
  ]),
  ["mx-auto", { "margin-left": "auto", "margin-right": "auto" }],
  ["ml-auto", { "margin-left": "auto" }],
  ["mr-auto", { "margin-right": "auto" }],

  // ── Padding ───────────────────────────────────────────────────────────────
  ...sp().flatMap(([k, v]) => [
    [`p-${k}`, { padding: v }],
    [`pt-${k}`, { "padding-top": v }],
    [`pb-${k}`, { "padding-bottom": v }],
    [`pl-${k}`, { "padding-left": v }],
    [`pr-${k}`, { "padding-right": v }],
    [`px-${k}`, { "padding-left": v, "padding-right": v }],
    [`py-${k}`, { "padding-top": v, "padding-bottom": v }],
  ]),

  // ── Width ─────────────────────────────────────────────────────────────────
  ["w-full", { width: "100%" }],
  ["w-screen", { width: "100vw" }],
  ["w-fit", { width: "fit-content" }],
  ["w-auto", { width: "auto" }],
  ...sp().map(([k, v]) => [`w-${k}`, { width: v }]),
  [
    /^w-(\d+)\/(\d+)$/,
    ([, a, b]) => ({ width: `${((+a / +b) * 100).toFixed(4)}%` }),
  ],

  // ── Height ────────────────────────────────────────────────────────────────
  ["h-full", { height: "100%" }],
  ["h-screen", { height: "100vh" }],
  ["h-fit", { height: "fit-content" }],
  ["h-auto", { height: "auto" }],
  ...sp().map(([k, v]) => [`h-${k}`, { height: v }]),

  // ── Typography ────────────────────────────────────────────────────────────
  ...Object.entries(fontSize).map(([k, v]) => [
    `text-${k}`,
    { "font-size": v },
  ]),
  ["font-thin", { "font-weight": "100" }],
  ["font-light", { "font-weight": "300" }],
  ["font-normal", { "font-weight": "400" }],
  ["font-medium", { "font-weight": "500" }],
  ["font-semibold", { "font-weight": "600" }],
  ["font-bold", { "font-weight": "700" }],
  ["font-extrabold", { "font-weight": "800" }],
  ["leading-tight", { "line-height": "1.25" }],
  ["leading-normal", { "line-height": "1.5" }],
  ["leading-loose", { "line-height": "2" }],
  ["text-left", { "text-align": "left" }],
  ["text-center", { "text-align": "center" }],
  ["text-right", { "text-align": "right" }],
  ["uppercase", { "text-transform": "uppercase" }],
  ["lowercase", { "text-transform": "lowercase" }],
  ["capitalize", { "text-transform": "capitalize" }],
  [
    "truncate",
    {
      overflow: "hidden",
      "text-overflow": "ellipsis",
      "white-space": "nowrap",
    },
  ],

  // Fuentes del proyecto
  ["font-sans", { "font-family": "var(--font-sans, system-ui, sans-serif)" }],
  ["font-mono", { "font-family": "var(--font-mono, monospace)" }],
  ["font-serif", { "font-family": "var(--font-serif, serif)" }],

  // ── Colores via CSS vars del sistema ──────────────────────────────────────
  [/^text-\[(.+)\]$/, ([, v]) => ({ color: v.startsWith('--') ? `var(${v})` : v })],
  [/^bg-\[(.+)\]$/,   ([, v]) => ({ 'background-color': v.startsWith('--') ? `var(${v})` : v })],
  [/^text-(--[\w-]+)$/, ([, v]) => ({ color: `var(${v})` })],
  [/^bg-(--[\w-]+)$/,   ([, v]) => ({ 'background-color': `var(${v})` })],

  // ── Border radius ─────────────────────────────────────────────────────────
  ["rounded", { "border-radius": "0.375em" }],
  ["rounded-none", { "border-radius": "0" }],
  ["rounded-full", { "border-radius": "9999px" }],
  ...Object.entries(borderRadius)
    .filter(([k]) => !["none", "full"].includes(k))
    .map(([k, v]) => [`rounded-${k}`, { "border-radius": v }]),

  // ── Position ──────────────────────────────────────────────────────────────
  ["relative", { position: "relative" }],
  ["absolute", { position: "absolute" }],
  ["fixed", { position: "fixed" }],
  ["sticky", { position: "sticky" }],
  ...sp().flatMap(([k, v]) => [
    [`top-${k}`, { top: v }],
    [`bottom-${k}`, { bottom: v }],
    [`left-${k}`, { left: v }],
    [`right-${k}`, { right: v }],
  ]),
  ["inset-0", { top: "0", right: "0", bottom: "0", left: "0" }],
  ["inset-x-0", { left: "0", right: "0" }],
  ["inset-y-0", { top: "0", bottom: "0" }],

  // ── Z-index ───────────────────────────────────────────────────────────────
  ["z-0", { "z-index": "0" }],
  ["z-10", { "z-index": "10" }],
  ["z-20", { "z-index": "20" }],
  ["z-30", { "z-index": "30" }],
  ["z-40", { "z-index": "40" }],
  ["z-50", { "z-index": "50" }],

  // ── Overflow ──────────────────────────────────────────────────────────────
  ["overflow-hidden", { overflow: "hidden" }],
  ["overflow-auto", { overflow: "auto" }],
  ["overflow-x-hidden", { "overflow-x": "hidden" }],
  ["overflow-y-auto", { "overflow-y": "auto" }],

  // ── Opacity ───────────────────────────────────────────────────────────────
  ["opacity-0", { opacity: "0" }],
  ["opacity-10", { opacity: "0.1" }],
  ["opacity-20", { opacity: "0.2" }],
  ["opacity-25", { opacity: "0.25" }],
  ["opacity-30", { opacity: "0.3" }],
  ["opacity-40", { opacity: "0.4" }],
  ["opacity-50", { opacity: "0.5" }],
  ["opacity-60", { opacity: "0.6" }],
  ["opacity-70", { opacity: "0.7" }],
  ["opacity-75", { opacity: "0.75" }],
  ["opacity-80", { opacity: "0.8" }],
  ["opacity-90", { opacity: "0.9" }],
  ["opacity-100", { opacity: "1" }],

  // ── Cursor ────────────────────────────────────────────────────────────────
  ["cursor-pointer", { cursor: "pointer" }],
  ["cursor-default", { cursor: "default" }],
  ["cursor-not-allowed", { cursor: "not-allowed" }],

  // ── Misc ──────────────────────────────────────────────────────────────────
  ["select-none", { "user-select": "none" }],
  ["pointer-events-none", { "pointer-events": "none" }],
  ["invisible", { visibility: "hidden" }],
  ["visible", { visibility: "visible" }],
  ["isolate", { isolation: "isolate" }],
  ["aspect-square", { "aspect-ratio": "1 / 1" }],
  ["aspect-wide", { "aspect-ratio": "16 / 9" }],
  ["aspect-portrait", { "aspect-ratio": "9 / 16" }],
  ["object-cover", { "object-fit": "cover" }],
  ["object-contain", { "object-fit": "contain" }],
];

// ─── Export ───────────────────────────────────────────────────────────────────

export default defineConfig({
  presets: [],
  rules,

  variants: [
    // Pseudo
    (matcher) => {
      const pseudos = {
        hover: "&:hover",
        focus: "&:focus",
        active: "&:active",
        disabled: "&:disabled",
        "group-hover": ".group:hover &",
      };
      for (const [prefix, selector] of Object.entries(pseudos)) {
        if (matcher.startsWith(`${prefix}:`)) {
          return {
            matcher: matcher.slice(prefix.length + 1),
            selector: (s) => selector.replace("&", s),
          };
        }
      }
    },
    // Responsive (desktop-first, max-width)
    (matcher) => {
      for (const [bp, px] of Object.entries(breakpoints)) {
        if (matcher.startsWith(`${bp}:`)) {
          return {
            matcher: matcher.slice(bp.length + 1),
            parent: `@media (max-width: ${px})`,
          }
        }
      }
    },
  ],

  preflights: [
    {
      getCSS: () => `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          /* ── Sistema de escala fluid ───────────────────────────── */
          --size-unit: 16;
          --size-container-ideal: 1920;
          --size-container-min: 992px;
          --size-container-max: 2560px;
          --size-container: clamp(var(--size-container-min), 100vw, var(--size-container-max));
          --size-font: calc(var(--size-container) / (var(--size-container-ideal) / var(--size-unit)));

          /* ── Easing ────────────────────────────────────────────── */
          --i1:  cubic-bezier(.47, 0, .745, .715);
          --o1:  cubic-bezier(.39, .575, .565, 1);
          --io1: cubic-bezier(.445, .05, .55, .95);
          --i2:  cubic-bezier(.55, .085, .68, .53);
          --o2:  cubic-bezier(.25, .46, .45, .94);
          --io2: cubic-bezier(.455, .03, .515, .955);
          --i3:  cubic-bezier(.55, .055, .675, .19);
          --o3:  cubic-bezier(.215, .61, .355, 1);
          --io3: cubic-bezier(.645, .045, .355, 1);
          --i4:  cubic-bezier(.895, .03, .685, .22);
          --o4:  cubic-bezier(.165, .84, .44, 1);
          --io4: cubic-bezier(.77, 0, .175, 1);
          --i5:  cubic-bezier(.755, .05, .855, .06);
          --o5:  cubic-bezier(.23, 1, .32, 1);
          --io5: cubic-bezier(.86, 0, .07, 1);
          --i6:  cubic-bezier(.95, .05, .795, .035);
          --o6:  cubic-bezier(.19, 1, .22, 1);
          --io6: cubic-bezier(1, 0, 0, 1);
        }

        /* Tablet */
        @media screen and (max-width: 991px) {
          :root {
            --size-container-ideal: 834;
            --size-container-min: 768px;
            --size-container-max: 991px;
          }
        }

        /* Mobile Landscape */
        @media screen and (max-width: 767px) {
          :root {
            --size-container-ideal: 390;
            --size-container-min: 480px;
            --size-container-max: 767px;
          }
        }

        /* Mobile Portrait */
        @media screen and (max-width: 479px) {
          :root {
            --size-container-ideal: 390;
            --size-container-min: 320px;
            --size-container-max: 479px;
          }
        }

        html, body { scrollbar-width: none; -ms-overflow-style: none; }
        html::-webkit-scrollbar { display: none; }

        html {
          font-family: var(--font-sans, system-ui, sans-serif);
          -webkit-text-size-adjust: none;
          -webkit-font-smoothing: antialiased;
        }

        body {
          font-size: var(--size-font);
          line-height: 1.5;
          position: relative;
          isolation: isolate;
          text-box: trim-both cap alphabetic;
        }

        h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }
        a { color: inherit; text-decoration: inherit; }
        button { all: unset; cursor: pointer; }
        img, video { max-width: 100%; display: block; }
        ul, ol { list-style: none; }
        [hidden] { display: none !important; }


      `,
    },
  ],
});
