# Spec Delta

## Purpose

Define la identidad visual y verbal de Tres Árboles en la web: paleta, tipografía, escala, contraste y voz, para que toda la interfaz se perciba como una sola marca coherente.

## ADDED Requirements

### Requirement: Tokens de color de marca
La página SHALL exponer como variables CSS globales en `:root` once tokens de color `--ta-*` con los valores listados en el escenario, y SHALL usarlos para todo color de la interfaz. `--ta-ink-2` y `--ta-accent` están aclarados respecto al diseño original (#7E766C y #C4572F) para alcanzar 4.5:1.

#### Scenario: Tokens disponibles
- **WHEN** se inspeccionan los estilos computados de `:root`
- **THEN** existen `--ta-bg` #0B0A09, `--ta-surface` #110F0D, `--ta-ink-0` #2B2723, `--ta-ink-1` #4F4943, `--ta-ink-2` #847B71, `--ta-ink-3` #B3AA9D, `--ta-ink-4` #E2DACE, `--ta-cream` #F7F3EC, `--ta-accent` #CC5A31, `--ta-accent-hot` #EE8A60 y `--ta-accent-dim` #7A3A22

#### Scenario: Sin colores fuera de la paleta
- **WHEN** se revisan los estilos de la página
- **THEN** cada color usado corresponde a un token `--ta-*` o a una mezcla con transparencia de uno de ellos

### Requirement: Rol de cada color
El fondo de la página SHALL ser `--ta-bg`; tarjetas y banda de proyectos `--ta-surface`; líneas y bordes `--ta-ink-0`; bits apagados decorativos (ocultos a tecnologías de asistencia) `--ta-ink-1`; índices del menú en reposo y etiquetas no esenciales `--ta-ink-2`; texto secundario `--ta-ink-3`; texto destacado `--ta-ink-4`; texto principal `--ta-cream`. `--ta-accent` SHALL ser el único color de acento.

#### Scenario: Fondo y texto principal
- **WHEN** se carga la página
- **THEN** el fondo es #0B0A09 y el texto de párrafo principal es #F7F3EC o un tono `--ta-ink-*` según su rol

#### Scenario: Banda de proyectos
- **WHEN** se visualiza la sección `#proyectos`
- **THEN** su fondo es `--ta-surface`

### Requirement: Proporción cromática
En cualquier vista de la página, la superficie SHALL ser aproximadamente 80 % negros (`--ta-bg`, `--ta-surface`), 15 % tonos (`--ta-ink-*`, `--ta-cream`) y 5 % terracota (`--ta-accent*`).

#### Scenario: Revisión visual de la portada
- **WHEN** se observa la portada en escritorio
- **THEN** el terracota se limita a acentos puntuales (marca "101", botón primario, puntos finales, etiquetas activas) y no ocupa grandes superficies

### Requirement: Estética plana y lineal
La interfaz SHALL NOT usar degradados decorativos, sombras difusas ni bordes redondeados. Las líneas divisorias y bordes SHALL medir 1px.

#### Scenario: Sin redondeos ni sombras suaves
- **WHEN** se inspeccionan botones, tarjetas y contenedores
- **THEN** su `border-radius` es 0, no hay `box-shadow` con desenfoque en reposo y sus bordes miden 1px

### Requirement: Familias tipográficas
Los títulos (h1, h2, h3, "Hablemos.", nombre de marca) SHALL usar Space Grotesk 400/500 con espaciado entre letras negativo entre −0.02em y −0.05em. Todo el resto del texto (párrafos, menú, botones, etiquetas) SHALL usar JetBrains Mono 400/500/700. Las fuentes SHALL cargarse desde Google Fonts con `preconnect` y `display=swap`.

#### Scenario: Títulos en Space Grotesk
- **WHEN** se inspecciona el h1 "Tres Árboles"
- **THEN** su fuente es Space Grotesk con `letter-spacing` negativo dentro del rango indicado

#### Scenario: Interfaz en JetBrains Mono
- **WHEN** se inspecciona un botón, un enlace del menú o un párrafo
- **THEN** su fuente es JetBrains Mono

#### Scenario: Carga no bloqueante
- **WHEN** las fuentes aún no han descargado
- **THEN** el texto se muestra con la fuente de respaldo y se sustituye al cargar

### Requirement: Escala tipográfica
Los tamaños SHALL ser: h1 `clamp(72px, 9.2vw, 132px)` con interlineado 0.9; slogan `clamp(22px, 2.1vw, 30px)`; h2 `clamp(36px, 4.2vw, 60px)`; "Hablemos." `clamp(64px, 9vw, 140px)`; h3 26px; cuerpo 14–15px con interlineado 1.75; botones 13px; etiquetas 11–12px.

#### Scenario: Escala del h1 en escritorio ancho
- **WHEN** el viewport mide 1440px de ancho
- **THEN** el h1 mide 132px con interlineado 0.9

#### Scenario: Escala del h1 en móvil
- **WHEN** el viewport mide 360px de ancho
- **THEN** el h1 mide 72px

### Requirement: Contraste accesible
Todo texto visible SHALL tener un contraste mínimo de 4.5:1 con su fondo (3:1 si es texto grande ≥ 24px, o ≥ 18.66px en negrita), en cualquier estado (reposo, hover, foco). El texto sobre relleno terracota SHALL ir en `--ta-bg` (4.78:1); el texto crema sobre terracota (4.0:1) SHALL usarse solo con tamaño de 24px o mayor. `--ta-ink-1` SHALL NOT usarse para texto legible.

#### Scenario: Botón primario en reposo
- **WHEN** se mide el contraste del texto del botón primario
- **THEN** el texto es `--ta-bg` sobre `--ta-accent` con contraste ≥ 4.5:1

#### Scenario: Etiquetas terracota pequeñas
- **WHEN** se mide una etiqueta de sección ("01", "10", "11") en `--ta-accent` sobre `--ta-bg` o `--ta-surface`
- **THEN** el contraste es ≥ 4.5:1

#### Scenario: Texto esencial
- **WHEN** se audita la página con una herramienta de contraste
- **THEN** ningún texto esencial queda por debajo de 4.5:1

### Requirement: Voz de marca
Las secciones SHALL numerarse en binario (01 nosotros, 10 proyectos, 11 contacto). Botones y menú SHALL ir en minúscula (p. ej. `hablemos_`). Los antetítulos SHALL tener forma de comentario de código (`// automatización con inteligencia artificial`). Los titulares que terminan en punto SHALL mostrar ese punto final en terracota. Todo el texto SHALL estar en español.

#### Scenario: Numeración binaria
- **WHEN** se lee el menú
- **THEN** aparecen "01 nosotros", "10 proyectos" y "11 contacto"

#### Scenario: Punto final terracota
- **WHEN** se muestra el h2 "Lo que hemos hecho crecer."
- **THEN** el punto final se ve en `--ta-accent` y el resto en el color del titular
