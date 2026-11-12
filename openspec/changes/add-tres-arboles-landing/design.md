# Design

## Context

Ver proposal.md (Why). Estado actual observado:

- Proyecto React 19 + TypeScript ~6 + Vite 8 recién creado desde la plantilla `react-ts`: `src/App.tsx`, `App.css`, `index.css`, `src/assets/*` y `public/icons.svg` son de la plantilla. No hay router, librería de estado, framework CSS ni test runner.
- `tsconfig.app.json` exige `verbatimModuleSyntax` (`import type`), `erasableSyntaxOnly` (sin `enum`/`namespace`), `noUnusedLocals/Parameters`. `npm run build` = `tsc -b && vite build`.
- El código de efectos que la descripción daba por existente **no existe**; se escribe en este cambio.
- Medios disponibles: solo tres MP4 en la raíz del repo, cuyos pesos ya coinciden con el presupuesto del spec (árboles 1,21 MB, franja 0,68 MB, tarjeta 0,13 MB). No hay WebM, ni póster, ni video para la tarjeta "a / procesos". `ffmpeg` no está instalado.
- Contraste medido con la fórmula WCAG: varios tokens originales no llegan a 4.5:1; los valores corregidos ya están en `specs/brand-theme`.

## Goals / Non-Goals

**Goals:**
- Cero dependencias de ejecución nuevas; todo el movimiento con CSS + un hook de React.
- Un único módulo de contenido tipado del que leen todas las secciones.
- Efectos encapsulados en 4 componentes reutilizables para que las secciones sean solo maquetación.
- Cumplir los criterios de aceptación medibles (build, Lighthouse ≥ 95 / ≥ 90 escritorio, 360px, teclado, movimiento reducido).

**Non-Goals:**
- Añadir un test runner o tests automatizados de UI (la verificación es build + lint + revisión manual + Lighthouse).
- Cabecera fija (sticky) o scroll suave: el menú es estático y los anclajes saltan sin animación (el scroll suave contradiría "nunca easing suave").
- Producir el video definitivo de "a / procesos".

## Decisions

### D1. Estructura de archivos
```
src/
  content.ts                    # todo el texto, URLs, placeholders y rutas de medios
  App.tsx                       # compone las secciones
  main.tsx                      # importa styles/*.css
  styles/tokens.css             # :root --ta-*, escala tipográfica
  styles/base.css               # reset, body, tipografía, utilidades (.ta-sr-only, .ta-dot)
  styles/layout.css             # maquetación de secciones y responsive (breakpoint único 900px)
  styles/effects.css            # keyframes, estados hover/focus, @media (prefers-reduced-motion)
  hooks/usePrefersReducedMotion.ts
  hooks/useScramble.ts
  components/GlitchTitle.tsx  BitButton.tsx  BitLink.tsx  LoopVideo.tsx
  sections/SiteHeader.tsx  Hero.tsx  BitStrip.tsx  About.tsx  Projects.tsx  Contact.tsx  SiteFooter.tsx
```
CSS global con prefijo de clase `ta-` en lugar de CSS Modules: la página es una sola vista, los tokens son globales y el efecto se comparte entre componentes. *Alternativa descartada*: CSS por componente (más archivos sin beneficio real a esta escala).

### D2. `content.ts` como objeto `as const`
Exporta un objeto por sección (`nav`, `hero`, `about`, `projects`, `contact`, `footer`) más `media` (rutas sin extensión, p. ej. `'hero/tres-arboles-loop'`). Los placeholders son strings literales entre corchetes. Los titulares con punto terracota se guardan sin el punto final y el componente añade `<span class="ta-dot">.</span>`, para no parsear strings. Renombrar un video a `.v2` es un cambio de una línea en `media`.

### D3. `usePrefersReducedMotion`
`useSyncExternalStore` sobre `matchMedia('(prefers-reduced-motion: reduce)')`. Reacciona a cambios en caliente sin `useEffect` + estado duplicado. Todo componente animado lo consulta; además `effects.css` desactiva animaciones/transiciones bajo la media query (doble barrera: JS para la decodificación y los videos, CSS para rellenos, líneas y buses).

### D4. `useScramble(text, { duration })` → `{ display, run }`
- Reloj con `requestAnimationFrame`, pero el estado solo se actualiza cuando cambia el "cuadro" (cuantizado a ~30 ms), lo que da el aspecto discreto y limita renders.
- Progreso `p = elapsed / duration`; los caracteres con índice `< floor(p · n)` muestran el real; el resto, `0`/`1` aleatorio. Espacios, saltos de línea y signos que no son letras ni dígitos (`→`, `_`, `/`) se mantienen siempre en su sitio.
- `run()` reinicia la decodificación (hover/foco); cancelar el rAF en cleanup. Con movimiento reducido, `display === text` y `run` no hace nada.
- *Alternativa descartada*: animar solo con CSS (imposible mutar caracteres) o `setInterval` (deriva y no se pausa en pestañas ocultas).

