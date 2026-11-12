# Spec Delta

## Purpose

Define el lenguaje de movimiento de la marca: animaciones discretas "por pasos" que evocan señales digitales, para el título, botones, enlaces, filas de contacto y tarjetas, junto con el foco de teclado y el respeto por la preferencia de movimiento reducido.

## ADDED Requirements

### Requirement: Movimiento por pasos
Toda animación y transición de la página SHALL avanzar por pasos discretos (`steps()` o cuadros discretos) y SHALL NOT usar curvas de aceleración suaves. La página SHALL NOT depender de librerías de animación de terceros.

#### Scenario: Revisión de transiciones
- **WHEN** se inspeccionan las animaciones y transiciones definidas
- **THEN** todas usan `steps(n)` o cambios de estado discretos, sin `ease`, `ease-in-out` ni curvas cúbicas

### Requirement: Decodificación de entrada del título
Al cargar la página, el h1 SHALL mostrarse primero como caracteres 0/1 aleatorios y decodificarse al texto real de izquierda a derecha en 1100 ms, conservando espacios y saltos de línea en su sitio.

#### Scenario: Entrada del título
- **WHEN** se carga la página sin movimiento reducido
- **THEN** el h1 aparece como bits y en 1100 ms queda como "Tres" / "Árboles", con los caracteres resolviéndose de izquierda a derecha

#### Scenario: Estructura conservada
- **WHEN** el título está a mitad de decodificación
- **THEN** el salto de línea entre "Tres" y "Árboles" ya está en su sitio y nunca se sustituye por un bit

### Requirement: Glitch de entrada del título
Durante la decodificación y 450 ms más, dos copias del título (una en `--ta-accent` y otra en `--ta-ink-4`) SHALL cortarse en franjas horizontales y desplazarse unos píxeles, con keyframes en `steps(3)`. Al terminar, las copias SHALL desaparecer.

#### Scenario: Copias de glitch
- **WHEN** han pasado 800 ms desde la carga
- **THEN** se ven franjas desplazadas del título en terracota y en `--ta-ink-4`

#### Scenario: Fin del glitch
- **WHEN** han pasado más de 1550 ms desde la carga
- **THEN** solo se ve el título limpio

### Requirement: Tic periódico del título
Tras la entrada, el título SHALL repetir un glitch de 260 ms cada 7 segundos.

#### Scenario: Tic
- **WHEN** la página lleva abierta 10 s
- **THEN** el título ha mostrado al menos un glitch breve de 260 ms después de la entrada

