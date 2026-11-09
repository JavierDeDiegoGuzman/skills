---
name: respuesta-visual
description: Elegir y montar el formato de cada respuesta en el chat de T3 (texto, markdown nativo, visual HTML o maqueta pulsable). Úsala en T3 en cada respuesta a una persona que tenga desglose, cifras, comparación, opciones, estado, flujo o capturas, aunque la pregunta sea corta.
---

# Respuesta visual

## 1. Elige el medio más ligero que baste

Sube por la escalera solo mientras el peldaño de abajo se quede corto:

1. **Texto.** Un dato, un sí o un no con su porqué en una frase, un aviso de progreso («todo en verde, sigo con…»).
2. **Markdown nativo de T3.** Capturas con `![qué se ve](/ruta/absoluta.png)`, tablas sencillas, listas cortas, enlaces y `archivo:línea`. T3 las pinta y se pueden ampliar, copiar y pulsar.
3. **Visual.** Cuando dibujar aporta: cifras, comparar, estado, un flujo, opciones para elegir.
4. **Maqueta pulsable.** Animaciones e interacciones que hay que ver moverse o tocar.

Cuando lee otro agente (te escribe otro agente, un encargo o un traspaso de hilo) o eres un subagente, responde en texto. Si un visual anterior de esta conversación ya lo contó, enlázalo en vez de repetirlo.

Si te quedas en el peldaño 1 o 2, aquí acabas.

## 2. Monta el visual

Copia `plantilla.html` (junto a este fichero) a `~/visuales/AAAA-MM-DD-<tema>.html`, fuera de cualquier repo. Quédate con las piezas que uses y rellénalas. Reglas:

- Una sección por idea y **3 como mucho**. Si no caben, sobra contenido.
- El `h2` de cada sección es la respuesta, sin subtítulo. Si la pregunta es de sí o no, abre con un **veredicto**. Si se resume en 2 a 4 números, abre con **cifras clave**.
- Cada cifra sale una sola vez. Gris por defecto y color solo en lo que importa, con las variables del tema de T3 (`--primary`, `--info`, `--success`, `--warning`, `--destructive`, `--chart-1` a `--chart-6`…), nunca con colores fijos.
- Las capturas, las rutas, los enlaces y las PRs van en el texto del mensaje. Dentro del visual no se amplían ni se pueden pulsar.
- Las columnas de alturas distintas se alinean arriba.

Pieza según el dato:

| Dato | Pieza |
| --- | --- |
| Respuesta de sí o no | veredicto |
| 2 a 4 números que lo resumen | cifras clave |
| Una cifra en el tiempo | serie (barras por periodo, resalta los picos) |
| Partes de un total | reparto (barra apilada + lista con valor y %) |
| Lo más grande o lo más pequeño | ranking |
| Una cifra que cambia | antes y después |
| Textos que cambian (copy, mensajes, CTA) | cambio de textos |
| Varias cosas con varios atributos | tabla: cada columna con el minicomponente de su dato (objetivo → anillo «8/25», evolución → total + sparkline, mezcla de dos → píldora bicolor, estado → punto), fila de totales si suma |
| Cómo funciona algo, por dónde pasa | flujo |
| Qué pasó y qué falta, con fechas | línea de tiempo |
| Conversión por pasos | embudo |
| Priorizar por dos ejes | matriz 2×2 |
| Propuestas para elegir | opciones, con la recomendada marcada |
| Decisiones o tareas | estado agrupado: bloquea, pendiente, decidido (sin grupos vacíos) |
| Un plan o una secuencia | pasos |
| Una animación o una interacción | maqueta pulsable (con botón para repetir) |

## 3. Revísalo con `html_preview`

Pásale el contenido del fichero tal cual. Mira el PNG: textos que se cortan, huecos, cosas que se salen o colores que no se leen. Corrige y repite hasta que salga limpio. Si hay dudas en móvil, repítelo con `width: 390`.

## 4. Muéstralo con `html_render`

El contenido del fichero tal cual y como `height` el `contentHeight` de `html_preview`, con 2000 como máximo. En escritorio el marco se ajusta solo.

## 5. Escribe el mensaje

El visual sale encima del mensaje. El texto lleva solo lo que el visual no tiene, en este orden:

1. Las capturas, con `![](ruta)`.
2. Lo que pides decidir o aprobar, con tu recomendación.
3. Lo que queda en marcha y las fuentes o salvedades.
4. Enlaces a PRs y `archivo:línea`.
5. Al final, la ruta del visual como enlace.
