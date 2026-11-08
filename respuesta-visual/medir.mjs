// Mide un visual como lo pinta el chat de T3: node medir.mjs <fichero.html>
// Imprime la altura para html_render (la mayor entre 320 y 390 px de ancho, con margen) y avisa si algo se sale o hace scroll.
import { createRequire } from "node:module"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { homedir } from "node:os"
import { execSync } from "node:child_process"

// Busca Playwright: PLAYWRIGHT_DIR, el proyecto actual, ~/proxusv2 (pnpm) o la instalación global de npm.
function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_DIR, `${process.cwd()}/`]
  const pnpm = `${homedir()}/proxusv2/node_modules/.pnpm`
  if (existsSync(pnpm)) for (const d of readdirSync(pnpm).filter((d) => /^playwright@[\d.]+$/.test(d)).sort().reverse()) tries.push(`${pnpm}/${d}/node_modules/`)
  try { tries.push(`${execSync("npm root -g", { encoding: "utf8" }).trim()}/`) } catch {}
  for (const dir of tries.filter(Boolean)) {
    try { return createRequire(dir.endsWith("/") ? dir : `${dir}/`)("playwright") } catch {}
  }
  console.error("No encuentro Playwright. Instálalo (npm i -g playwright && npx playwright install chromium) o indica su carpeta en PLAYWRIGHT_DIR.")
  process.exit(2)
}
const { chromium } = loadPlaywright()
// Usa el headless shell más reciente de la caché si existe; si no, el Chromium por defecto de Playwright.
const cache = `${homedir()}/.cache/ms-playwright`
const shell = existsSync(cache) ? readdirSync(cache).filter((d) => d.startsWith("chromium_headless_shell-")).sort((a, b) => a.split("-")[1] - b.split("-")[1]).at(-1) : undefined
const executablePath = shell && existsSync(`${cache}/${shell}/chrome-headless-shell-linux64/chrome-headless-shell`) ? `${cache}/${shell}/chrome-headless-shell-linux64/chrome-headless-shell` : undefined

const html = readFileSync(process.argv[2], "utf8").replaceAll("window.top === window", "false").replace(/<html([^>]*)class="([^"]*)standalone([^"]*)"/, '<html$1class="$2$3"')
const theme = ":root{--background:#0d0e11;--foreground:#eceef2;--muted-foreground:#9399a5;--card:#16181d;--secondary:#23262d;--border:#2a2e36;--success:#5fd3a0;--warning:#f0a65a;--destructive:#f3809c;--chart-1:#7ea8f5;--chart-2:#5fd3a0;--chart-3:#f0a65a;--chart-4:#b293f5;--chart-5:#f3809c;--chart-6:#7fd4e8;--radius:12px;--font-sans:system-ui,sans-serif;--font-mono:monospace}html{padding:8px}"
const browser = await chromium.launch(executablePath ? { executablePath } : {})
const problems = []
let height = 0
for (const width of [320, 390, 728]) {
  const page = await browser.newPage({ viewport: { width, height: 200 } })
  await page.setContent(html.replace("<head>", `<head><style>${theme}</style>`), { waitUntil: "load" })
  await page.evaluate(() => document.fonts.ready)  // Instrument Serif llega de Google Fonts y cambia la altura
  const m = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const all = [...document.querySelectorAll("body *")]
    return {
      height: Math.ceil(document.documentElement.scrollHeight),
      out: all.filter((el) => el.getBoundingClientRect().right > vw + 1).slice(0, 3).map((el) => el.tagName.toLowerCase() + (el.className ? "." + String(el.className).split(" ")[0] : "")),
      scroll: all.filter((el) => { const s = getComputedStyle(el); return /(auto|scroll)/.test(s.overflowX + s.overflowY) && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) }).length,
    }
  })
  if (width <= 390) height = Math.max(height, m.height)
  if (m.out.length) problems.push(`a ${width}px se sale por la derecha: ${m.out.join(", ")}`)
  if (m.scroll) problems.push(`a ${width}px hay ${m.scroll} barras internas`)
  await page.close()
}
await browser.close()
const render = Math.ceil(height * 1.08) + 16  // a 320 px el chat de T3 sale un 6-7 % más alto que este Chromium (medido el 06 y el 08/11)
console.log(problems.length ? `PROBLEMAS:\n- ${problems.join("\n- ")}` : "Sin scroll ni desbordes.")
console.log(render > 2000 ? `Altura ${render}: pasa de 2000, pártelo en varios renders.` : `height para html_render: ${render}`)
process.exit(problems.length || render > 2000 ? 1 : 0)
