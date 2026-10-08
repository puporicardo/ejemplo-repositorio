# Design System: La Estantería Pintada

<!-- impeccable:design-schema 1 -->

## Direction & Aesthetic World
- **Concepto rector**: Sala infantil de biblioteca pública escolar colombiana. Cada módulo es un libro con lomo ilustrado y colorido en una estantería de madera cálida.
- **Atmósfera**: Materiales orgánicos, cálidos, limpios y pedagógicos. Ausencia total de emojis infantiles genéricos; uso exclusivo de iconografía geométrica editorial (Lucide).
- **Inspiración literaria**: Autores y tradiciones de las letras hispanoamericanas y colombianas (Rafael Pombo, Horacio Quiroga, José Asunción Silva, Félix María de Samaniego y leyendas del río Magdalena).

## Palette
- **Fondo General**: `#fbf7ee` (tono crema de papel antiguo natural)
- **Madera de Estantes**: `#8c5835` (roble cálido), baldas `#633919`, fondo `#eddcc4`
- **Texturas de Papel**: `#fffdfa` y `#fcf8f0`
- **Tinta Principal**: `#2c2523` (alto contraste para lectura cómoda de niños)
- **Tinta Secundaria / Notas**: `#695d56`
- **Libros / Módulos**:
  - B y V: `#d9482f` (bermellón)
  - C, S y Z: `#2c59c9` (azul cobalto)
  - G y J: `#f2a72e` (oro Guatavita)
  - La H: `#1f8f72` (verde esmeralda)
  - LL y Y: `#8540a6` (morado lirio)
  - Las Tildes: `#e5607a` (rosa coral)
  - Mayúsculas y Signos: `#127f96` (azul Magdalena)
  - Homófonos: `#4f9437` (verde hoja)
- **Sellos y Éxito**: `#2e7d32` / `#e8f5e9`
- **Estrellas de Oro**: `#f59f00` / `#fff9db`

## Typography
- **Fuente Principal (Lectura y Controles)**: `Lexend Variable` (diseñada específicamente para fluidez y velocidad lectora).
- **Titulares y Rótulos**: `Bricolage Grotesque Variable` (expresiva, humanista con personalidad de grabado).
- **Jerarquía**:
  - H1 de aplicación: 24–28px, tracking -0.02em, font-black.
  - Títulos de módulos: 20–24px, font-bold.
  - Texto de lectura: 17–19px, line-height 1.65, medida confortable de 60-70 caracteres.

## Components & Surface Rules
- **Lomo de libro**: Elevación en reposo, micro-animación de elevación al interactuar (`translateY(-14px)`), indicador de sellos/progreso 0/6.
- **Ficha de Préstamo**: Diseño de tarjeta tradicional de biblioteca escolar, con cuadrícula de sellos perforados y rangos por mérito.
- **Cuadrícula de Juegos**: Celdas uniformes para sopa de letras y crucigrama, con bordes definidos y auto-foco accesible.
- **Explicación Formativa**: Todos los errores muestran el fundamento de la RAE de forma constructiva e inmediata.