### Requirement: Hover y foco de botones
Al pasar el puntero o enfocar un botón, su texto SHALL pasar a bits y decodificarse en 320 ms; un relleno SHALL entrar de izquierda a derecha en 280 ms con `steps(7)`; SHALL producirse un salto de señal con sombra doble sólida (#EE8A60 y #E2DACE) de 2 × 120 ms; la flecha, si existe, SHALL avanzar 4px. Al pulsarlo, el botón SHALL hundirse 1px.

#### Scenario: Botón primario
- **WHEN** el usuario pasa el puntero sobre "hablemos →"
- **THEN** el relleno crema entra por pasos, el texto pasa a `--ta-bg` tras decodificarse y la flecha avanza 4px

#### Scenario: Botón secundario
- **WHEN** el usuario pasa el puntero sobre "ver proyectos"
- **THEN** el relleno terracota entra por pasos, el texto pasa a `--ta-bg` (en lugar del crema del diseño original, que no alcanza 4.5:1 a 13px) y el borde queda en terracota

#### Scenario: Clic
- **WHEN** el usuario mantiene pulsado un botón
- **THEN** el botón se desplaza 1px hacia abajo

### Requirement: Hover y foco de enlaces del menú y filas de contacto
Al pasar el puntero o enfocar un enlace del menú o una fila de contacto, su índice SHALL pasar a terracota; una línea de bits terracota de 8px de alto SHALL escribirse debajo en 300 ms con `steps(8)`; la flecha SHALL avanzar 6px en 240 ms con `steps(3)`. Las filas de contacto SHALL además teñirse con terracota al 8 %.

#### Scenario: Enlace del menú
- **WHEN** el usuario pasa el puntero sobre "01 nosotros"
- **THEN** "01" se vuelve terracota y una línea de bits aparece debajo por pasos

#### Scenario: Fila de contacto
- **WHEN** el usuario pasa el puntero sobre la fila de LinkedIn
- **THEN** el fondo se tiñe de terracota al 8 %, la línea de bits se escribe y "01 →" avanza 6px

### Requirement: Decodificación de los enlaces del menú
Al pasar el puntero o enfocar un enlace del menú, su etiqueta SHALL pasar a bits y decodificarse de izquierda a derecha en 320 ms, en terracota, y SHALL terminar mostrando la palabra correcta, que permanece en terracota mientras dure el hover o el foco. La línea de bits inferior SHALL mantenerse.

#### Scenario: Hover en "10 proyectos"
- **WHEN** el usuario pasa el puntero sobre "10 proyectos"
- **THEN** "proyectos" se ve como bits terracota, se decodifica en ~320 ms y queda "proyectos" en terracota, con la línea de bits debajo

#### Scenario: Salida del hover
- **WHEN** el puntero sale del enlace
- **THEN** la etiqueta vuelve a su color de reposo y sigue bien escrita

### Requirement: Decodificación de las filas de contacto
Al pasar el puntero o enfocar una fila de contacto, el nombre de la red SHALL pasar a bits y decodificarse de izquierda a derecha en 320 ms, en terracota, y SHALL terminar mostrando el nombre correcto, que permanece en terracota mientras dure el hover o el foco. El nombre accesible de la fila SHALL seguir siendo su texto real.

#### Scenario: Hover en la fila de LinkedIn
- **WHEN** el usuario pasa el puntero sobre la fila de LinkedIn
- **THEN** "LinkedIn" se ve como bits terracota, se decodifica en ~320 ms y queda "LinkedIn" en terracota

#### Scenario: Lector de pantalla en una fila
- **WHEN** un lector de pantalla anuncia la fila de LinkedIn durante la decodificación
- **THEN** anuncia "LinkedIn" y no los bits

### Requirement: Binario real bajo las filas de contacto
La línea de bits bajo cada fila de contacto SHALL ser la traducción real del nombre de la red a binario, un byte de 8 bits por carácter separados por espacio, y SHALL escribirse byte a byte en hover o foco. Si la fila es demasiado estrecha, la línea SHALL partirse entre bytes sin salirse de la fila.

#### Scenario: Binario de LinkedIn
- **WHEN** el usuario pasa el puntero sobre la fila de LinkedIn
- **THEN** debajo se escribe byte a byte `01001100 01101001 01101110 01101011 01100101 01100100 01001001 01101110`

#### Scenario: Binario de Instagram
- **WHEN** el usuario pasa el puntero sobre la fila de Instagram
- **THEN** debajo se escribe `01001001 01101110 01110011 01110100 01100001 01100111 01110010 01100001 01101101`

#### Scenario: Fila estrecha
- **WHEN** la fila de Instagram se ve a 360px de ancho
- **THEN** el binario ocupa dos líneas dentro de la fila y no hay scroll horizontal

### Requirement: Glitch periódico de títulos de sección
Los títulos de sección (h2 de nosotros, proyectos y contacto) SHALL mostrar cada 20 s un glitch sutil de 200 ms: copias en `--ta-accent` y `--ta-ink-4` cortadas en franjas y desplazadas como máximo 3px, con keyframes en `steps(3)`. El glitch SHALL dispararse solo mientras el título esté visible y SHALL NOT alterar el texto real.

#### Scenario: Título visible
- **WHEN** el título "Lo que hemos hecho crecer." lleva 20 s en pantalla
- **THEN** muestra un glitch breve y sutil y vuelve a quedar limpio

#### Scenario: Título fuera de pantalla
- **WHEN** un título de sección no está en el viewport
- **THEN** no se activa su glitch

### Requirement: Hover de tarjetas
Al pasar el puntero sobre una tarjeta de servicio, su borde SHALL pasar a terracota y un bus de 2px SHALL recorrer la base de izquierda a derecha en 300 ms con `steps(8)`, con cabeza en `--ta-accent-hot` y cola en `--ta-accent-dim`.

#### Scenario: Tarjeta procesos
- **WHEN** el usuario pasa el puntero sobre la tarjeta "a / procesos"
- **THEN** el borde se vuelve terracota y el bus recorre la base por pasos

### Requirement: Foco de teclado visible
Todo elemento interactivo enfocado con teclado (`:focus-visible`) SHALL mostrar el mismo efecto que en hover más un contorno sólido de 2px en #EE8A60 con 3px de separación.

#### Scenario: Navegación con Tab
- **WHEN** el usuario recorre la página con Tab
- **THEN** cada enlace y botón muestra el contorno de 2px #EE8A60 con separación de 3px y su efecto de hover

### Requirement: Accesibilidad del texto animado
Todo texto que muta por animación SHALL estar marcado `aria-hidden="true"` y su elemento contenedor SHALL exponer el texto real mediante `aria-label` (o texto visualmente oculto equivalente).

#### Scenario: Lector de pantalla en el h1
- **WHEN** un lector de pantalla lee el h1 durante o después de la animación
- **THEN** anuncia "Tres Árboles" y nunca los bits intermedios

#### Scenario: Botón animado
- **WHEN** un lector de pantalla llega a "hablemos →"
- **THEN** anuncia el texto real del botón

### Requirement: Movimiento reducido
Si el usuario tiene activada la preferencia `prefers-reduced-motion: reduce`, la página SHALL mostrar el título y los títulos de sección estáticos, sin decodificación ni glitch, SHALL NOT animar rellenos, líneas de bits, buses ni flechas, y SHALL mantener los videos detenidos en su póster o primer cuadro. Los cambios de color de estado y el contorno de foco SHALL mantenerse.

#### Scenario: Carga con movimiento reducido
- **WHEN** se carga la página con "reducir movimiento" activado
- **THEN** el h1 muestra "Tres Árboles" desde el primer cuadro, sin bits ni copias de glitch, y ningún video se reproduce

#### Scenario: Hover con movimiento reducido
- **WHEN** el usuario pasa el puntero sobre un botón con "reducir movimiento" activado
- **THEN** el botón cambia de estado sin animación de relleno, decodificación ni desplazamiento de flecha

#### Scenario: Cambio de preferencia en caliente
- **WHEN** el usuario activa "reducir movimiento" con la página abierta
- **THEN** las animaciones en curso y el tic periódico se detienen y los videos se pausan
