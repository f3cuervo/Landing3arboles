# Spec Delta

## Purpose

Define la estructura de la landing de una sola página de Tres Árboles: sus secciones, el contenido de cada una, la fuente única del contenido y su comportamiento responsive desde 360px.

## ADDED Requirements

### Requirement: Página única con bloques separados
La landing SHALL ser una sola página con, en orden: menú, portada `#inicio`, franja de bits, `#nosotros`, `#proyectos`, `#contacto` y pie. Cada bloque SHALL separarse del siguiente con una línea de 1px en `--ta-ink-0`. El documento SHALL declarar `lang="es"`.

#### Scenario: Orden de secciones
- **WHEN** se recorre la página de arriba abajo
- **THEN** aparecen menú, portada, franja, nosotros, proyectos, contacto y pie en ese orden, separados por líneas de 1px

#### Scenario: Idioma del documento
- **WHEN** un lector de pantalla abre la página
- **THEN** el idioma declarado es español

### Requirement: Menú de navegación
El menú SHALL mostrar a la izquierda "101" en terracota seguido de "Tres Árboles" en Space Grotesk; al centro los enlaces "01 nosotros", "10 proyectos" y "11 contacto" hacia `#nosotros`, `#proyectos` y `#contacto`; a la derecha un botón "hablemos_" con borde terracota que lleva a `#contacto`.

#### Scenario: Navegación por anclas
- **WHEN** el usuario activa "10 proyectos"
- **THEN** la página se desplaza a la sección `#proyectos`

#### Scenario: Botón hablemos_
- **WHEN** el usuario activa "hablemos_"
- **THEN** la página se desplaza a `#contacto`

### Requirement: Portada lado a lado
La portada `#inicio` SHALL tener dos columnas 50/50 con alto `clamp(560px, 52vw, 780px)`. La columna izquierda, con borde derecho y contenido repartido en vertical, SHALL contener, en orden: antetítulo, h1 en dos líneas, slogan, descripción, botón primario "hablemos →" (a `#contacto`), botón secundario "ver proyectos" (a `#proyectos`) y, al pie, los dos servicios.

#### Scenario: Contenido de la columna izquierda
- **WHEN** se carga la portada en escritorio
- **THEN** la columna izquierda muestra `// automatización con inteligencia artificial`, el h1 "Tres" / "Árboles", "Automatización que echa raíces.", "Construimos automatización con inteligencia artificial para empresas: procesos que corren solos y productos con IA.", ambos botones, "a / procesos — Flujos inteligentes que operan solos." y "b / productos — Productos con IA en su núcleo."

#### Scenario: Botones de la portada
- **WHEN** el usuario activa "ver proyectos"
- **THEN** la página se desplaza a `#proyectos`

### Requirement: Figura de la portada
La columna derecha de la portada SHALL mostrar el video de los árboles al 118 % del ancho de la columna, centrado y recortado por la columna, con la etiqueta "FIG. 01 — TRES ÁRBOLES, UNA RAÍZ" arriba a la izquierda y "x 0101 · y 1101" abajo a la derecha.

#### Scenario: Video recortado
- **WHEN** se carga la portada en escritorio
- **THEN** el video sobresale de la columna por ambos lados y queda recortado sin generar scroll horizontal

#### Scenario: Etiquetas de figura
- **WHEN** se observa la columna derecha
- **THEN** se ven ambas etiquetas en sus esquinas sobre el video

### Requirement: Franja de bits
Bajo la portada SHALL haber una franja de video a todo el ancho de 96px de alto. Por debajo de 1000px de ancho de viewport, la franja SHALL mantener un ancho mínimo de 1000px centrado y recortarse por los lados.

#### Scenario: Viewport estrecho
- **WHEN** el viewport mide 600px de ancho
- **THEN** la franja se ve recortada por ambos lados, centrada, sin scroll horizontal

### Requirement: Sección Nosotros
`#nosotros` SHALL mostrar la etiqueta "01", un h2, un párrafo de presentación y dos tarjetas de servicio en grid `auto-fit` con `minmax(300px, 1fr)`. Cada tarjeta SHALL tener cabecera de video de bits, índice, título h3 y descripción.

#### Scenario: Textos de Nosotros
- **WHEN** se visualiza `#nosotros`
- **THEN** el h2 es "Construimos automatización con IA para empresas." y el párrafo "Tres Árboles es una empresa especializada en construir automatización con inteligencia artificial para empresas: automatizamos sus procesos y desarrollamos productos con IA."

