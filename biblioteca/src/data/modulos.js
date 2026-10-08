/*
 * Contenido de la Biblioteca Rinrín.
 *
 * Cada módulo es un "libro" del estante. Para agregar un módulo nuevo, copia
 * uno de los objetos de abajo, cambia su id, color y contenido, y agrégalo al
 * arreglo MODULOS. Los juegos se arman solos a partir de estos datos.
 *
 * Reglas ortográficas: Real Academia Española y ASALE, Ortografía de la lengua
 * española (2010) y Ortografía básica (2012). Nivel: quinto de primaria,
 * Estándares Básicos de Competencias en Lenguaje y DBA de Lenguaje (MEN).
 *
 * Marcado del juego "Corrige el texto": [incorrecta|correcta|regla]
 */

export const ACTIVIDADES = [
  { id: 'lectura', nombre: 'Lectura', descripcion: 'Lee la historia y responde.', icono: 'BookOpen' },
  { id: 'intrusa', nombre: 'La palabra intrusa', descripcion: 'Encuentra la palabra mal escrita.', icono: 'ScanSearch' },
  { id: 'completa', nombre: 'Completa la palabra', descripcion: 'Elige la letra que falta.', icono: 'PencilLine' },
  { id: 'corrige', nombre: 'Corrige el texto', descripcion: 'Toca los errores para arreglarlos.', icono: 'SpellCheck' },
  { id: 'sopa', nombre: 'Sopa de letras', descripcion: 'Busca las palabras escondidas.', icono: 'Grid3x3' },
  { id: 'crucigrama', nombre: 'Crucigrama', descripcion: 'Resuelve las pistas.', icono: 'Puzzle' },
]

