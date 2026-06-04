#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const cwd = process.cwd()
const pkg = (f) => join(cwd, f)

const green  = (s) => `\x1b[32m${s}\x1b[0m`
const yellow = (s) => `\x1b[33m${s}\x1b[0m`
const dim    = (s) => `\x1b[2m${s}\x1b[0m`

const log   = (s) => console.log(`  ${green('✓')} ${s}`)
const skip  = (s) => console.log(`  ${yellow('–')} ${s}`)
const title = (s) => console.log(`\n${s}`)

// ─── Detectar framework ───────────────────────────────────────────────────────

function detectFramework() {
  const projectPkg = existsSync(pkg('package.json'))
    ? JSON.parse(readFileSync(pkg('package.json'), 'utf8'))
    : {}
  const deps = { ...projectPkg.dependencies, ...projectPkg.devDependencies }
  if (deps['next'])  return 'next'
  if (deps['astro']) return 'astro'
  return 'unknown'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function writeIfMissing(file, content, label) {
  if (existsSync(pkg(file))) {
    skip(`${file} ya existe, skipping`)
  } else {
    writeFileSync(pkg(file), content)
    log(label ?? file)
  }
}

function appendIfMissing(file, line, label) {
  const current = existsSync(pkg(file)) ? readFileSync(pkg(file), 'utf8') : ''
  if (current.includes(line.trim())) {
    skip(`${label ?? line} ya está en ${file}`)
  } else {
    writeFileSync(pkg(file), current + '\n' + line + '\n')
    log(label ?? file)
  }
}

// ─── Setup por framework ──────────────────────────────────────────────────────

function setupNext() {
  // uno.config.js
  writeIfMissing('uno.config.js', `import myStyles from '@ardanazangel/styles'
export default { ...myStyles }
`, 'uno.config.js')

  // next.config.js / next.config.mjs
  const configFile = existsSync(pkg('next.config.mjs')) ? 'next.config.mjs'
    : existsSync(pkg('next.config.js')) ? 'next.config.js'
    : null

  if (configFile) {
    const content = readFileSync(pkg(configFile), 'utf8')
    if (content.includes('UnoCSS')) {
      skip(`UnoCSS ya configurado en ${configFile}`)
    } else {
      // parchear: añadir import y plugin
      const patched = `import UnoCSS from '@unocss/webpack'\n` + content.replace(
        /export default/,
        `export default`
      ).replace(
        /webpack\s*\(config\)\s*{/,
        `webpack(config) {\n    config.plugins.push(UnoCSS())`
      )
      // si no tiene webpack config, añadirla
      if (!content.includes('webpack')) {
        const withWebpack = content.replace(
          /export default\s+(defineConfig\()?{/,
          `import UnoCSS from '@unocss/webpack'\n\nexport default $1{\n  webpack(config) {\n    config.plugins.push(UnoCSS())\n    return config\n  },`
        )
        writeFileSync(pkg(configFile), withWebpack)
        log(`${configFile} — webpack + UnoCSS añadido`)
      } else {
        writeFileSync(pkg(configFile), patched)
        log(`${configFile} — UnoCSS añadido`)
      }
    }
  } else {
    writeIfMissing('next.config.mjs', `import UnoCSS from '@unocss/webpack'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.plugins.push(UnoCSS())
    return config
  }
}

export default nextConfig
`, 'next.config.mjs creado')
  }

  // layout import
  const layoutFiles = ['app/layout.jsx', 'app/layout.tsx', 'src/app/layout.jsx', 'src/app/layout.tsx']
  const layout = layoutFiles.find(f => existsSync(pkg(f)))
  if (layout) {
    appendIfMissing(layout, `import 'virtual:uno.css'`, `import virtual:uno.css → ${layout}`)
  } else {
    skip('layout.jsx/tsx no encontrado — añade import \'virtual:uno.css\' manualmente')
  }
}

function setupAstro() {
  // uno.config.js
  writeIfMissing('uno.config.js', `import myStyles from '@ardanazangel/styles'
export default { ...myStyles }
`, 'uno.config.js')

  // astro.config.mjs
  const configFile = 'astro.config.mjs'
  if (existsSync(pkg(configFile))) {
    const content = readFileSync(pkg(configFile), 'utf8')
    if (content.includes('UnoCSS')) {
      skip(`UnoCSS ya configurado en ${configFile}`)
    } else {
      const patched = `import UnoCSS from 'unocss/astro'\n` + content.replace(
        /integrations:\s*\[/,
        `integrations: [\n    UnoCSS(),`
      )
      writeFileSync(pkg(configFile), patched)
      log(`${configFile} — UnoCSS añadido`)
    }
  } else {
    writeIfMissing(configFile, `import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

export default defineConfig({
  integrations: [UnoCSS()]
})
`, 'astro.config.mjs creado')
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

title('🎨 @ardanazangel/styles setup\n')

// 1. .npmrc
appendIfMissing('.npmrc', '@ardanazangel:registry=https://npm.pkg.github.com', '.npmrc — registry añadido')

// 2. instalar
console.log(`\n  ${dim('npm install @ardanazangel/styles...')}`)
try {
  execSync('npm install @ardanazangel/styles', { stdio: 'inherit', cwd })
  log('@ardanazangel/styles instalado')
} catch {
  console.error('  ✗ Error instalando el paquete')
  process.exit(1)
}

// 3. framework setup
const framework = detectFramework()
title(`\n  Framework: ${framework}`)

if (framework === 'next')  setupNext()
else if (framework === 'astro') setupAstro()
else {
  // genérico
  writeIfMissing('uno.config.js', `import myStyles from '@ardanazangel/styles'
export default { ...myStyles }
`, 'uno.config.js')
  skip('Framework no detectado — configura el plugin de UnoCSS manualmente')
}

title(`\n${green('Listo.')} Arranca el servidor y usa las clases.\n`)