#### Scenario: Tarjetas de servicios
- **WHEN** se visualiza `#nosotros` en escritorio
- **THEN** se ven lado a lado "a / procesos — Automatización de procesos — Convertimos tareas manuales y repetitivas en flujos inteligentes que operan solos." y "b / productos — Productos con IA — Diseñamos y desarrollamos productos que tienen la inteligencia artificial en su núcleo.", cada una con su cabecera de video

### Requirement: Sección Proyectos
`#proyectos`, sobre fondo `--ta-surface`, SHALL mostrar la etiqueta "10", el h2 "Lo que hemos hecho crecer." y la ficha de Autonom IA en dos columnas: a la izquierda, como portada, el video en bucle `projects/autonomia-loop` (las letras "IA" hechas de 0 y 1 que se transforman en engranajes), que se encoge para caber entero en la columna, sin recortarse ni deformarse, con el alto marcado por la ficha de texto; a la derecha los datos del proyecto y el botón "ver proyecto →".

#### Scenario: Ficha de Autonom IA
- **WHEN** se visualiza `#proyectos` en escritorio
- **THEN** se ve el video de portada a la izquierda y a la derecha "proyecto 01 · agente de ia", el título "Autonom IA", "AutonomIA es un agente de inteligencia artificial que ejecuta tareas de forma autónoma dentro de los procesos de una empresa.", `tipo = agente de ia`, `estado = [por definir]` y el botón "ver proyecto →"

#### Scenario: Alto de la portada
- **WHEN** se visualiza `#proyectos` a 1440px
- **THEN** el video y la ficha miden lo mismo (≈412px, mínimo `clamp(300px, 27vw, 420px)`; en móvil `clamp(220px, 62vw, 380px)`) y el video se ve entero, sin recorte

#### Scenario: Portada accesible
- **WHEN** un lector de pantalla llega al video de portada
- **THEN** anuncia una descripción breve de la animación

### Requirement: Sección Contacto
`#contacto` SHALL mostrar la etiqueta "11", "Hablemos." con el punto en terracota, la frase "¿Tienes un proceso que debería correr solo? Encuéntranos en nuestras redes." y dos filas enlazadas: LinkedIn (valor "[url de linkedin]", índice "01 →") e Instagram (valor "[usuario de instagram]", índice "10 →"). Los enlaces a redes externas SHALL abrirse en una pestaña nueva con `rel="noopener noreferrer"`.

#### Scenario: Filas de redes
- **WHEN** se visualiza `#contacto`
- **THEN** se ven las filas de LinkedIn e Instagram con sus valores e índices, y toda la fila es clicable

### Requirement: Pie de página
El pie SHALL mostrar dos líneas estáticas de bits (T1, T0), "Tres Árboles" y "automatización con ia · © mmxxvi".

#### Scenario: Contenido del pie
- **WHEN** se llega al final de la página
- **THEN** se ven las dos líneas de bits, el nombre y la línea de copyright

### Requirement: Contenido centralizado
Todo el texto visible, las URLs y los placeholders SHALL definirse en un único módulo de contenido (`src/content.ts`). Los datos pendientes SHALL mostrarse literalmente entre corchetes (p. ej. "[por definir]").

#### Scenario: Cambiar un texto
- **WHEN** se edita un texto o URL en el módulo de contenido
- **THEN** el cambio aparece en la página sin tocar ningún componente

#### Scenario: Dato pendiente
- **WHEN** una URL de red social aún no se conoce
- **THEN** la página muestra su placeholder entre corchetes

### Requirement: Diseño responsive
Por debajo de 900px de ancho, la portada, las tarjetas, la ficha de proyecto y el contacto SHALL pasar a una columna con el texto antes que las imágenes o videos, y los enlaces del menú SHALL bajar a una segunda fila. La página SHALL NOT generar scroll horizontal en ningún ancho desde 360px.

#### Scenario: Portada en móvil
- **WHEN** el viewport mide 375px
- **THEN** la portada es de una columna con el texto arriba y el video debajo

#### Scenario: Menú en móvil
- **WHEN** el viewport mide 375px
- **THEN** los enlaces de sección aparecen en una segunda fila bajo la marca y el botón "hablemos_"

#### Scenario: Sin scroll horizontal
- **WHEN** el viewport mide 360px
- **THEN** `document.documentElement.scrollWidth` no supera el ancho del viewport

### Requirement: Objetivos táctiles
Todo enlace y botón SHALL tener un área interactiva de al menos 44×44px.

#### Scenario: Enlaces del menú en móvil
- **WHEN** se miden los enlaces del menú a 375px
- **THEN** cada uno ocupa al menos 44px de alto y de ancho