### D5. `GlitchTitle`
`<h1 aria-label="Tres Árboles">` con tres hijos `aria-hidden`: texto base y dos capas (`--a` terracota, `--b` `--ta-ink-4`) que renderizan el mismo `display`, con `white-space: pre-line` para respetar `\n`. Un estado `glitching` añade la clase `is-glitching`, que activa en las capas `ta-glitch-slice` (cortes con `clip-path: inset()` y `translate` de 2–6px, `steps(3)`).
- Entrada: `run()` al montar; `glitching = true` durante 1100 + 450 ms.
- Tic: `setInterval(7000)` → `glitching = true` 260 ms (sin redecodificar).
- Con movimiento reducido: no hay timers y las capas no se renderizan.

### D6. `BitButton` (enlace con aspecto de botón)
Todos los "botones" navegan a anclas, así que se renderizan como `<a href>` (semántica correcta para el lector de pantalla y el teclado). Props: `href`, `variant: 'primary' | 'secondary' | 'outline'` (`outline` = "hablemos_" del menú, borde terracota en reposo), `label`, `arrow?`. Estructura: `<a aria-label={label}>` › `span.ta-btn__fill` + `span.ta-btn__text[aria-hidden]` (`display` de `useScramble(label, 320)`) + `span.ta-btn__arrow[aria-hidden]`.
- `onPointerEnter` / `onFocus` → `run()`.
- Relleno: `transform: scaleX(0→1)`, `transform-origin: left`, `transition 280ms steps(7)`. Primario: relleno crema; secundario/outline: relleno terracota. En hover el texto de todos los variantes pasa a `--ta-bg` (decisión de contraste del spec).
- Salto de señal: `animation: ta-signal 120ms steps(1) 2` con `box-shadow: -2px 0 0 #EE8A60, 2px 0 0 #E2DACE` (sin desenfoque, compatible con "sin sombras suaves").
- Flecha `translateX(4px)`; `:active` → `translateY(1px)`.

### D7. `BitLink` (menú y filas de contacto)
Props: `href`, `index`, `label`, `value?`, `arrow?`, `external?`, `variant: 'nav' | 'row'`. La línea de bits es un `span[aria-hidden]` con una cadena fija de 0/1 en fuente de 8px y color terracota, revelada con `clip-path: inset(0 100% 0 0) → inset(0)` en `300ms steps(8)`. La flecha usa `translateX(6px)` en `240ms steps(3)`. La variante `row` añade fondo `rgb(from var(--ta-accent) r g b / 0.08)` (con respaldo `rgba(204, 90, 49, .08)`). Externos: `target="_blank" rel="noopener noreferrer"`. Índice en reposo `--ta-ink-2`, activo `--ta-accent`.

### D7b. Decodificación en el menú (ajuste posterior)
`BitLink` variante `nav` usa `useScramble(label, 320 ms)`; la etiqueta visible es un `span[aria-hidden]` con `display` y el enlace lleva `aria-label="{índice} {etiqueta}"` (coincide con el texto visible, WCAG 2.5.3). En hover/foco la etiqueta pasa a `--ta-accent` (4.78:1). La variante `row` no cambia (ver D7c).

### D7c. Filas de contacto: decodificación y binario real (ajuste posterior)
La variante `row` también usa `useScramble(label, 320 ms)` y su etiqueta pasa a `--ta-accent` en hover/foco, igual que el menú (4.50:1 sobre el tinte del 8 %; `--ta-accent-hot` daría 7.49:1 si el tinte aumentara). La etiqueta animada es `span[aria-hidden]` y el nombre real va en un `.ta-sr-only` hermano, así el nombre accesible sigue saliendo del contenido sin `aria-label`. La línea de bits deja de ser `BIT_LINE`: es `TextEncoder().encode(label)` en bytes de 8 bits separados por espacio, y el span recibe `--ta-bytes` para revelarse con `steps(var(--ta-bytes))` en `--ta-bytes × 40 ms` (un paso por byte). Su ancho se ajusta al contenido (`right: auto`, `max-width: 100% − 32px`) y con `white-space: pre-wrap` salta a una segunda línea entre bytes en filas estrechas (a 360px Instagram ocupa 2 líneas de 9px dentro del padding inferior). El menú conserva `BIT_LINE`, como pidió el usuario.

