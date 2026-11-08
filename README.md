# skills

Skills para agentes de código (Claude Code, Codex, OpenCode, Pi…).

## respuesta-visual

Hace que el agente responda en el chat de [T3 Code](https://github.com/pingdotgg/t3code) con un visual HTML (`html_render`) en vez de un bloque de texto: un titular que ya es la respuesta y una pieza por tipo de dato (serie, reparto, ranking, antes/después, tabla con minicomponentes, estado agrupado, pasos).

- `SKILL.md`: el procedimiento.
- `plantilla.html`: las piezas, con los colores del tema de T3 y valores de reserva para abrir el fichero fuera del chat.
- `medir.mjs`: mide el visual con Playwright a 320, 390 y 728 px, avisa si algo se sale o hace scroll y da la altura para `html_render`. Necesita Playwright (`npm i -g playwright && npx playwright install chromium`, o su carpeta en `PLAYWRIGHT_DIR`).

Instalación: copia o enlaza `respuesta-visual/` en la carpeta de skills de tu agente (`~/.agents/skills`, `~/.claude/skills`…) y añade a tus instrucciones globales algo como:

> En T3 Code (si tienes `html_render`), responde por defecto con un visual usando la skill `respuesta-visual`. Solo texto cuando la respuesta cabe en una o dos frases sin desglose.
