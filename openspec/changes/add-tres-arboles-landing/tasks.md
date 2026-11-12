# Tasks

## 1. Medios (media-assets)

- [x] 1.1 Instalar ffmpeg (`winget install Gyan.FFmpeg`) y verificar que `ffmpeg -version` y `ffprobe -version` responden en una terminal nueva
- [x] 1.2 Crear `public/media/{hero,strips,cards}/` y mover/renombrar los MP4 de la raíz según design D12 (incluida la copia temporal `card-procesos-loop.mp4`); verificar que la raíz ya no contiene `.mp4` y que existen los 4 MP4 en sus rutas
- [x] 1.3 Comprobar con `ffprobe` resolución y duración de cada MP4 (árboles 1440×900 6 s, franja 2880×192 12 s, tarjetas 840×128 6 s) y eliminar la pista de audio si existe; anotar cualquier desviación
- [x] 1.4 Generar los 4 `.webm` (VP9, sin audio) ajustando `-crf` hasta quedar dentro de +25 % del peso objetivo del spec; verificar pesos con `ls -l`
- [x] 1.5 Generar `hero/tres-arboles-poster.webp` desde el primer cuadro y verificar que abre y mide 1440×900

## 2. Base del proyecto y tema (brand-theme)

- [x] 2.1 Eliminar los restos de la plantilla (`src/App.css`, `src/assets/`, `public/icons.svg`) y vaciar `src/index.css`; verificar con `grep -r "assets/\|icons.svg\|App.css" src index.html` sin resultados
- [x] 2.2 Actualizar `index.html` (`lang="es"`, título, meta description, preconnect + Google Fonts con `display=swap`, preload del póster con `%BASE_URL%`) y sustituir `public/favicon.svg` por el favicon de tres barras; verificar en `npm run dev` que la pestaña muestra título y favicon nuevos y que las fuentes cargan en la pestaña Network
- [x] 2.3 Crear `src/styles/tokens.css` con los 11 tokens `--ta-*` (valores corregidos del spec) y la escala tipográfica; crear `src/styles/base.css` (reset, fondo `--ta-bg`, familias, `border-radius: 0`, `.ta-sr-only`, `.ta-dot`) e importarlos en `main.tsx` en lugar de `index.css`; verificar en DevTools que `:root` expone los tokens y que el fondo es #0B0A09
- [x] 2.4 Crear `src/content.ts` (objeto `as const`) con todos los textos, URLs, placeholders entre corchetes, arte ASCII del agente, líneas de bits del pie y el mapa `media`; verificar con `npx tsc -b` sin errores

## 3. Hooks y componentes de efectos (motion-effects)