### D8d. Portada de Autonom IA en video (ajuste posterior)
El usuario añadió `public/media/projects/autonomia-loop.webm` (VP9 1080×900, 12 s, 12 fps, 1,5 MB, sin MP4). Sustituye al dibujo ASCII (`<pre role="img">`, que se elimina junto con `AGENT_ART`) como portada de la ficha. Se recodifica (original respaldado fuera del repo): `crop=1080:896:0:2` para evitar la fila verde de Chrome con VP9 a 900px de alto; WebM `-crf 42` (945 KB) y MP4 H.264 `-crf 30 -movflags +faststart` (888 KB), sin diferencia visible frente al original a 2× de zoom. Es el mismo archivo aún no publicado, así que conserva el nombre (la regla `.v2` aplica desde la primera publicación). Se usa `LoopVideo` con `aria-label` (es contenido, no decoración) y sin póster: está bajo el pliegue y con movimiento reducido se queda en el primer cuadro, las letras "IA". Maquetación: la ficha usa `minmax(0, 1fr)` en ambas columnas y el alto lo marca el texto, con un mínimo de `clamp(300px, 27vw, 420px)` (en móvil, alto fijo `clamp(220px, 62vw, 380px)`). El video va en `position: absolute` con `object-fit: contain`: se encoge entero, sin recorte, y los márgenes laterales no se ven porque su fondo es `--ta-bg`. *Primer intento descartado*: la columna con `aspect-ratio: 1080/896` y `object-fit: cover` hacía la ficha demasiado alta (558px a 1440, 756px a 1920); el usuario pidió reducirla y ahora mide 412 / 420px.

### D8b. Títulos de sección con glitch sutil (ajuste posterior)
Nuevo `GlitchHeading` (h2) que reutiliza las capas `.ta-glitch__layer` con el modificador `.ta-glitch--subtle` (keyframes propias: desplazamiento ≤ 3px, franjas finas). Un `IntersectionObserver` guarda si el título es visible; un `setInterval` de 20 s activa `is-glitching` 200 ms solo si lo es. Se eligió 20 s (frente a 30 s) porque el usuario suele pasar menos de 30 s en una sección. Con movimiento reducido no hay capas ni timers. `GlitchTitle` (h1) se mantiene aparte porque además decodifica el texto.

### D8c. Cabecera de tarjeta (ajuste posterior)
La cabecera pasa de `aspect-ratio: 840/128` (~100px a 1440, hasta 137px a 1920) a una banda fija de 64px. El video se encoge a la altura de la banda (0,5×, 420px de ancho, sin recorte vertical: un primer intento con `object-fit: cover` recortaba la tercera fila de bits y se descartó). Para cubrir el ancho, la banda es un flex con **3 copias** del mismo `LoopVideo` (`startAt` 0 / 2 / 4 s) → 1260px, suficiente para la tarjeta más ancha (~900px a 1920). *Alternativa descartada*: re-codificar un video ancho en mosaico (2520×128): un solo decodificador, pero triplica el peso del asset y rompe el presupuesto del spec. Las copias comparten URL (una sola descarga) y las que quedan recortadas por `overflow: hidden` no intersecan, así que el IntersectionObserver las mantiene en pausa. El cuerpo de la tarjeta gana aire (más padding y alto mínimo).

Todos los videos llevan `disablePictureInPicture` para que el navegador no superponga el botón de imagen en imagen.

### D8. Tarjetas y bus
Las tarjetas no son interactivas (no hay destino), así que el efecto es solo `:hover`. El bus es un `::after` de 2px en la base con relleno de dos tramos de borde duro (cola `--ta-accent-dim` 0–75 %, cabeza `--ta-accent-hot` 75–100 %), revelado con `clip-path` en `300ms steps(8)`. Al usar un corte duro no hay un degradado decorativo.

### D9. `LoopVideo`
Props: `src` (ruta sin extensión de `content.media`), `poster?`, `label?` (si no hay, `aria-hidden`), `className`. URL = `` `${import.meta.env.BASE_URL}media/${src}.webm` `` y `.mp4` en ese orden de `<source>`. `muted loop playsInline preload="metadata"` (más `el.muted = true` por ref, porque React no siempre refleja el atributo). Un `IntersectionObserver` (umbral 0.1) llama a `play().catch(() => {})` o a `pause()`. Con movimiento reducido no se observa y se fuerza `pause()`. Un observador por video: son pocas instancias (portada, franja, 6 copias de tarjeta y la portada del proyecto), así que no hace falta un observador compartido.

