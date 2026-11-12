# Proposal

## Why

Tres Árboles (automatización con inteligencia artificial para empresas) no tiene presencia web: el proyecto sigue siendo la plantilla de Vite. El diseño de marca ya está cerrado ("tres árboles hechos de bits que crecen de una misma raíz", slogan "Automatización que echa raíces.") y hace falta una landing de una sola página que presente la empresa y su primer proyecto, Autonom IA, y canalice el contacto hacia sus redes.

## What Changes

- Sustituir la plantilla de Vite (`App.tsx`, `App.css`, `index.css`, `src/assets/*`, `public/icons.svg`) por la landing de Tres Árboles en español.
- Añadir un sistema de tokens de marca (colores, tipografía Space Grotesk + JetBrains Mono, escala tipográfica, voz) como variables CSS globales. Dos tokens se aclaran mínimamente respecto al diseño para cumplir 4.5:1 (medido: `--ta-bg` sobre #C4572F da 4.48:1, no 4.7:1): `--ta-accent` #C4572F → #CC5A31 y `--ta-ink-2` #7E766C → #847B71. Los índices del menú pasan de `--ta-ink-1` (2.23:1) a `--ta-ink-2`, y el texto del botón secundario en hover pasa de crema (4.0:1) a `--ta-bg`.
- Construir las secciones: menú, portada `#inicio`, franja de bits, `#nosotros`, `#proyectos` (ficha Autonom IA), `#contacto` y pie, con diseño responsive desde 360px.
- Centralizar todo el texto, URLs y placeholders (`[url de linkedin]`, `[usuario de instagram]`, `[por definir]`) en un único módulo de contenido.
- Implementar desde cero los efectos de movimiento "por pasos" (glitch/decodificación del título, hovers de botones, enlaces, filas y tarjetas, foco de teclado) sin librerías de animación, con soporte completo de `prefers-reduced-motion`. El código de efectos que la descripción original daba por existente (`effects.css`, `useScramble`, `usePrefersReducedMotion`, `GlitchTitle`, `BitButton`, `BitLink`, `LoopVideo`) no está en el repositorio y se crea en este cambio.
- Organizar los videos en `public/media/` con WebM + MP4 y póster WebP, reproducción solo cuando son visibles. Los tres MP4 actuales de la raíz se mueven y renombran; WebM y póster se generan a partir de ellos; el video existente `tre-arboles-card-b-loop.mp4` corresponde a la tarjeta "b / productos"; la tarjeta "a / procesos" lo reutiliza temporalmente hasta tener su video definitivo.
- Actualizar `index.html` (`lang="es"`, título, descripción, carga de fuentes).

## Capabilities

### New Capabilities
- `brand-theme`: paleta de colores, proporciones de uso, tipografía, escala tipográfica, contraste mínimo y voz de marca (numeración binaria, minúsculas, antetítulos como comentario, punto final terracota).
- `landing-layout`: estructura de la página única, contenido de cada sección, origen centralizado del contenido y comportamiento responsive.
- `motion-effects`: animaciones por pasos del título, botones, enlaces, filas de contacto y tarjetas; foco de teclado; accesibilidad del texto animado; movimiento reducido.
- `media-assets`: ubicación, nombres, formatos, carga, reproducción por visibilidad, accesibilidad e invalidación de caché de los videos y el póster.

### Modified Capabilities
<!-- Ninguna: no existen specs previas en openspec/specs/. -->

## Impact

- **Código**: reemplazo completo de `src/App.tsx`, `src/App.css`, `src/index.css`; nuevos `src/content.ts`, `src/sections/*`, `src/components/*`, `src/hooks/*`, `src/styles/*`; eliminación de `src/assets/*` y `public/icons.svg`; edición de `index.html` y `public/favicon.svg`.
- **Assets**: los MP4 de la raíz pasan a `public/media/` con los nombres del spec; se añaden WebM y póster WebP.
- **Dependencias**: ninguna de ejecución nueva. Herramienta de desarrollo externa: `ffmpeg` (no instalado actualmente) para generar WebM y póster.
- **Externo**: Google Fonts (Space Grotesk, JetBrains Mono) cargadas desde el navegador.
- **Fuera de alcance**: CMS, blog, formularios, backend, i18n, páginas de detalle de proyecto, producción de videos nuevos.