- [x] 3.1 Implementar `src/hooks/usePrefersReducedMotion.ts` con `useSyncExternalStore` + `matchMedia`; verificar emulando `prefers-reduced-motion` en DevTools (Rendering) que el valor cambia en caliente
- [x] 3.2 Implementar `src/hooks/useScramble.ts` según design D4 (cuadros cuantizados, conserva espacios/saltos/símbolos, `run()`, no-op con movimiento reducido, cleanup del rAF); verificar en el navegador que "Tres\nÁrboles" se decodifica en ~1100 ms sin mover el salto de línea
- [x] 3.3 Crear `src/styles/effects.css` con los keyframes (`ta-glitch-slice` en `steps(3)`, `ta-signal`), los estados hover/`:focus-visible` (contorno 2px #EE8A60, offset 3px), el bus de tarjetas, la línea de bits y el bloque `@media (prefers-reduced-motion: reduce)` que anula animaciones y transiciones; verificar con `grep -nE "ease|cubic-bezier" src/styles` sin resultados
- [x] 3.4 Implementar `src/components/GlitchTitle.tsx` (design D5: `aria-label`, capas `aria-hidden`, entrada 1100 + 450 ms, tic de 260 ms cada 7 s, sin capas ni timers con movimiento reducido); verificar visualmente la entrada y el tic, y en el árbol de accesibilidad de DevTools que el nombre del h1 es "Tres Árboles"
- [x] 3.5 Implementar `src/components/BitButton.tsx` con variantes `primary | secondary | outline` (design D6); verificar en hover y con Tab: decodificación de 320 ms, relleno por pasos, texto en `--ta-bg`, salto de señal, flecha +4px y hundimiento de 1px al pulsar
- [x] 3.6 Implementar `src/components/BitLink.tsx` con variantes `nav | row` (design D7); verificar en hover y con Tab: índice terracota, línea de bits en `steps(8)`, flecha +6px y tinte del 8 % en filas
- [x] 3.7 Implementar `src/components/LoopVideo.tsx` (design D9: fuentes WebM → MP4 con `BASE_URL`, `muted loop playsInline preload="metadata"`, IntersectionObserver, `aria-label` o `aria-hidden`, pausa con movimiento reducido); verificar en Network que se pide el `.webm` y en consola que el video se pausa al salir de pantalla

## 4. Secciones y maquetación (landing-layout)

- [x] 4.1 Crear `src/styles/layout.css` con la estructura general (líneas de 1px `--ta-ink-0` entre bloques, contenedor) y reescribir `src/App.tsx` para componer las 7 secciones en orden; verificar con `npm run build` sin errores
- [x] 4.2 Implementar `sections/SiteHeader.tsx` (marca "101" + "Tres Árboles", enlaces `BitLink nav`, `BitButton outline` "hablemos_" → `#contacto`); verificar que cada enlace navega a su ancla
- [x] 4.3 Implementar `sections/Hero.tsx` (`#inicio`, columnas 50/50, alto `clamp(560px, 52vw, 780px)`, `GlitchTitle`, slogan, descripción, botones primario/secundario, servicios al pie, video al 118 % con póster y etiquetas FIG. 01 / coordenadas); verificar a 1440px el contenido completo y el recorte del video
- [x] 4.4 Implementar `sections/BitStrip.tsx` (96px de alto, `min-width: 1000px` centrado, `aria-hidden`); verificar a 600px que se recorta por ambos lados sin scroll horizontal
- [x] 4.5 Implementar `sections/About.tsx` (`#nosotros`, etiqueta 01, h2 con punto terracota, párrafo, grid `auto-fit minmax(300px, 1fr)` con 2 tarjetas con cabecera de video y bus en hover); verificar el hover de ambas tarjetas
- [x] 4.6 Implementar `sections/Projects.tsx` (`#proyectos` sobre `--ta-surface`, etiqueta 10, h2, ficha Autonom IA con `<pre role="img" aria-label>`, datos `tipo`/`estado = [por definir]`, botón "ver proyecto →"); verificar que el lector o el árbol de accesibilidad anuncia la descripción del dibujo y no los dígitos
- [x] 4.7 Implementar `sections/Contact.tsx` (`#contacto`, etiqueta 11, "Hablemos." con punto terracota, frase, filas `BitLink row` de LinkedIn e Instagram) y `sections/SiteFooter.tsx` (líneas de bits T1/T0 `aria-hidden`, nombre, "automatización con ia · © mmxxvi"); verificar contenido y que los enlaces externos usan `rel="noopener noreferrer"`
- [x] 4.8 Añadir el responsive de `layout.css` (breakpoint 899px: una columna con el texto antes de las imágenes en portada, tarjetas, ficha y contacto; menú en segunda fila; `min-height: 44px` en interactivos; arte ASCII escalable); verificar en DevTools a 360, 375, 768 y 1440px que `document.documentElement.scrollWidth <= innerWidth` y que los objetivos táctiles miden ≥ 44px

## 5. Verificación de aceptación

- [x] 5.1 Ejecutar `npm run lint` y `npm run build` sin errores ni avisos de tipos
- [x] 5.2 Recorrer la página solo con teclado (Tab/Shift+Tab/Enter) y verificar que todos los interactivos son alcanzables en orden lógico, con foco visible y que las anclas navegan
- [x] 5.3 Con "reducir movimiento" emulado, recargar y verificar: título estático desde el primer cuadro, sin capas de glitch, sin rellenos, líneas ni buses animados, y videos detenidos (póster en la portada)
- [x] 5.4 Ejecutar Lighthouse en escritorio sobre `npm run preview` (`npx lighthouse http://localhost:4173 --preset=desktop --only-categories=accessibility,performance`) y verificar Accesibilidad ≥ 95 y Rendimiento ≥ 90; corregir y repetir si no
- [x] 5.5 Actualizar `CLAUDE.md` (sección de estado del proyecto y arquitectura: `content.ts`, estructura de `src/`, convenciones de efectos y medios, regla de renombrado `.v2`) y verificar que no menciona ya la plantilla de Vite

## 6. Ajustes tras revisión

- [x] 6.1 Decodificar en terracota la etiqueta de los enlaces del menú en hover/foco (design D7b) y verificar en headless que a ~120 ms se ven bits, a 450 ms la palabra correcta en terracota, que la línea de bits sigue y que el nombre accesible es "01 nosotros"
- [x] 6.2 Reducir la cabecera de video de las tarjetas a 64px y ampliar el cuerpo (design D8c); verificar a 1440 y 1920px que la cabecera mide 64px y la escala del video es ≤ 1,1×
- [x] 6.3 Crear `GlitchHeading` y aplicarlo a los h2 de nosotros, proyectos y contacto (design D8b); verificar que el glitch se activa solo con el título visible, dura ~200 ms y no aparece con movimiento reducido
- [x] 6.4 Repetir lint, build, comprobación a 360px y Lighthouse escritorio, y verificar que se mantienen los criterios de aceptación (a11y ≥ 95, perf ≥ 90)
- [x] 6.5 Encoger el video de las tarjetas a la altura de la banda (0,5×) y repetirlo en horizontal con 3 copias desfasadas (design D8c, corrige 6.2); verificar a 375, 1440 y 1920px que cada copia mide 64px de alto sin recorte vertical, que no hay huecos laterales y que las copias recortadas quedan en pausa
- [x] 6.6 Añadir `disablePictureInPicture` a todos los videos; verificar que los 6+ elementos `<video>` del DOM tienen el atributo, y repetir lint, build y Lighthouse escritorio
- [x] 6.7 Decodificar la etiqueta de las filas de contacto en terracota y sustituir su línea de bits por la traducción real a binario del nombre, revelada byte a byte (design D7c); verificar en headless a 1440, 1000 y 360px la decodificación, el binario de LinkedIn e Instagram, que la línea no sale de la fila, el nombre accesible, el contraste ≥ 4.5:1 y el movimiento reducido; repetir lint, build y Lighthouse escritorio
- [x] 6.8 Sustituir el dibujo ASCII de la ficha por el video `projects/autonomia-loop` (design D8d): recodificar a 1080×896 (WebM + MP4), añadirlo a `content.media`, usar `LoopVideo` con `aria-label` y ajustar la columna; verificar a 360, 768, 1000, 1440 y 1920px que video y ficha miden lo mismo, que el texto va primero en móvil, que no aparece la fila verde, el nombre accesible, la pausa fuera de pantalla y con movimiento reducido; repetir lint, build y Lighthouse escritorio
- [x] 6.9 Reducir el alto de la portada del proyecto (design D8d): el alto lo marca la ficha de texto con un mínimo y el video se encoge con `object-fit: contain`; verificar a 360, 768, 1000, 1440 y 1920px que video y ficha miden lo mismo, que el video se ve entero sin bordes visibles y que no hay scroll horizontal; repetir lint, build y Lighthouse escritorio

## Workflow follow-up

- Sustituir `card-procesos-loop.*` por el video definitivo como `card-procesos-loop.v2.*` cuando exista.
- Rellenar las URLs de LinkedIn, Instagram y "ver proyecto" en `src/content.ts`.
- Archivar el cambio con `/opsx:archive` tras la revisión, para pasar los specs a `openspec/specs/`.