export const MODULOS = [
  // ---------------------------------------------------------------- B y V
  {
    id: 'bv',
    titulo: 'B y V',
    lema: 'El tambor del invierno',
    color: '#d9482f',
    tinta: '#ffffff',
    icono: 'Drum',
    reglas: [
      { titulo: 'Después de m va b', ejemplos: ['tambor', 'hombre', 'cambio'] },
      { titulo: 'Antes de l y r va b', ejemplos: ['blanco', 'brazo', 'hablar'] },
      { titulo: 'Terminaciones -aba, -abas, -ábamos', ejemplos: ['cantaba', 'jugábamos'] },
      { titulo: 'Verbos en -bir (menos hervir, servir y vivir)', ejemplos: ['escribir', 'recibir'] },
      { titulo: 'Después de n va v', ejemplos: ['invierno', 'enviar', 'convento'] },
      { titulo: 'Adjetivos en -avo, -evo, -ivo (y femeninos)', ejemplos: ['octavo', 'nueva', 'activo'] },
    ],
    lectura: {
      titulo: 'Rinrín renacuajo',
      fuente: 'Adaptación del poema «El renacuajo paseador», de Rafael Pombo (Bogotá, 1833-1912).',
      verso: [
        'El hijo de rana, Rinrín renacuajo,',
        'salió esta mañana muy tieso y muy majo,',
        'con pantalón corto, corbata a la moda,',
        'sombrero encintado y chupa de boda.',
      ],
      parrafos: [
        'Su mamá le había advertido: «¡Muchacho, no salgas!». Pero Rinrín no quiso escuchar. Caminaba muy orgulloso por la orilla del charco cuando se encontró con su vecino, el ratón, que lo invitó a visitar a doña Ratona.',
        'En la casa de doña Ratona había música, risas y una mesa llena de bocados. Rinrín bebía y cantaba, y el ratón tocaba la guitarra. Nadie vigilaba la puerta.',
        'De pronto llegaron el gato y sus gatitos. El ratón y doña Ratona no alcanzaron a escapar. Rinrín saltó por la ventana y huyó, pero en el camino un pato lo vio y se lo llevó.',
        'Y así, mamá rana se quedó solita, esperando a un hijo que no quiso obedecer.',
      ],
      preguntas: [
        {
          pregunta: '¿Por qué terminó mal el paseo de Rinrín?',
          opciones: ['Porque no obedeció a su mamá', 'Porque perdió su sombrero', 'Porque no sabía nadar'],
          correcta: 0,
          explicacion: 'Su mamá le dijo que no saliera y él no quiso escuchar.',
        },
        {
          pregunta: '¿A quién fueron a visitar Rinrín y el ratón?',
          opciones: ['A doña Ratona', 'Al gato', 'A mamá rana'],
          correcta: 0,
          explicacion: 'El ratón invitó a Rinrín a la casa de doña Ratona.',
        },
        {
          pregunta: 'En «caminaba muy orgulloso», ¿por qué caminaba se escribe con b?',
          opciones: [
            'Porque los verbos en -ar terminan en -aba cuando cuentan algo que pasaba',
            'Porque va después de m',
            'Porque empieza por bl',
          ],
          correcta: 0,
          explicacion: 'Caminar, cantar, tocar: caminaba, cantaba, tocaba. Siempre con b.',
        },
      ],
    },
    intrusa: [
      { opciones: ['cantaba', 'saltaba', 'jugava', 'bailaba'], incorrecta: 2, correcta: 'jugaba', regla: 'Las terminaciones -aba de los verbos en -ar se escriben con b.' },
      { opciones: ['hombre', 'tambor', 'canvio', 'embudo'], incorrecta: 2, correcta: 'cambio', regla: 'Después de m siempre se escribe b.' },
      { opciones: ['invierno', 'enviar', 'inbitar', 'convento'], incorrecta: 2, correcta: 'invitar', regla: 'Después de n se escribe v.' },
      { opciones: ['nuevo', 'octava', 'activo', 'pasiba'], incorrecta: 3, correcta: 'pasiva', regla: 'Los adjetivos terminados en -avo, -evo, -ivo (y sus femeninos) se escriben con v.' },
      { opciones: ['blusa', 'brazo', 'vlanco', 'cable'], incorrecta: 2, correcta: 'blanco', regla: 'Antes de l y de r se escribe b: bl, br.' },
      { opciones: ['escribir', 'recibir', 'subir', 'descrivir'], incorrecta: 3, correcta: 'describir', regla: 'Los verbos terminados en -bir se escriben con b, menos hervir, servir y vivir.' },
      { opciones: ['estuvo', 'anduvo', 'tuvo', 'sostubo'], incorrecta: 3, correcta: 'sostuvo', regla: 'Estuvo, anduvo y tuvo (y sus familiares, como sostuvo) se escriben con v.' },
      { opciones: ['bicicleta', 'bisabuelo', 'vicolor', 'bilingüe'], incorrecta: 2, correcta: 'bicolor', regla: 'El prefijo bi- (que significa «dos») se escribe con b.' },
    ],
    completa: [
      { texto: 'ham_re', opciones: ['b', 'v'], correcta: 'b', regla: 'Después de m se escribe b.' },
      { texto: 'in_ierno', opciones: ['b', 'v'], correcta: 'v', regla: 'Después de n se escribe v.' },
      { texto: 'ha_lar', opciones: ['b', 'v'], correcta: 'b', regla: 'Antes de l se escribe b.' },
      { texto: 'salta_a', opciones: ['b', 'v'], correcta: 'b', regla: 'Los verbos en -ar terminan en -aba.' },
      { texto: 'nue_o', opciones: ['b', 'v'], correcta: 'v', regla: 'Los adjetivos en -evo se escriben con v.' },
      { texto: 'escri_ir', opciones: ['b', 'v'], correcta: 'b', regla: 'Los verbos terminados en -bir llevan b.' },
      { texto: 'estu_o', opciones: ['b', 'v'], correcta: 'v', regla: 'Estuvo, anduvo y tuvo se escriben con v.' },
      { texto: 'a_razo', opciones: ['b', 'v'], correcta: 'b', regla: 'Antes de r se escribe b.' },
    ],
    corrige:
      'En el [inbierno|invierno|Después de n se escribe v.], mi abuela nos [contava|contaba|Los verbos en -ar terminan en -aba: contaba.] historias junto al fogón. Su [boz|voz|Voz es de la familia de vocal y vocero: va con v.] era suave y nos llevaba a un bosque blanco donde vivía un [tamvor|tambor|Después de m se escribe b.] mágico.',
    sopa: ['brazo', 'tambor', 'invierno', 'nuevo', 'cantaba', 'escribir', 'blanco', 'activo'],
    crucigrama: [
      { palabra: 'invierno', pista: 'Estación del año en la que hace más frío.' },
      { palabra: 'tambor', pista: 'Instrumento de percusión que se toca con baquetas.' },
      { palabra: 'brazo', pista: 'Parte del cuerpo que va del hombro a la mano.' },
      { palabra: 'nuevo', pista: 'Lo contrario de viejo.' },
      { palabra: 'escribir', pista: 'Lo que hacemos con el lápiz en el cuaderno.' },
      { palabra: 'vaca', pista: 'Animal de la finca que nos da leche.' },
    ],
  },

  // ---------------------------------------------------------------- C, S y Z
  {
    id: 'csz',
    titulo: 'C, S y Z',
    lema: 'La tortuga paciente',
    color: '#2c59c9',
    tinta: '#ffffff',
    icono: 'Turtle',
    reglas: [
      { titulo: 'Plural de palabras con z final: -ces', ejemplos: ['lápiz → lápices', 'voz → voces'] },
      { titulo: 'Diminutivos -cito, -cita, -cillo', ejemplos: ['pancito', 'florecita'] },
      { titulo: 'Adjetivos en -oso, -osa', ejemplos: ['hermoso', 'curiosa'] },
      { titulo: 'Superlativos en -ísimo, -ísima', ejemplos: ['altísimo', 'cansadísima'] },
      { titulo: 'Golpes y aumentativos en -azo', ejemplos: ['golazo', 'portazo'] },
      { titulo: 'Sustantivos en -anza y -eza', ejemplos: ['esperanza', 'tristeza'] },
    ],
    lectura: {
      titulo: 'La tortuga gigante',
      fuente: 'Adaptación del cuento de Horacio Quiroga, en Cuentos de la selva (1918).',
      parrafos: [
        'Había una vez un hombre que vivía en Buenos Aires y que, por estar enfermo, se fue a vivir al monte. Allí cazaba para comer y dormía bajo los árboles.',
        'Un día vio a un tigre que quería comerse a una tortuga gigante. El hombre espantó al tigre y curó con paciencia la cabeza herida de la tortuga, que estaba casi muerta.',
        'Tiempo después, el hombre se enfermó gravemente. Tenía tanta fiebre que no podía levantarse. Entonces la tortuga, agradecida, decidió salvarlo: lo subió sobre su caparazón y caminó días y noches hacia la ciudad. Cuando el hombre tenía sed, ella le buscaba agua; cuando tenía hambre, le traía frutas.',
        'Al final, cansadísima, la tortuga llegó a Buenos Aires con su amigo vivo. Desde entonces vive feliz en un jardín, y el hombre la visita y le lleva hojas tiernas.',
      ],
      preguntas: [
        {
          pregunta: '¿Qué hizo el hombre por la tortuga?',
          opciones: ['La salvó del tigre y la curó', 'La vendió en la ciudad', 'La dejó en el río'],
          correcta: 0,
          explicacion: 'Espantó al tigre y le curó la cabeza herida.',
        },
        {
          pregunta: '¿Cómo le devolvió la tortuga el favor?',
          opciones: ['Lo cargó hasta la ciudad cuando estaba enfermo', 'Le regaló frutas de oro', 'Le enseñó a nadar'],
          correcta: 0,
          explicacion: 'Caminó días y noches con él sobre su caparazón.',
        },
        {
          pregunta: '¿Por qué cansadísima termina en -ísima con s?',
          opciones: ['Porque los superlativos terminan en -ísimo, -ísima', 'Porque viene de una palabra con z', 'Porque las palabras largas llevan s'],
          correcta: 0,
          explicacion: 'Altísimo, bellísima, cansadísima: el superlativo siempre va con s.',
        },
      ],
    },
    intrusa: [
      { opciones: ['lápices', 'peces', 'luces', 'vozes'], incorrecta: 3, correcta: 'voces', regla: 'Las palabras terminadas en z forman el plural con -ces: voz, voces.' },
      { opciones: ['hermoso', 'famoso', 'grasioso', 'curioso'], incorrecta: 2, correcta: 'gracioso', regla: 'Gracioso viene de gracia, que se escribe con c.' },
      { opciones: ['golazo', 'manotazo', 'portaso', 'abrazo'], incorrecta: 2, correcta: 'portazo', regla: 'Las palabras que indican un golpe terminan en -azo.' },
      { opciones: ['felicidad', 'ciudad', 'belleza', 'tristesa'], incorrecta: 3, correcta: 'tristeza', regla: 'Los sustantivos en -eza que vienen de adjetivos van con z: triste, tristeza.' },
      { opciones: ['esperanza', 'confianza', 'enseñanza', 'alabansa'], incorrecta: 3, correcta: 'alabanza', regla: 'Los sustantivos terminados en -anza se escriben con z.' },
      { opciones: ['pancito', 'cafecito', 'florecita', 'lechesita'], incorrecta: 3, correcta: 'lechecita', regla: 'Los diminutivos -cito, -cita se escriben con c.' },
      { opciones: ['altísimo', 'bellísimo', 'grandísimo', 'rapidícimo'], incorrecta: 3, correcta: 'rapidísimo', regla: 'El superlativo -ísimo se escribe con s.' },
      { opciones: ['compasión', 'comprensión', 'televisión', 'confución'], incorrecta: 3, correcta: 'confusión', regla: 'Si existe una palabra familiar en -so o -sivo, se escribe -sión: confuso, confusión.' },
    ],
    completa: [
      { texto: 'lápi_es', opciones: ['c', 's', 'z'], correcta: 'c', regla: 'Lápiz termina en z; en plural la z cambia a c: lápices.' },
      { texto: 'nari_', opciones: ['c', 's', 'z'], correcta: 'z', regla: 'Nariz termina en z; su plural es narices.' },
      { texto: 'hermo_o', opciones: ['c', 's', 'z'], correcta: 's', regla: 'Los adjetivos en -oso se escriben con s.' },
      { texto: 'gola_o', opciones: ['c', 's', 'z'], correcta: 'z', regla: 'Los aumentativos en -azo se escriben con z.' },
      { texto: 'triste_a', opciones: ['c', 's', 'z'], correcta: 'z', regla: 'Los sustantivos en -eza que vienen de adjetivos van con z.' },
      { texto: 'esperan_a', opciones: ['c', 's', 'z'], correcta: 'z', regla: 'Los sustantivos en -anza se escriben con z.' },
      { texto: 'raton_ito', opciones: ['c', 's', 'z'], correcta: 'c', regla: 'Los diminutivos -cito se escriben con c.' },
      { texto: 'televi_ión', opciones: ['c', 's', 'z'], correcta: 's', regla: 'Televisión se relaciona con televisivo: -sión.' },
    ],
    corrige:
      'Mi abuelo es muy [grasioso|gracioso|Gracioso viene de gracia, con c.]. Cuando juega fútbol con nosotros, mete un [golaso|golazo|Los aumentativos terminan en -azo.] y grita de [felisidad|felicidad|Felicidad viene de feliz: la z cambia a c antes de i.]. Después nos regala dos [lápises|lápices|El plural de las palabras terminadas en z se forma con -ces.] de colores.',
    sopa: ['lápices', 'peces', 'canción', 'hermoso', 'golazo', 'esperanza', 'nariz', 'cielo'],
    crucigrama: [
      { palabra: 'zapato', pista: 'Se pone en el pie para caminar.' },
      { palabra: 'peces', pista: 'Animales que viven en el agua y respiran por branquias (plural).' },
      { palabra: 'nariz', pista: 'Parte de la cara con la que olemos.' },
      { palabra: 'cielo', pista: 'Allí vuelan los pájaros y brillan las estrellas.' },
      { palabra: 'abrazo', pista: 'Lo damos con los brazos a quien queremos.' },
      { palabra: 'cancion', pista: 'Tiene letra y música, y se canta.' },
    ],
  },

  // ---------------------------------------------------------------- G y J
  {
    id: 'gj',
    titulo: 'G y J',
    lema: 'El viaje a la laguna dorada',
    color: '#f2a72e',
    tinta: '#2a1c05',
    icono: 'Sailboat',
    reglas: [
      { titulo: 'Palabras terminadas en -aje', ejemplos: ['viaje', 'paisaje', 'garaje'] },
      { titulo: 'Verbos en -ger y -gir (menos tejer y crujir)', ejemplos: ['recoger', 'dirigir'] },
      { titulo: 'El grupo gen', ejemplos: ['gente', 'origen', 'imagen'] },
      { titulo: 'geo- y -logía', ejemplos: ['geografía', 'biología'] },
      { titulo: 'Terminaciones -jero, -jera', ejemplos: ['relojero', 'consejera'] },
      { titulo: 'güe, güi: la diéresis hace sonar la u', ejemplos: ['pingüino', 'cigüeña'] },
    ],
    lectura: {
      titulo: 'La leyenda de El Dorado',
      fuente: 'Relato de la tradición muisca, contado a partir de las crónicas y del Museo del Oro del Banco de la República.',
      parrafos: [
        'Hace muchísimos años, en las tierras altas donde hoy está Cundinamarca, vivía el pueblo muisca. Cuando elegían un nuevo cacique, celebraban una gran ceremonia en la laguna de Guatavita.',
        'Ese día, la gente cubría el cuerpo del joven cacique con polvo de oro hasta que brillaba como el sol. Luego lo subían a una balsa de juncos, junto con figuras de oro y esmeraldas.',
        'La balsa avanzaba hasta el centro de la laguna. En medio del silencio, el cacique arrojaba las ofrendas al agua como regalo a los dioses y después se sumergía para lavar el oro de su piel. En la orilla, todos celebraban con música y danzas.',
        'Siglos después, los viajeros europeos escucharon esta historia y soñaron con una ciudad hecha de oro. La buscaron por selvas y montañas, pero nunca la encontraron, porque el verdadero tesoro era la tradición de un pueblo. Hoy, la balsa muisca de oro se puede ver en el Museo del Oro de Bogotá.',
      ],
      preguntas: [
        {
          pregunta: '¿Dónde se hacía la ceremonia del nuevo cacique?',
          opciones: ['En la laguna de Guatavita', 'En el mar Caribe', 'En el río Amazonas'],
          correcta: 0,
          explicacion: 'Los muiscas celebraban en la laguna de Guatavita.',
        },
        {
          pregunta: '¿Qué buscaban los viajeros europeos?',
          opciones: ['Una ciudad hecha de oro', 'Una laguna de chocolate', 'Un camino al mar'],
          correcta: 0,
          explicacion: 'Soñaron con una ciudad de oro que nunca existió.',
        },
        {
          pregunta: '¿Por qué viajeros se escribe con j?',
          opciones: ['Porque viene de viaje, que termina en -aje', 'Porque va antes de e', 'Porque es un nombre propio'],
          correcta: 0,
          explicacion: 'Viaje, viajero, viajar: la familia conserva la j.',
        },
      ],
    },
    intrusa: [
      { opciones: ['viaje', 'paisaje', 'equipage', 'garaje'], incorrecta: 2, correcta: 'equipaje', regla: 'Las palabras terminadas en -aje se escriben con j.' },
      { opciones: ['gente', 'origen', 'jeneral', 'imagen'], incorrecta: 2, correcta: 'general', regla: 'Las palabras con el grupo gen se escriben con g (menos berenjena, ajeno y unas pocas más).' },
      { opciones: ['recoger', 'proteger', 'elegir', 'dirijir'], incorrecta: 3, correcta: 'dirigir', regla: 'Los verbos terminados en -ger y -gir se escriben con g, menos tejer y crujir.' },
      { opciones: ['biología', 'geografía', 'jeología', 'geometría'], incorrecta: 2, correcta: 'geología', regla: 'Las palabras que empiezan por geo- (tierra) se escriben con g.' },
      { opciones: ['pingüino', 'cigüeña', 'vergüenza', 'bilingue'], incorrecta: 3, correcta: 'bilingüe', regla: 'Cuando la u suena en gue o gui, lleva diéresis: güe, güi.' },
      { opciones: ['relojero', 'cerrajero', 'extranjero', 'consegero'], incorrecta: 3, correcta: 'consejero', regla: 'Las palabras terminadas en -jero, -jera se escriben con j.' },
      { opciones: ['dije', 'traje', 'condujeron', 'produgeron'], incorrecta: 3, correcta: 'produjeron', regla: 'Si el verbo no tiene g ni j (producir), sus formas con sonido je van con j.' },
      { opciones: ['tejer', 'crujir', 'tejido', 'crugiente'], incorrecta: 3, correcta: 'crujiente', regla: 'Tejer y crujir son excepciones con j, y sus familiares también.' },
    ],
    completa: [
      { texto: 'via_e', opciones: ['g', 'j'], correcta: 'j', regla: 'Las palabras terminadas en -aje llevan j.' },
      { texto: '_ente', opciones: ['g', 'j'], correcta: 'g', regla: 'El grupo gen se escribe con g.' },
      { texto: 'reco_er', opciones: ['g', 'j'], correcta: 'g', regla: 'Los verbos terminados en -ger llevan g.' },
      { texto: 'te_er', opciones: ['g', 'j'], correcta: 'j', regla: 'Tejer es una excepción: se escribe con j.' },
      { texto: 'relo_ero', opciones: ['g', 'j'], correcta: 'j', regla: 'Las palabras en -jero llevan j.' },
      { texto: '_eografía', opciones: ['g', 'j'], correcta: 'g', regla: 'geo- significa tierra y se escribe con g.' },
      { texto: 'di_e', opciones: ['g', 'j'], correcta: 'j', regla: 'Decir no tiene g ni j, por eso dije va con j.' },
      { texto: 'pin_üino', opciones: ['g', 'j'], correcta: 'g', regla: 'Con diéresis (güi) siempre va g.' },
    ],
    corrige:
      'El verano pasado hicimos un [viage|viaje|Las palabras terminadas en -aje llevan j.] a la costa. En el [equipage|equipaje|Equipaje termina en -aje: con j.] llevamos un girasol para la abuela. Vimos un [paisage|paisaje|Paisaje termina en -aje: con j.] hermoso y mucha [jente|gente|Las palabras con gen se escriben con g.] en la playa.',
    sopa: ['viaje', 'gente', 'paisaje', 'recoger', 'pingüino', 'magia', 'reloj', 'girasol'],
    crucigrama: [
      { palabra: 'girasol', pista: 'Flor amarilla que gira buscando el sol.' },
      { palabra: 'viaje', pista: 'Recorrido de un lugar a otro.' },
      { palabra: 'reloj', pista: 'Nos dice la hora.' },
      { palabra: 'magia', pista: 'Arte de los trucos asombrosos.' },
      { palabra: 'gente', pista: 'Muchas personas juntas.' },
      { palabra: 'oreja', pista: 'Parte del cuerpo con la que oímos.' },
    ],
  },

  // ---------------------------------------------------------------- H
  {
    id: 'h',
    titulo: 'La H',
    lema: 'La letra que no suena',
    color: '#1f8f72',
    tinta: '#ffffff',
    icono: 'Egg',
    reglas: [
      { titulo: 'Empiezan por hie-, hue-, hui-', ejemplos: ['hielo', 'huevo', 'huir'] },
      { titulo: 'Empiezan por hum- + vocal', ejemplos: ['humo', 'humano', 'humilde'] },
      { titulo: 'Formas de haber, hacer, hablar, habitar, hallar', ejemplos: ['hay', 'hicimos', 'hablamos'] },
      { titulo: 'Empiezan por hidr-, hiper-, hipo-', ejemplos: ['hidratar', 'hipopótamo'] },
      { titulo: 'H en medio de la palabra', ejemplos: ['ahora', 'almohada', 'búho'] },
    ],
    lectura: {
      titulo: 'La pobre viejecita',
      fuente: 'Adaptación del poema de Rafael Pombo, en Cuentos pintados para niños (1867).',
      verso: ['Érase una viejecita', 'sin nadita qué comer', 'sino carnes, frutas, dulces,', 'tortas, huevos, pan y pez.'],
      parrafos: [
        'Esta pobre viejecita tenía una casa con huerta, ropa elegante, zapatos de todos los colores y hasta personas que la ayudaban. Aun así, todos los días se quejaba de su mala suerte.',
        'Cada año, hasta su fin, tuvo un año más de vieja y uno menos que vivir. Cuando se miraba en el espejo, se asustaba al ver a otra viejita con anteojos y peluquín, ¡sin darse cuenta de que era ella misma!',
        'Pombo escribió este poema con humor: la viejecita no era pobre de cosas, sino de alegría. Por eso, al leerlo, nos preguntamos: ¿qué necesitamos de verdad para ser felices?',
      ],
      preguntas: [
        {
          pregunta: '¿Por qué el poema dice que la viejecita era «pobre»?',
          opciones: ['Porque se quejaba aunque lo tenía todo', 'Porque no tenía casa', 'Porque no tenía comida'],
          correcta: 0,
          explicacion: 'Tenía de todo, pero le faltaba alegría. Es humor de Pombo.',
        },
        {
          pregunta: '¿A quién veía la viejecita en el espejo?',
          opciones: ['A ella misma', 'A su vecina', 'A un fantasma'],
          correcta: 0,
          explicacion: 'Se asustaba de su propio reflejo.',
        },
        {
          pregunta: '¿Por qué huevos y huerta llevan h?',
          opciones: ['Porque las palabras que empiezan por hue- llevan h', 'Porque todas las comidas llevan h', 'Porque van después de vocal'],
          correcta: 0,
          explicacion: 'Hue-: huevo, huerta, hueso, huella.',
        },
      ],
    },
    intrusa: [
      { opciones: ['hielo', 'hierro', 'hiena', 'ierba'], incorrecta: 3, correcta: 'hierba', regla: 'Las palabras que empiezan por hie- llevan h.' },
      { opciones: ['huevo', 'hueso', 'huella', 'uerta'], incorrecta: 3, correcta: 'huerta', regla: 'Las palabras que empiezan por hue- llevan h.' },
      { opciones: ['humo', 'humano', 'umilde', 'humedad'], incorrecta: 2, correcta: 'humilde', regla: 'Las palabras que empiezan por hum- seguido de vocal llevan h.' },
      { opciones: ['hablamos', 'hicimos', 'abitamos', 'hallamos'], incorrecta: 2, correcta: 'habitamos', regla: 'Los verbos hablar, hacer, habitar y hallar llevan h en todas sus formas.' },
      { opciones: ['hidratar', 'hipopótamo', 'idrante', 'hipótesis'], incorrecta: 2, correcta: 'hidrante', regla: 'Las palabras que empiezan por hidr- (agua) llevan h.' },
      { opciones: ['ahora', 'almohada', 'zanahoria', 'búo'], incorrecta: 3, correcta: 'búho', regla: 'Algunas palabras llevan h en medio: ahora, almohada, búho.' },
      { opciones: ['huir', 'huida', 'huésped', 'uyó'], incorrecta: 3, correcta: 'huyó', regla: 'Huir lleva h y la conserva en todas sus formas: huyó, huimos.' },
      { opciones: ['oso', 'oreja', 'árbol', 'horilla'], incorrecta: 3, correcta: 'orilla', regla: 'No todas las palabras llevan h: orilla, oso y oreja van sin h.' },
    ],
    completa: [
      { texto: '_ielo', opciones: ['h', 'sin h'], correcta: 'h', regla: 'hie- lleva h.' },
      { texto: '_uevo', opciones: ['h', 'sin h'], correcta: 'h', regla: 'hue- lleva h.' },
      { texto: '_umo', opciones: ['h', 'sin h'], correcta: 'h', regla: 'hum- + vocal lleva h.' },
      { texto: '_oso', opciones: ['h', 'sin h'], correcta: 'sin h', regla: 'Oso se escribe sin h.' },
      { texto: '_abitar', opciones: ['h', 'sin h'], correcta: 'h', regla: 'Habitar lleva h.' },
      { texto: '_oreja', opciones: ['h', 'sin h'], correcta: 'sin h', regla: 'Oreja se escribe sin h.' },
      { texto: 'zana_oria', opciones: ['h', 'sin h'], correcta: 'h', regla: 'Zanahoria lleva h en medio.' },
      { texto: '_idratar', opciones: ['h', 'sin h'], correcta: 'h', regla: 'hidr- (agua) lleva h.' },
    ],
    corrige:
      'Ayer encontramos un [uevo|huevo|Las palabras que empiezan por hue- llevan h.] en la [uerta|huerta|hue- lleva h: huerta.] de mi tía. Una [ormiga|hormiga|Hormiga se escribe con h al comienzo.] subía por el tomate. Al final comimos [elado|helado|Helado es de la familia de hielo y conserva la h.] de mora.',
    sopa: ['hielo', 'huevo', 'humo', 'hormiga', 'helado', 'historia', 'huerta', 'hierba'],
    crucigrama: [
      { palabra: 'hormiga', pista: 'Insecto pequeño que vive en colonias y carga hojas.' },
      { palabra: 'hielo', pista: 'Agua congelada.' },
      { palabra: 'huevo', pista: 'Lo pone la gallina.' },
      { palabra: 'humo', pista: 'Sale de la chimenea cuando hay fuego.' },
      { palabra: 'buho', pista: 'Ave nocturna de ojos grandes.' },
      { palabra: 'helado', pista: 'Postre frío que se come en cono.' },
    ],
  },

  // ---------------------------------------------------------------- LL y Y
  {
    id: 'lly',
    titulo: 'LL y Y',
    lema: 'La lechera soñadora',
    color: '#8540a6',
    tinta: '#ffffff',
    icono: 'CloudRain',
    reglas: [
      { titulo: 'Y al final, después de vocal y sin tilde', ejemplos: ['rey', 'hoy', 'muy'] },
      { titulo: 'Terminaciones -illo, -illa', ejemplos: ['pajarillo', 'rodilla'] },
      { titulo: 'Verbos en -llar', ejemplos: ['callar', 'brillar'] },
      { titulo: 'Verbos sin ll ni y en el infinitivo usan y', ejemplos: ['caer → cayó', 'leer → leyendo'] },
      { titulo: 'Empiezan por yer-, yes-', ejemplos: ['yerno', 'yeso'] },
    ],
    lectura: {
      titulo: 'La lechera',
      fuente: 'Adaptación de la fábula de Félix María de Samaniego, en Fábulas morales (1781).',
      verso: ['Llevaba en la cabeza', 'una lechera el cántaro al mercado…'],
      parrafos: [
        'Mientras caminaba, la lechera soñaba despierta: «Con lo que me paguen por esta leche compraré un canasto de huevos. De los huevos saldrán cien pollitos. Cuando crezcan, los venderé y compraré un cerdito. Lo alimentaré hasta que esté grande, y con el dinero tendré una vaca con su ternero, que saltará feliz por el prado».',
        'Tan contenta estaba que ella misma dio un salto de alegría. ¡Ay! El cántaro cayó al suelo y se rompió en mil pedazos. Adiós leche, huevos, pollitos, cerdo, vaca y ternero.',
        'La fábula nos recuerda que no conviene contar los pollitos antes de que salgan del cascarón: los sueños se cumplen paso a paso.',
      ],
      preguntas: [
        {
          pregunta: '¿Qué llevaba la lechera en la cabeza?',
          opciones: ['Un cántaro de leche', 'Una canasta de huevos', 'Un pollito'],
          correcta: 0,
          explicacion: 'Llevaba el cántaro de leche al mercado.',
        },
        {
          pregunta: '¿Qué nos enseña la fábula?',
          opciones: ['Que los sueños se cumplen paso a paso', 'Que la leche es mala', 'Que no hay que ir al mercado'],
          correcta: 0,
          explicacion: 'Soñó tanto con el futuro que descuidó lo que tenía.',
        },
        {
          pregunta: '¿Por qué cayó se escribe con y?',
          opciones: ['Porque caer no tiene ll ni y, y sus formas con ese sonido van con y', 'Porque todas las palabras con tilde llevan y', 'Porque es familia de calle'],
          correcta: 0,
          explicacion: 'Caer, cayó; leer, leyó; oír, oyó.',
        },
      ],
    },
    intrusa: [
      { opciones: ['rey', 'hoy', 'ley', 'muí'], incorrecta: 3, correcta: 'muy', regla: 'Al final de palabra, después de vocal y sin tilde, se escribe y.' },
      { opciones: ['ventanilla', 'pajarillo', 'cuchillo', 'rodiya'], incorrecta: 3, correcta: 'rodilla', regla: 'Las palabras terminadas en -illo, -illa se escriben con ll.' },
      { opciones: ['cayó', 'leyó', 'oyó', 'crelló'], incorrecta: 3, correcta: 'creyó', regla: 'Si el verbo no tiene ll ni y (creer), sus formas van con y: creyó.' },
      { opciones: ['lluvia', 'llave', 'calle', 'yover'], incorrecta: 3, correcta: 'llover', regla: 'Lluvia y llover son de la misma familia: las dos llevan ll.' },
      { opciones: ['yema', 'yegua', 'yeso', 'llerno'], incorrecta: 3, correcta: 'yerno', regla: 'Las palabras que empiezan por yer- y yes- se escriben con y.' },
      { opciones: ['bello', 'sello', 'cuello', 'cabeyo'], incorrecta: 3, correcta: 'cabello', regla: 'Cabello, cuello y sello se escriben con ll.' },
      { opciones: ['callar', 'fallar', 'brillar', 'chiyar'], incorrecta: 3, correcta: 'chillar', regla: 'Los verbos terminados en -llar se escriben con ll.' },
      { opciones: ['huyendo', 'oyendo', 'cayendo', 'construllendo'], incorrecta: 3, correcta: 'construyendo', regla: 'Construir no tiene ll: se dice construyendo, con y.' },
    ],
    completa: [
      { texto: 're_', opciones: ['ll', 'y'], correcta: 'y', regla: 'Al final, después de vocal, va y.' },
      { texto: 'ventani_a', opciones: ['ll', 'y'], correcta: 'll', regla: 'La terminación -illa lleva ll.' },
      { texto: 'ca_ó', opciones: ['ll', 'y'], correcta: 'y', regla: 'Caer no tiene ll ni y: cayó.' },
      { texto: '_over', opciones: ['ll', 'y'], correcta: 'll', regla: 'Llover es familia de lluvia.' },
      { texto: '_erno', opciones: ['ll', 'y'], correcta: 'y', regla: 'yer- se escribe con y.' },
      { texto: 'cue_o', opciones: ['ll', 'y'], correcta: 'll', regla: 'Cuello se escribe con ll.' },
      { texto: 'ca_ar', opciones: ['ll', 'y'], correcta: 'll', regla: 'Los verbos en -llar llevan ll.' },
      { texto: 'constru_endo', opciones: ['ll', 'y'], correcta: 'y', regla: 'Construir no tiene ll: construyendo.' },
    ],
    corrige:
      'Anoche cayó una fuerte [yuvia|lluvia|Lluvia se escribe con ll, como llover.] sobre el pueblo. El [cabayo|caballo|Caballo se escribe con ll.] se escondió en el establo y la [gayina|gallina|Gallina se escribe con ll.] buscó refugio. Hoy el cielo amaneció limpio y [yeno|lleno|Lleno se escribe con ll, como llenar.] de luz.',
    sopa: ['lluvia', 'caballo', 'estrella', 'payaso', 'rey', 'playa', 'cuchillo', 'yema'],
    crucigrama: [
      { palabra: 'estrella', pista: 'Brilla en el cielo de noche.' },
      { palabra: 'caballo', pista: 'Animal que relincha y galopa.' },
      { palabra: 'llave', pista: 'Sirve para abrir la puerta.' },
      { palabra: 'playa', pista: 'Lugar con arena junto al mar.' },
      { palabra: 'rey', pista: 'Gobierna en un reino y usa corona.' },
      { palabra: 'pollito', pista: 'Cría de la gallina.' },
    ],
  },

  // ---------------------------------------------------------------- Tildes
  {
    id: 'tildes',
    titulo: 'Las tildes',
    lema: 'Aserrín, aserrán',
    color: '#e5607a',
    tinta: '#ffffff',
    icono: 'Feather',
    reglas: [
      { titulo: 'Agudas: tilde si terminan en n, s o vocal', ejemplos: ['canción', 'compás', 'café'] },
      { titulo: 'Graves: tilde si NO terminan en n, s o vocal', ejemplos: ['árbol', 'lápiz', 'fácil'] },
      { titulo: 'Esdrújulas: siempre llevan tilde', ejemplos: ['pájaro', 'música', 'sábado'] },
      { titulo: 'Sin tilde también se escribe bien', ejemplos: ['reloj', 'examen', 'cama'] },
    ],
    lectura: {
      titulo: 'Los maderos de San Juan',
      fuente: 'Fragmento y comentario del poema de José Asunción Silva (Bogotá, 1865-1896).',
      verso: [
        '¡Aserrín!',
        '¡Aserrán!',
        'Los maderos',
        'de San Juan',
        'piden queso,',
        'piden pan;',
        'los de Roque,',
        'alfandoque;',
        'los de Rique,',
        'alfeñique;',
        'los de Trique,',
        'triquitrán.',
      ],
      parrafos: [
        'En este poema, una abuela sienta a su nieto en las rodillas y lo mece al ritmo de esta canción antigua. El niño ríe, mientras la abuela, al cantar, recuerda su vida entera.',
        'Silva imitó con las palabras el vaivén de una sierra que corta madera: aserrín, aserrán. Por eso el poema se puede leer como si fuera un columpio.',
        'El alfandoque y el alfeñique son dulces tradicionales colombianos hechos con panela.',
      ],
      preguntas: [
        {
          pregunta: '¿Qué hace la abuela mientras canta?',
          opciones: ['Mece al niño en sus rodillas', 'Corta madera', 'Prepara alfandoque'],
          correcta: 0,
          explicacion: 'Lo mece al ritmo de la canción.',
        },
        {
          pregunta: '¿Qué imita el sonido «aserrín, aserrán»?',
          opciones: ['El vaivén de una sierra que corta madera', 'El canto de un pájaro', 'El ruido de la lluvia'],
          correcta: 0,
          explicacion: 'Aserrar es cortar madera con una sierra.',
        },
        {
          pregunta: '¿Por qué aserrán lleva tilde?',
          opciones: ['Es aguda y termina en n', 'Es grave y termina en n', 'Todas las palabras con r llevan tilde'],
          correcta: 0,
          explicacion: 'A-se-RRÁN: suena fuerte al final y termina en n.',
        },
      ],
    },
    intrusa: [
      { opciones: ['canción', 'café', 'compás', 'sofa'], incorrecta: 3, correcta: 'sofá', regla: 'Las agudas llevan tilde cuando terminan en n, s o vocal.' },
      { opciones: ['árbol', 'lápiz', 'cárcel', 'facil'], incorrecta: 3, correcta: 'fácil', regla: 'Las graves llevan tilde cuando NO terminan en n, s ni vocal.' },
      { opciones: ['pájaro', 'música', 'sábado', 'murcielago'], incorrecta: 3, correcta: 'murciélago', regla: 'Las esdrújulas siempre llevan tilde.' },
      { opciones: ['ratón', 'jardín', 'camion', 'sillón'], incorrecta: 2, correcta: 'camión', regla: 'Camión es aguda y termina en n: lleva tilde.' },
      { opciones: ['caracol', 'papel', 'ciudad', 'corazon'], incorrecta: 3, correcta: 'corazón', regla: 'Corazón es aguda terminada en n: lleva tilde.' },
      { opciones: ['examen', 'joven', 'lunes', 'cáma'], incorrecta: 3, correcta: 'cama', regla: 'Cama es grave y termina en vocal: no lleva tilde.' },
      { opciones: ['teléfono', 'brújula', 'número', 'matematicas'], incorrecta: 3, correcta: 'matemáticas', regla: 'Matemáticas es esdrújula: siempre lleva tilde.' },
      { opciones: ['azúcar', 'césped', 'móvil', 'dificil'], incorrecta: 3, correcta: 'difícil', regla: 'Difícil es grave terminada en l: lleva tilde.' },
    ],
    completa: [
      { pregunta: '¿Cuál está bien escrita?', opciones: ['cancion', 'canción', 'cáncion'], correcta: 'canción', regla: 'Aguda terminada en n: lleva tilde.' },
      { pregunta: '¿Cuál está bien escrita?', opciones: ['arbol', 'arból', 'árbol'], correcta: 'árbol', regla: 'Grave terminada en l: lleva tilde.' },
      { pregunta: '¿Cuál está bien escrita?', opciones: ['pájaro', 'pajaro', 'pajáro'], correcta: 'pájaro', regla: 'Esdrújula: siempre lleva tilde.' },
      { pregunta: '¿Cuál está bien escrita?', opciones: ['relój', 'reloj', 'réloj'], correcta: 'reloj', regla: 'Aguda terminada en j: no lleva tilde.' },
      { pregunta: '¿Cuál está bien escrita?', opciones: ['lapiz', 'lapíz', 'lápiz'], correcta: 'lápiz', regla: 'Grave terminada en z: lleva tilde.' },
      { pregunta: '¿Cuál está bien escrita?', opciones: ['exámen', 'examen', 'examén'], correcta: 'examen', regla: 'Grave terminada en n: no lleva tilde.' },
      { pregunta: '¿Qué clase de palabra es «música»?', opciones: ['Aguda', 'Grave', 'Esdrújula'], correcta: 'Esdrújula', regla: 'MÚ-si-ca: la sílaba fuerte es la antepenúltima.' },
      { pregunta: '¿Qué clase de palabra es «papel»?', opciones: ['Aguda', 'Grave', 'Esdrújula'], correcta: 'Aguda', regla: 'pa-PEL: la sílaba fuerte es la última. Termina en l, sin tilde.' },
    ],
    corrige:
      'El [sabado|sábado|Sábado es esdrújula: siempre lleva tilde.] fuimos al jardín botánico. Vimos un [pajaro|pájaro|Pájaro es esdrújula: siempre lleva tilde.] azul en un [arbol|árbol|Árbol es grave y termina en l: lleva tilde.] muy alto y escuchamos [musica|música|Música es esdrújula: siempre lleva tilde.] de flautas. Fue un paseo muy [comico|cómico|Cómico es esdrújula: siempre lleva tilde.].',
    sopa: ['canción', 'árbol', 'pájaro', 'música', 'café', 'lápiz', 'sábado', 'ratón'],
    crucigrama: [
      { palabra: 'sabado', pista: 'Día que va después del viernes.' },
      { palabra: 'arbol', pista: 'Planta con tronco, ramas y hojas.' },
      { palabra: 'pajaro', pista: 'Animal con plumas que vuela.' },
      { palabra: 'musica', pista: 'Arte de combinar los sonidos.' },
      { palabra: 'cafe', pista: 'Bebida famosa que se cultiva en Colombia.' },
      { palabra: 'lapiz', pista: 'Sirve para escribir y se puede borrar.' },
    ],
  },

  // ---------------------------------------------------------------- Mayúsculas y puntuación
  {
    id: 'mayus',
    titulo: 'Mayúsculas y signos',
    lema: 'El guardián del Magdalena',
    color: '#127f96',
    tinta: '#ffffff',
    icono: 'MapPin',
    reglas: [
      { titulo: 'Mayúscula al empezar y después de punto', ejemplos: ['Llegué. Después comí.'] },
      { titulo: 'Nombres propios con mayúscula', ejemplos: ['Sofía', 'Bogotá', 'río Magdalena'] },
      { titulo: 'Días y meses con minúscula', ejemplos: ['lunes', 'julio'] },
      { titulo: 'Preguntas y exclamaciones abren y cierran', ejemplos: ['¿Vienes?', '¡Qué bien!'] },
      { titulo: 'Coma para separar una enumeración', ejemplos: ['mangos, piñas y uvas'] },
    ],
    lectura: {
      titulo: 'El Mohán',
      fuente: 'Leyenda de la tradición oral del río Magdalena (Tolima y Huila), contada para niños.',
      parrafos: [
        'En las orillas del río Magdalena, los pescadores cuentan la historia del Mohán. Dicen que es un hombre viejo, de barba larga y cabello enredado, que vive en una cueva bajo el agua, rodeado de tesoros.',
        'El Mohán es el guardián del río. Cuando alguien pesca más de lo necesario o ensucia el agua, agita las corrientes y voltea las canoas. En cambio, a quienes cuidan el río, les ayuda a encontrar peces.',
        'En los pueblos ribereños del Tolima y del Huila, las abuelas todavía les dicen a los niños: «¡No juegues solo en la orilla, que el Mohán está mirando!». ¿Será verdad? Lo cierto es que la leyenda nos enseña a respetar el río.',
      ],
      preguntas: [
        {
          pregunta: '¿De qué es guardián el Mohán?',
          opciones: ['Del río', 'Del bosque', 'De las montañas'],
          correcta: 0,
          explicacion: 'Cuida el río Magdalena y sus peces.',
        },
        {
          pregunta: '¿Qué hace el Mohán con quienes ensucian el agua?',
          opciones: ['Agita las corrientes y voltea sus canoas', 'Les regala tesoros', 'Les enseña a pescar'],
          correcta: 0,
          explicacion: 'Castiga a quienes no respetan el río.',
        },
        {
          pregunta: '¿Por qué Magdalena se escribe con mayúscula?',
          opciones: ['Es el nombre propio de un río', 'Está al comienzo de la oración', 'Es una palabra larga'],
          correcta: 0,
          explicacion: 'Los nombres de ríos, ciudades y personas son nombres propios.',
        },
      ],
    },
    intrusa: [
      { opciones: ['Viajamos a Cartagena en julio.', 'El río Magdalena es muy largo.', 'mi amiga se llama Sofía.', '¿Quieres leer conmigo?'], incorrecta: 2, correcta: 'Mi amiga se llama Sofía.', regla: 'Toda oración empieza con mayúscula.' },
      { opciones: ['Hoy es lunes.', 'El Martes vamos al museo.', 'Nací en diciembre.', 'El domingo descansamos.'], incorrecta: 1, correcta: 'El martes vamos al museo.', regla: 'Los días de la semana y los meses se escriben con minúscula.' },
      { opciones: ['¿Cómo te llamas?', '¡Qué alegría verte!', 'Vienes mañana?', '¿Qué comiste hoy?'], incorrecta: 2, correcta: '¿Vienes mañana?', regla: 'Las preguntas llevan signo de apertura (¿) y de cierre (?).' },
      { opciones: ['Compré mangos, piñas y uvas.', 'Me gustan el fútbol, el baloncesto y la natación.', 'Tengo lápices borradores y reglas.', 'Visitamos Cali, Pasto y Neiva.'], incorrecta: 2, correcta: 'Tengo lápices, borradores y reglas.', regla: 'En una enumeración, los elementos se separan con coma.' },
      { opciones: ['Vivo en Bogotá.', 'El volcán Galeras está en Nariño.', 'Mi perro se llama toby.', 'La Guajira tiene desiertos.'], incorrecta: 2, correcta: 'Mi perro se llama Toby.', regla: 'Los nombres propios de personas y animales se escriben con mayúscula.' },
      { opciones: ['¡Qué susto!', '¡Ganamos el partido!', 'Auxilio!', '¡Feliz cumpleaños!'], incorrecta: 2, correcta: '¡Auxilio!', regla: 'Las exclamaciones llevan signo de apertura (¡) y de cierre (!).' },
      { opciones: ['La Sierra Nevada de Santa Marta es muy alta.', 'Leí un cuento de rafael Pombo.', 'Gabriel García Márquez nació en Aracataca.', 'El Amazonas es un río enorme.'], incorrecta: 1, correcta: 'Leí un cuento de Rafael Pombo.', regla: 'Los nombres y apellidos de personas van con mayúscula.' },
      { opciones: ['Llegué tarde. Mi mamá me esperaba.', 'Comimos arepa. después jugamos.', 'Terminó la clase. Salimos al patio.', 'Hace frío. Me puse la chaqueta.'], incorrecta: 1, correcta: 'Comimos arepa. Después jugamos.', regla: 'Después de punto se escribe mayúscula.' },
    ],
    completa: [
      { texto: '_Qué hora es?', opciones: ['¿', '¡', '.'], correcta: '¿', regla: 'Las preguntas abren con ¿.' },
      { texto: 'Compré mangos_ peras y uvas.', opciones: [',', '.', '¿'], correcta: ',', regla: 'La coma separa los elementos de una enumeración.' },
      { texto: 'Vivo en _ogotá.', opciones: ['B', 'b'], correcta: 'B', regla: 'Bogotá es nombre propio: mayúscula.' },
      { texto: 'Mi cumpleaños es en _ulio.', opciones: ['J', 'j'], correcta: 'j', regla: 'Los meses se escriben con minúscula.' },
      { texto: '_Qué bonito día!', opciones: ['¡', '¿'], correcta: '¡', regla: 'Las exclamaciones abren con ¡.' },
      { texto: 'Pescamos en el río _agdalena.', opciones: ['M', 'm'], correcta: 'M', regla: 'El nombre del río es nombre propio.' },
      { texto: 'Terminé la tarea_ Ahora voy a jugar.', opciones: ['.', ','], correcta: '.', regla: 'Ahora empieza con mayúscula: antes va punto.' },
      { texto: 'Los _omingos vamos al parque.', opciones: ['D', 'd'], correcta: 'd', regla: 'Los días de la semana van con minúscula.' },
    ],
    corrige:
      '[el|El|Toda oración empieza con mayúscula.] sábado visitamos el río [magdalena|Magdalena|El nombre del río es nombre propio: va con mayúscula.] con mi tía Lucía. [Que|¡Qué|La exclamación necesita su signo de apertura (¡), y qué lleva tilde cuando exclama.] paisaje tan bonito! Llevamos [mangos|mangos,|En una enumeración, los elementos se separan con coma.] piñas y guayabas.',
    sopa: ['Colombia', 'Bogotá', 'Medellín', 'Cali', 'Magdalena', 'Andes', 'punto', 'coma'],
    crucigrama: [
      { palabra: 'colombia', pista: 'Nuestro país.' },
      { palabra: 'bogota', pista: 'Capital de Colombia.' },
      { palabra: 'andes', pista: 'Cordillera que atraviesa Colombia de sur a norte.' },
      { palabra: 'caribe', pista: 'Mar que baña el norte de Colombia.' },
      { palabra: 'punto', pista: 'Signo que cierra una oración.' },
      { palabra: 'coma', pista: 'Signo que separa los elementos de una lista.' },
    ],
  },

  // ---------------------------------------------------------------- Homófonos
  {
    id: 'homofonos',
    titulo: 'Suenan igual',
    lema: 'Simón y los pasteles',
    color: '#4f9437',
    tinta: '#ffffff',
    icono: 'Waves',
    reglas: [
      { titulo: 'hay (existir) · ahí (lugar) · ¡ay! (dolor)', ejemplos: ['Hay pan.', 'Ahí está.', '¡Ay!'] },
      { titulo: 'a ver (mirar) · haber (verbo)', ejemplos: ['Vamos a ver.', 'Debe haber agua.'] },
      { titulo: 'tuvo (tener) · tubo (pieza hueca)', ejemplos: ['Tuvo suerte.', 'El tubo del agua.'] },
      { titulo: 'hecho (hacer) · echo (echar)', ejemplos: ['Está hecho.', 'Echo agua.'] },
      { titulo: 'votar (elegir) · botar (tirar)', ejemplos: ['Votar por alguien.', 'Botar la basura.'] },
    ],
    lectura: {
      titulo: 'Simón el bobito',
      fuente: 'Adaptación libre inspirada en el poema de Rafael Pombo.',
      verso: [
        'Simón el bobito llamó al pastelero:',
        '«¡A ver los pasteles, los quiero probar!».',
        '«Sí», repuso el otro, «pero antes yo quiero',
        'ver ese cuartillo con que has de pagar».',
      ],
      parrafos: [
        'Simón buscó en sus bolsillos, pero ahí no había ni una moneda. «¡Ay!», suspiró, y se fue sin probar los pasteles.',
        'Ese día Simón tuvo muchas ideas raras. Echó agua en un canasto para llevarla a su casa, pero cuando llegó, el canasto estaba vacío. Después quiso ver la luna de cerca y se subió al tejado con una escoba.',
        'Su mamá, al verlo, se rio y le dijo: «Hay que pensar antes de actuar, hijo». Desde entonces, cada vez que Simón tiene una idea, primero se pregunta: «A ver, ¿esto tiene sentido?».',
      ],
      preguntas: [
        {
          pregunta: '¿Por qué Simón no probó los pasteles?',
          opciones: ['Porque no tenía con qué pagar', 'Porque no le gustaban', 'Porque el pastelero se fue'],
          correcta: 0,
          explicacion: 'Buscó en sus bolsillos y no tenía ni una moneda.',
        },
        {
          pregunta: '¿Qué pasó con el agua del canasto?',
          opciones: ['Se salió por los huecos y el canasto quedó vacío', 'Se convirtió en hielo', 'Se la tomó Simón'],
          correcta: 0,
          explicacion: 'Un canasto tiene huecos: no sirve para cargar agua.',
        },
        {
          pregunta: 'En «¡A ver los pasteles!», ¿por qué se escribe a ver separado?',
          opciones: ['Porque significa mirar o comprobar', 'Porque es el verbo haber', 'Porque expresa dolor'],
          correcta: 0,
          explicacion: 'Simón quiere ver, mirar los pasteles.',
        },
      ],
    },
    intrusa: [
      { opciones: ['Hay mucha gente en el parque.', 'Ahí está mi lápiz.', '¡Ay, me golpeé el pie!', 'Ahí dos gatos en el techo.'], incorrecta: 3, correcta: 'Hay dos gatos en el techo.', regla: 'Hay es de haber (existir); ahí indica un lugar; ¡ay! expresa dolor.' },
      { opciones: ['Vamos a ver la película.', 'Debe haber agua en la nevera.', 'Voy haber si llegó el bus.', 'Puede haber lluvia mañana.'], incorrecta: 2, correcta: 'Voy a ver si llegó el bus.', regla: 'A ver significa mirar o comprobar; haber es un verbo.' },
      { opciones: ['Mi abuelo tuvo una finca.', 'El tubo del agua está roto.', 'Ella tubo mucha suerte.', 'Tuvo que salir temprano.'], incorrecta: 2, correcta: 'Ella tuvo mucha suerte.', regla: 'Tuvo es del verbo tener; un tubo es una pieza hueca.' },
      { opciones: ['La tarea ya está hecha.', 'Hecho de menos a mi prima.', 'Echo agua a las matas.', 'El pastel está hecho.'], incorrecta: 1, correcta: 'Echo de menos a mi prima.', regla: 'Hecho es de hacer; echo es de echar.' },
      { opciones: ['¡Hola, profesora!', 'Una ola gigante llegó a la playa.', 'Una hola del mar nos mojó.', 'Saludé con un hola.'], incorrecta: 2, correcta: 'Una ola del mar nos mojó.', regla: 'Hola es un saludo; ola es el movimiento del agua del mar.' },
      { opciones: ['Los adultos van a votar.', 'No hay que botar basura al río.', 'Voy a votar los papeles viejos.', 'Votamos por el representante del curso.'], incorrecta: 2, correcta: 'Voy a botar los papeles viejos.', regla: 'Votar es elegir; botar es tirar.' },
      { opciones: ['Mi casa tiene un patio.', 'La caza de animales está prohibida.', 'Ellos casan mariposas sin permiso.', 'Vivo en una casa azul.'], incorrecta: 2, correcta: 'Ellos cazan mariposas sin permiso.', regla: 'Casa es vivienda; cazar es perseguir animales.' },
      { opciones: ['Me siento feliz.', 'Hay ciento veinte niños.', 'Ciento mucho frío.', 'Lo siento mucho.'], incorrecta: 2, correcta: 'Siento mucho frío.', regla: 'Siento es de sentir; ciento es un número (100).' },
    ],
    completa: [
      { texto: '_ un libro sobre la mesa.', opciones: ['Hay', 'Ahí', 'Ay'], correcta: 'Hay', regla: 'Hay = existe.' },
      { texto: 'Vamos _ qué pasó.', opciones: ['a ver', 'haber'], correcta: 'a ver', regla: 'A ver = mirar, comprobar.' },
      { texto: 'Mi abuela _ una idea genial.', opciones: ['tuvo', 'tubo'], correcta: 'tuvo', regla: 'Tuvo es del verbo tener.' },
      { texto: 'Las _ del mar están altas.', opciones: ['olas', 'holas'], correcta: 'olas', regla: 'Ola es el movimiento del agua.' },
      { texto: 'Ya está _ el trabajo.', opciones: ['hecho', 'echo'], correcta: 'hecho', regla: 'Hecho es del verbo hacer.' },
      { texto: 'No hay que _ basura en la calle.', opciones: ['botar', 'votar'], correcta: 'botar', regla: 'Botar = tirar.' },
      { texto: 'Me _ muy contento.', opciones: ['siento', 'ciento'], correcta: 'siento', regla: 'Siento es del verbo sentir.' },
      { texto: '_ está tu mochila, junto a la puerta.', opciones: ['Ahí', 'Hay', 'Ay'], correcta: 'Ahí', regla: 'Ahí indica un lugar.' },
    ],
    corrige:
      '[Ola|Hola|Hola es un saludo; ola es el agua del mar.], me llamo Andrés. Ayer [tube|tuve|Tuve es del verbo tener: va con v.] una idea: vamos [haber|a ver|A ver (mirar) se escribe separado.] una película en mi casa. [Hay|Ahí|Ahí indica un lugar.] está el televisor nuevo.',
    sopa: ['hola', 'hecho', 'tubo', 'tuvo', 'casa', 'caza', 'votar', 'botar'],
    crucigrama: [
      { palabra: 'ciento', pista: 'Cien unidades.' },
      { palabra: 'votar', pista: 'Elegir a alguien en unas elecciones.' },
      { palabra: 'hola', pista: 'Saludo que decimos al llegar.' },
      { palabra: 'tubo', pista: 'Pieza hueca por donde pasa el agua.' },
      { palabra: 'caza', pista: 'Acción de perseguir animales.' },
      { palabra: 'ola', pista: 'Movimiento del agua del mar.' },
    ],
  },
]

/** Libros que aún no existen: se ven en el estante como "próximamente". */
export const PROXIMOS = [
  { titulo: 'Prefijos y sufijos', color: '#c9b58f' },
  { titulo: 'Sinónimos y antónimos', color: '#a9c1c9' },
  { titulo: 'Poesía colombiana', color: '#d2a7a0' },
]

export const MIN_SELLOS_PARA_ABRIR = 3
