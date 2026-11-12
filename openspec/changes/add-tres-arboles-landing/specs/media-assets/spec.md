# Spec Delta

## Purpose

Define cómo se almacenan, nombran, cargan y reproducen los videos y el póster de la landing para que la página sea ligera, accesible y fácil de actualizar sin problemas de caché.

## ADDED Requirements

### Requirement: Ubicación y nombres de los medios
Los medios SHALL servirse como archivos estáticos desde `public/media/`, en las carpetas `hero/`, `strips/`, `cards/` y `projects/`, y SHALL NOT importarse desde el código fuente para ser procesados por el empaquetador.

#### Scenario: Inventario de medios
- **WHEN** se lista `public/media/`
- **THEN** contiene `hero/tres-arboles-loop.{webm,mp4}`, `hero/tres-arboles-poster.webp`, `strips/franja-bits-loop.{webm,mp4}`, `cards/card-procesos-loop.{webm,mp4}`, `cards/card-productos-loop.{webm,mp4}` y `projects/autonomia-loop.{webm,mp4}`

#### Scenario: Build de producción
- **WHEN** se ejecuta `npm run build`
- **THEN** `dist/media/` contiene los archivos con los mismos nombres y rutas, sin hash añadido

#### Scenario: Archivo servido
- **WHEN** el navegador solicita `media/hero/tres-arboles-loop.webm`
- **THEN** recibe el video con estado 200

### Requirement: Rutas relativas a la base
Las URLs de los medios SHALL construirse a partir de la ruta base configurada del sitio (`import.meta.env.BASE_URL`), de modo que funcionen si el sitio se despliega en un subdirectorio.

#### Scenario: Despliegue en subdirectorio
- **WHEN** el sitio se construye con base `/landing/`
- **THEN** los videos se solicitan como `/landing/media/...`

### Requirement: Formatos y orden de fuentes
Cada video SHALL ofrecer una fuente WebM primero y una MP4 como respaldo, y SHALL renderizarse silenciado, en bucle, en línea y con precarga de solo metadatos (`muted loop playsInline preload="metadata"`), sin controles visibles.

#### Scenario: Navegador con WebM
- **WHEN** el navegador soporta WebM
- **THEN** reproduce la fuente `.webm`

#### Scenario: Navegador sin WebM
- **WHEN** el navegador no soporta WebM
- **THEN** reproduce la fuente `.mp4`

### Requirement: Reproducción por visibilidad
Cada video SHALL reproducirse solo mientras sea visible en el viewport y SHALL pausarse cuando salga de la pantalla.

#### Scenario: Video fuera de pantalla
- **WHEN** el usuario se desplaza hasta `#contacto`
- **THEN** el video de la portada está pausado

#### Scenario: Video que entra en pantalla
- **WHEN** las tarjetas de `#nosotros` entran en el viewport
- **THEN** sus videos de cabecera empiezan a reproducirse

### Requirement: Póster de portada
El video de la portada SHALL declarar como póster `hero/tres-arboles-poster.webp`, que SHALL mostrarse antes de que el video cargue y cuando el movimiento esté reducido.

#### Scenario: Primera pintura
- **WHEN** la portada se pinta antes de que llegue el video
- **THEN** se ve la imagen del póster en lugar de un hueco vacío

### Requirement: Cabeceras de tarjeta nítidas
La cabecera de video de cada tarjeta SHALL ser una banda de 64px de alto en la que el video se encoge a esa altura (0,5× su tamaño nativo de 840×128) sin recortarse en vertical ni deformarse. Para cubrir el ancho de la tarjeta, el video SHALL repetirse en horizontal con desfases de tiempo entre copias.

#### Scenario: Video completo
- **WHEN** se visualiza una tarjeta en cualquier ancho
- **THEN** la cabecera mide 64px y se ven completas las tres filas de bits, sin recorte vertical

#### Scenario: Ancho cubierto
- **WHEN** la tarjeta mide hasta 1260px de ancho
- **THEN** la banda queda cubierta por copias del video a 0,5× sin huecos laterales

### Requirement: Sin controles del navegador sobre los videos
Los videos SHALL NOT mostrar controles ni el botón de imagen en imagen (picture-in-picture) del navegador.

#### Scenario: Hover sobre un video
- **WHEN** el usuario pasa el puntero sobre cualquier video de la página
- **THEN** no aparece ningún control superpuesto del navegador

### Requirement: Accesibilidad de los videos
El video de los árboles y la portada de Autonom IA SHALL tener un `aria-label` descriptivo en español. La franja de bits y las cabeceras de las tarjetas, decorativas, SHALL marcarse `aria-hidden="true"`.

#### Scenario: Lector de pantalla
- **WHEN** un lector de pantalla recorre la página
- **THEN** anuncia el video de los árboles y la portada de Autonom IA con su descripción y omite la franja y las cabeceras de tarjeta

### Requirement: Invalidación de caché al reemplazar
Cuando se reemplace un video por una nueva versión, el archivo SHALL renombrarse con un sufijo de versión (p. ej. `card-productos-loop.v2.webm`) y la referencia SHALL actualizarse, en lugar de sobrescribir el archivo con el mismo nombre.

#### Scenario: Nueva versión del video
- **WHEN** se sustituye el video de la tarjeta productos
- **THEN** se publica con un nombre nuevo y los visitantes reciben la nueva versión sin vaciar caché

### Requirement: Presupuesto de peso
Los medios SHALL respetar estos objetivos aproximados: árboles 1440×900, 6 s, ≈0,67 MB WebM / ≈1,2 MB MP4; franja 2880×192, 12 s, ≈0,19 / ≈0,68 MB; tarjetas 840×128, 6 s, ≈0,04 / ≈0,13 MB cada una; portada de Autonom IA 1080×896, 12 s a 12 fps, ≈0,95 / ≈0,9 MB.

#### Scenario: Revisión de pesos
- **WHEN** se listan los archivos de `public/media/`
- **THEN** ningún archivo supera en más de un 25 % su peso objetivo
