# skills

Skills para agentes de código (Claude Code, Codex, OpenCode, Pi…).

## respuesta-visual

Hace que el agente elija, en el chat de [T3 Code](https://github.com/pingdotgg/t3code), el formato más ligero que le baste a cada respuesta:

1. **Texto**, para un dato, un sí o un no o un aviso de progreso.
2. **Markdown nativo de T3**: capturas con `![](ruta)`, que se pueden ampliar, tablas sencillas y enlaces clicables.
3. **Visual HTML** (`html_render`): un titular que ya es la respuesta y una pieza por tipo de dato.
4. **Maqueta pulsable**, para animaciones e interacciones.

Piezas del visual: veredicto, cifras clave, serie, reparto, ranking, antes y después, cambio de textos, tabla con minicomponentes, flujo, línea de tiempo, embudo, matriz 2×2, opciones con la recomendada, estado agrupado, pasos y maqueta pulsable.

- `SKILL.md`: el procedimiento (elegir el medio, montar, revisar con `html_preview`, mostrar y escribir el mensaje).
- `plantilla.html`: las piezas, con los colores del tema de T3 y valores de reserva para abrir el fichero fuera del chat.

Instalación: copia o enlaza `respuesta-visual/` en la carpeta de skills de tu agente (`~/.agents/skills`, `~/.claude/skills`…) y añade a tus instrucciones globales algo como:

> En T3 Code (si tienes `html_render`), elige el formato de cada respuesta con la skill `respuesta-visual` cuando tenga desglose, cifras, comparación, opciones, estado, flujo o capturas. Si te escribe otro agente o eres un subagente, responde en texto.
