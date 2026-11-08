---
name: respuesta-visual
description: Responder con un visual en el chat de T3. Úsala por defecto en T3 siempre que la respuesta tenga algún desglose, cifras, comparación, opciones, estado o plan, aunque la pregunta sea corta. Solo texto si cabe en una o dos frases sin desglose.
---

# Respuesta visual

1. Copia `plantilla.html` (junto a este fichero) a `~/visuales/AAAA-MM-DD-<tema>.html`, borra las piezas que no uses y rellena el resto. Una sección por idea; su `h2` es la respuesta, sin subtítulo. Cada cifra sale una sola vez. Gris por defecto y color solo en lo que importa.
   Pieza según el dato:
   - Cifra en el tiempo → serie (barras por periodo, resalta los picos).
   - Partes de un total → reparto (barra apilada + lista con valor y %).
   - Lo más grande o lo más pequeño → ranking.
   - Un cambio → antes y después.
   - Varias cosas con varios atributos → tabla (filas y columnas también en móvil); cada columna con el minicomponente que pide su dato y distinto entre columnas: objetivo → anillo «8/25», evolución → total + sparkline, mezcla de dos → píldora bicolor con %, estado → punto. Fila de totales si suma.
   - Decisiones o tareas → estado agrupado: bloquea, pendiente, decidido (omite los grupos vacíos).
   - Secuencia → pasos.
   Opciones y aprobaciones no van en el visual: se piden en el texto del mensaje.
2. Mídelo: `node ~/.agents/skills/respuesta-visual/medir.mjs <fichero>`. Si avisa de problemas, corrígelos y vuelve a medir.
3. Muéstralo con `html_render`: el contenido del fichero tal cual y la `height` que dio `medir.mjs`. Si pasa de 2000, pártelo en varios renders.
4. El texto del mensaje: la ruta del fichero y, solo si las hay, las peticiones al usuario y lo que queda en marcha. No repitas lo que dice el visual.

Sin scroll: nada que no envuelva a 320 px (ni tablas con ancho mínimo ni `overflow`), sin fondo ni márgenes en `html`/`body`. Fuera de T3 (sin `html_render`), texto corto.