### D10. Fuentes e `index.html`
`<html lang="es">`, `<title>Tres Árboles — Automatización que echa raíces</title>`, `meta description`, `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com` (`crossorigin`), hoja `css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500&display=swap`, y `<link rel="preload" as="image" href="%BASE_URL%media/hero/tres-arboles-poster.webp">` para el LCP de la portada. Favicon: SVG simple con tres barras terracota sobre `--ta-bg`, que sustituye al de Vite.

### D11. Responsive
Un único breakpoint `max-width: 899px`. Portada y ficha usan grid de 2 columnas que pasa a 1. El texto de la portada ya va primero en el DOM; en la ficha de proyecto el texto va después del arte en el DOM, así que en móvil se reordena con `order`. El video del héroe (118 %) y la franja (`min-width: 1000px`, `left: 50%`, `translateX(-50%)`) viven en contenedores con `overflow: hidden`; no se usa `overflow-x` en `body` para no tapar desbordes reales. Los objetivos táctiles de 44px se consiguen con `min-height: 44px` + `inline-flex` en enlaces y botones.

### D12. Pipeline de medios
1. Instalar ffmpeg (`winget install Gyan.FFmpeg`, herramienta local, no dependencia del proyecto).
2. Mover y renombrar: `hero-tres-arboles.mp4` → `public/media/hero/tres-arboles-loop.mp4`; `tre-arboles-franja-bits-loop.mp4` → `strips/franja-bits-loop.mp4`; `tre-arboles-card-b-loop.mp4` → `cards/card-productos-loop.mp4` y copia a `cards/card-procesos-loop.mp4` (temporal).
3. WebM: `ffmpeg -i X.mp4 -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -an X.webm`, ajustando `-crf` hasta entrar en el presupuesto.
4. Póster: `ffmpeg -i tres-arboles-loop.mp4 -frames:v 1 -c:v libwebp -quality 80 tres-arboles-poster.webp`.
5. Verificar resolución y duración con `ffprobe` frente al spec.

*Hallazgo de implementación*: Chrome decodifica el VP9 de 1440×**900** con una fila verde en el borde superior (el MP4 y el decodificador de ffmpeg no lo hacen). Se reproduce con y sin tiles/`row-mt` y desaparece con una altura múltiplo de 8. El WebM de la portada se codifica a 1440×896 (`-vf crop=1440:896:0:2`, 2px negros menos arriba y abajo, imperceptible); el MP4 se queda en 1440×900. La franja (192) y las tarjetas (128) ya son múltiplos de 64. Regla para futuros videos: alturas WebM múltiplo de 8.

## Risks / Trade-offs

- [Los tokens corregidos (#CC5A31, #847B71) se desvían del diseño cerrado] → Diferencia mínima (≈ +4 % de luminosidad), documentada en proposal y spec. Revertir es un cambio de dos líneas en `tokens.css` si la marca lo exige, a costa del criterio de Lighthouse.
- [Videos sin póster (franja, tarjetas) con `preload="metadata"` pueden verse vacíos con movimiento reducido en Safari] → Son decorativos y `aria-hidden`; el fondo `--ta-surface` del contenedor evita huecos llamativos. Si molesta, se generan pósters con el mismo comando de D12.
- [La tarjeta "a / procesos" muestra temporalmente el video de "b / productos"] → Al llegar el video real se publica como `card-procesos-loop.v2.*` y se cambia una línea en `content.media`.
- [`useScramble` re-renderiza el componente en cada cuadro durante 320–1100 ms] → Afecta solo al componente que anima; los cuadros cuantizados limitan los renders a unos 35 por animación.
- [La hoja de Google Fonts bloquea el renderizado] → `preconnect` + `display=swap`; para Lighthouse ≥ 90 en escritorio es suficiente. Si no lo es, se autoalojan las fuentes en una iteración posterior.
- [Leer `aria-label` en `<h1>` y en `<a>`, en lugar del contenido, depende del lector de pantalla] → Es compatible con NVDA, JAWS y VoiceOver; se verifica con un lector durante la tarea de accesibilidad.
- [No hay tests automatizados] → La verificación por tarea se define con comandos (`build`, `lint`), comprobaciones en DevTools y Lighthouse por CLI.

## Migration Plan

Despliegue estático de `dist/` en cualquier hosting. No hay datos ni estado que migrar; rollback = redeploy de la build anterior.

## Open Questions

- URLs reales de LinkedIn e Instagram y destino de "ver proyecto →". Hasta tenerlos, `content.ts` muestra los placeholders entre corchetes y los enlaces apuntan a `#contacto`. Rellenarlos más tarde es un cambio de contenido que no altera specs ni tareas.
- Video definitivo de "a / procesos" (ver Risks).
