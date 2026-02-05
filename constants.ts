
import { TimelineEvent, LobbyTrack } from './types';

export const EVENT_DATE_ISO = '2026-05-02';

// Helper para codificar URLs (maneja espacios, tildes, paréntesis)
const localImg = (name: string) => `/images/${encodeURIComponent(name)}.jpg`;
const localAudio = (name: string) => `/canciones/${encodeURIComponent(name)}.mp3`;
const localVideo = (name: string) => `/images/${encodeURIComponent(name)}.mp4`;

// --- FOTOS LOCALES (PROYECTO) ---
export const STANDBY_IMAGES = [
  localImg('Carrusel 1'),
  localImg('Carrusel 2'),
  localImg('Carrusel 3'),
  localImg('Carrusel 4'),
  localImg('Carrusel 5'),
  localImg('Carrusel 6'),
  localImg('Carrusel 7'),
  localImg('Carrusel 8'),
  localImg('Carrusel 9'),
  localImg('Carrusel 10'),
  localImg('Carrusel 11'),
  localImg('Carrusel 12'),
];

export const LOBBY_AUDIO_TRACKS: LobbyTrack[] = [
  { title: 'Luz de mi sendero (Instrumental)', audioUrl: localAudio('Luz de mi sendero (Instrumental)') },
  { title: 'Mi aliento (Instrumental)', audioUrl: localAudio('Mi aliento (Instrumental)') },
  { title: 'Porque estás (Instrumental)', audioUrl: localAudio('Porque estás (Instrumental)') },
  { title: 'Quizás no lo sabias (Instrumental)', audioUrl: localAudio('Quizás no lo sabias (Instrumental)') },
];

export const EVENTS_SCHEDULE: TimelineEvent[] = [
  {
    id: 'intro',
    time: '08:00',
    title: 'Track 01: El Despertar',
    lockedTitle: 'Inicialización del Sistema',
    description: 'Bienvenida a tus 40 años. El día comienza con lujo y una vista espectacular. Respira profundo, una nueva era comienza hoy con este desayuno especial.',
    location: 'Habitación Principal',
    image: localImg('Miniatura desayuno'),
    type: 'moment',
    hint: 'Próximo: Un artefacto brillante te espera...',
  },
  {
    id: 'gift',
    time: '09:00',
    title: 'Track 02: El Artefacto',
    lockedTitle: 'Objeto Encriptado Detectado',
    description: 'Una pieza atemporal para un alma eterna. Abre la caja de terciopelo. Una cadena forjada para mantener los recuerdos cerca de tu corazón.',
    location: 'El Cuarto Azul',
    image: localImg('Carrusel 1'), // Fallback visual (usamos una del carrusel si no hay miniatura específica)
    type: 'moment',
    hint: 'Próximo: Palabras destinadas solo para ti...',
  },
  {
    id: 'letter',
    time: '09:30',
    title: 'Track 03: El Manuscrito',
    lockedTitle: 'Archivo de Datos Personales',
    description: 'Mi Querida Abigail, \n\nCuarenta años no es solo una medida de tiempo, sino una medida de la luz que has traído a este mundo...',
    location: 'Lounge Privado',
    image: localImg('Miniatura carta'), 
    type: 'letter',
    hint: 'Próximo: La frecuencia del día se revela...',
  },
  {
    id: 'playlist',
    time: '10:00',
    title: 'Track 04: Lista Maestra',
    lockedTitle: 'Flujo de Audio Decodificado',
    description: 'Acceso concedido a la banda sonora "Abigail Vol. 40". Selecciona una pista para ver su letra.',
    location: 'Transmisión Global',
    image: localImg('Carrusel 2'), // Fallback visual
    type: 'playlist',
    playlist: [
      { 
        title: "Seguiste conmigo", 
        artist: "Ariel Romero", 
        audioUrl: localAudio('1 seguiste conmigo'),
        lyrics: `[Verse]\nNo sé decir cuándo empezó\nSolo sé que estabas ahí\nAntes de entender lo que venía\nAntes de aprender a cuidar\n\n[Verse]\nPasaron intentos\nPasaron errores\nPasaron años\n\n[Outro]\nY tú\nSeguiste`
      },
      { 
        title: "Porque estás", 
        artist: "Ariel Romero", 
        audioUrl: localAudio('2 porque estás'),
        lyrics: `[Verse 1]\nTrabajas sin pausa para que el día funcione\nTodo lo planeas, incluso lo que nadie ve\nSe nota cuando estás\nY mucho más cuando no estás\n\n[Verse 2]\nSabes la importancia de cada detalle\nLo que se dice y lo que no\nTu presencia pone orden\nY tu voz organiza el caos\n\n[Chorus]\nSe sostiene lo que tocás\nSin tener que explicarlo\nHay cosas que siguen en pie\nPorque estás, y eso basta\n\n[Outro]\nTal vez no lo sepan afuera\nPero aquí\nSe siente en mi alma lo sé`
      },
      { 
        title: "Mi aliento", 
        artist: "Ariel Romero", 
        audioUrl: localAudio('3 mi aliento'),
        lyrics: `[Verse 1]\nCaminas sin pelear con las horas\nNi las empujas, ni las dejas ir\nTu silencio tiene un calor tibio\nQue aprende mi forma de vivir\n\n[Verse 2]\nNo llegas quebrando la calma\nLlegas para echar raíz\nVital como el primer aliento\nVerdad que, sin voz, sabe latir\n\n[Chorus]\nY yo entiendo tu idioma lento\nGramática de piel, urgente y presente\nDonde tu forma de ser acomoda\nTodo lo que vive dentro de mí\n\nHay manos que rozan la superficie\nLas tuyas van al fondo del mar\nNo piden permiso, solo enseñan\nEl camino justo para descansar\n\n[Bridge]\nSi el mundo se inclina y me aplasta\nY mi día se vuelve metal\nEres refugio sin paredes\nDonde el peso deja de empujar\n\n[Chorus / Outro]\nAprendí que hay bellezas ocultas\nQue no se miran, se deben honrar\nMujeres que no son pirotecnia\nSon faro, son puerto, son mar\n\nY en la forma en que caminas conmigo\nComo prometimos en el altar\nYo aprendo a vivir a tu ritmo\nDisfrutando la vida a tu lado\nYo aprendo a quedarme en calma\nY a estar junto a ti\n\n[End]\nMira lo que el tiempo ha hecho en mí\nDesde que aprendí a verte así`
      },
      { 
        title: "Quizás no lo sabías", 
        artist: "Ariel Romero", 
        audioUrl: localAudio('4 Quizás no lo sabias'),
        lyrics: `[Verse 1]\nTienes una forma honesta\nDe mirar la realidad\nNo prometes lo imposible\nPero cumples de verdad\nHaces fácil lo correcto\nAunque cueste un poco más\nY sin darte cuenta enseñas\nCómo se debe caminar\n\n[Pre-Chorus]\nTal vez no lo ves en ti\nPero se nota al pasar\nDonde otros dudan o se rompen\nTú no sueltas, sabes estar\n\n[Chorus]\nY yo\nTe miro y lo entiendo\nEres más fuerte de lo que crees\nMás clara de lo que dices\nTienes una luz tranquila\nQue no pide atención\nY si el mundo no lo nota\nHoy lo digo yo\n\n[Verse 2]\nTienes manos que construyen\nSin hacer ruido al llegar\nUna paciencia valiente\nQue no se aprende en ningún lugar\nSabes cuidar lo importante\nSin dejar de soñar\nY haces que creer en el bien\nNo parezca ingenuidad\n\n[Pre-Chorus]\nTal vez nadie te enseñó\nA mirarte desde afuera\nPero hay verdad en tu forma\nY belleza en tu manera\n\n[Chorus]\nY yo\nTe miro y lo entiendo\nEres más firme de lo que ves\nMás grande de lo que imaginas\nTienes una luz tranquila\nQue ordena el corazón\nY si el mundo no lo dice\nHoy lo digo yo\n\n[Bridge]\nNo es solo amor lo que siento\nEs respeto y admiración\nEs saber que caminar contigo\nMe hace mejor\n\n[Final Chorus]\nY yo\nSi volviera a empezar de cero\nTe elegiría otra vez\nSin dudar ni un segundo\nPorque hay belleza en tu carácter\nY verdad en tu voz\nY amar así, con lo que eres\nSe siente nuevo\nComo la primera vez\n\n[Outro]\nTal vez no lo sabías\nTal vez nadie lo dijo\nPero cuando sonríes\nAsí te veo yo`
      },
      { 
        title: "Luz de mi sendero", 
        artist: "Ariel Romero", 
        audioUrl: localAudio('5 Luz de mi sendero'),
        lyrics: `**Verso 1**\nEres brisa en mi ventana,\nrisa clara de la aurora,\nun milagro de mañana\nque en mis brazos aún reposa.\nCon tus ojos de promesa\ny tu paso todavía,\nDios me dio la más perfecta\nrazón para cada día.\n\n**Estribillo**\nAilari Leonor, luz de mi sendero,\nnunca estarás sola, yo estaré contigo.\nHasta mi último aliento, te cuidaré,\ny en el bien te guiaré.\nCon la mano en la Palabra\ny el temor santo de Dios,\nte mostraré el camino\ncon ternura y con valor.\n\n**Verso 2**\nTe enseñaré a ver las estrellas\nno solo en el cielo azul,\nsino en cada buena huella\nque deje el amor en ti.\nQue el respeto sea tu escudo,\nla verdad tu canción,\ny que en lo alto siempre encuentres\nconsuelo y dirección.\n\n**Puente**\nY cuando seas adulta,\ny el mundo intente callarte,\nrecuerda que desde pequeña\naprendiste a caminar con fe.\nPorque el mismo Dios que me dio tu nombre,\nte sostiene con su eterno amor\n\n**Estribillo (repetición con ligera variación emocional)**\nAilari Leonor, luz de mi sendero,\naunque el tiempo me lleve,\nsiempre estaré contigo.\nHasta mi último aliento, te cuidaré,\ny en el bien te guiaré...\nCon la mano en la Palabra\ny el temor santo de Dios,\nte mostraré el camino\ncon ternura y con valor.\n\n**Cierre (susurrado o cantado muy suave):**\nMi niña... Dios en el cielo vela por ti.\nY yo, por ti, daría mil vidas....`
      },
      { 
        title: "Antes de verte", 
        artist: "Ariel Romero", 
        audioUrl: localAudio('6 Antes de verte'),
        lyrics: `Llegaste sin avisar\nAntes de saber tu voz\nY ya estabas acomodando\nEl pulso del corazón\nTodavía no sé tu nombre\nNi tu forma de mirar\nPero hay algo en este silencio\nQue me enseña a esperar\n\n[Pre-Chorus]\nNo necesito verte\nPara saber quién vas a ser\nHay promesas en tu latido\nQue me hacen orar por ti\n\n[Chorus]\nY aquí estás\nAntes de llegar al mundo\nAntes de aprender a hablar\nYa me enseñas a confiar\nNo sé quién serás mañana\nPero sé lo esencial\nQue viniste con propósito\nY no por casualidad\n\n[Verse 2]\nTal vez rías como tu madre\nO camines como yo\nTal vez mires todo de frente\nO preguntes siempre más\nSea cual sea tu manera\nQuiero estar para escuchar\nPara mostrarte el camino\nY dejarte caminar\n\n[Pre-Chorus]\nNo vengo a escribir tu historia\nNi a decirte quién serás\nSolo a darte raíces firmes\nY espacio para volar\n\n[Chorus]\nY aquí estás\nAntes de llegar al mundo\nAntes de decir tu voz\nYa me cambias la razón\nNo sé quién serás mañana\nPero sé la verdad\nQue tu vida tiene sentido\nDesde antes de empezar\n\n[Bridge]\nSi alguna vez dudas\nO el miedo quiere entrar\nRecuerda que antes de verte\nYa te supimos amar\n\n[Final Chorus]\nY aquí estás\nPequeña vida esperada\nEnvuelta en fe y oración\nEn silencio y gratitud\nNo sé qué nombre llevarás\nPero sé lo esencial\nQue no caminas solo\nHay amor cuidando\nCada paso que darás\n\n[Outro]\nTodavía no te vemos\nPero ya estás aquí`
      },
      { 
        title: "Quedarse", 
        artist: "Ariel Romero", 
        audioUrl: localAudio('7 Quedarse'),
        lyrics: `Llegaste sin avisar\nAntes de saber tu voz\nY ya estabas acomodando\nEl pulso del corazón\nTodavía no sé tu nombre\nNi tu forma de mirar\nPero hay algo en este silencio\nQue me enseña a esperar\n\n[Pre-Chorus]\nNo necesito verte\nPara saber quién vas a ser\nHay promesas en tu latido\nQue me hacen orar por ti\n\n[Chorus]\nY aquí estás\nAntes de llegar al mundo\nAntes de aprender a hablar\nYa me enseñas a confiar\nNo sé quién serás mañana\nPero sé lo esencial\nQue viniste con propósito\nY no por casualidad\n\n[Verse 2]\nTal vez rías como tu madre\nO camines como yo\nTal vez mires todo de frente\nO preguntes siempre más\nSea cual sea tu manera\nQuiero estar para escuchar\nPara mostrarte el camino\nY dejarte caminar\n\n[Pre-Chorus]\nNo vengo a escribir tu historia\nNi a decirte quién serás\nSolo a darte raíces firmes\nY espacio para volar\n\n[Chorus]\nY aquí estás\nAntes de llegar al mundo\nAntes de decir tu voz\nYa me cambias la razón\nNo sé quién serás mañana\nPero sé la verdad\nQue tu vida tiene sentido\nDesde antes de empezar\n\n[Bridge]\nSi alguna vez dudas\nO el miedo quiere entrar\nRecuerda que antes de verte\nYa te supimos amar\n\n[Final Chorus]\nY aquí estás\nPequeña vida esperada\nEnvuelta en fe y oración\nEn silencio y gratitud\nNo sé qué nombre llevarás\nPero sé lo esencial\nQue no caminas solo\nHay amor cuidando\nCada paso que darás\n\n[Outro]\nTodavía no te vemos\nPero ya estás aquí`
      }
    ],
    hint: 'Próximo: Recibiendo señales del colectivo...',
  },
  {
    id: 'video',
    time: '11:00',
    title: 'Track 05: Los Archivos',
    lockedTitle: 'Stream de Datos Visuales',
    description: 'Una compilación de mensajes de aquellos que te aman. Señales recibidas desde todos los rincones del mundo.',
    location: 'Cine de la Sala',
    image: localImg('Carrusel 3'), // Fallback thumbnail
    type: 'video',
    videoUrl: localVideo('video 1'),
    hint: 'Próximo: Prepárate para la extracción...',
  },
  {
    id: 'outing',
    time: '16:00',
    title: 'Track 06: La Extracción',
    lockedTitle: 'Coordenadas Subidas',
    description: 'El vehículo está esperando abajo. El destino es clasificado. Código de vestimenta: Icónico.',
    location: 'Calles de la Ciudad',
    image: localImg('Miniatura la extraccion'),
    type: 'moment',
    hint: 'Próximo: La frecuencia final...',
  },
  {
    id: 'party',
    time: '20:30',
    title: 'Track 07: Modo Noche',
    lockedTitle: 'Velocidad Máxima',
    description: 'La hora dorada ha terminado. Ahora brillamos en la oscuridad. Bienvenida al evento principal.',
    location: 'Ubicación Secreta',
    image: localImg('Miniatura modo noche'),
    type: 'music',
    hint: 'Sistema recargando para el año 41...',
  }
];
