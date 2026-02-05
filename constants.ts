
import { TimelineEvent, LobbyTrack } from './types';

export const EVENT_DATE_ISO = '2026-05-02';

const dropboxRaw = (url: string) => url.replace('dl=0', 'dl=1');

// --- FOTOS LOCALES (PROYECTO) ---
// NOTA: Debes crear una carpeta 'public/images' y guardar tus fotos ahí con estos nombres.
export const STANDBY_IMAGES = [
  '/images/lobby-1.jpg',
  '/images/lobby-2.jpg',
  '/images/lobby-3.jpg',
  '/images/lobby-4.jpg',
  '/images/lobby-5.jpg',
  '/images/lobby-6.jpg',
  '/images/lobby-7.jpg',
  '/images/lobby-8.jpg',
  '/images/lobby-9.jpg',
];

export const LOBBY_AUDIO_TRACKS: LobbyTrack[] = [
  { title: 'Ailari Leonor (Instrumental)', audioUrl: dropboxRaw('https://www.dropbox.com/scl/fi/v6bvoky0e6iotagbhatgl/Ailari-Leonor-Instrumental.mp3?rlkey=h2p5fpwu8pwcdndnv0655byyo&st=2tf1z2ql&dl=0') },
  { title: 'Muñeca (Instrumental)', audioUrl: dropboxRaw('https://www.dropbox.com/scl/fi/26vqhh81z8j7nehrj501c/mu-eca-single-LP-Instrumental.mp3?rlkey=7nhpc1s9tfnrz45g4z40or857&st=0xbwdoyk&dl=0') },
  { title: 'Porque estás (Instrumental)', audioUrl: dropboxRaw('https://www.dropbox.com/scl/fi/lg722hw45jkno44taam18/porque-est-s-V2-Instrumental.mp3?rlkey=i2g4xj1rcwd472im23in556bz&st=n01hy2tl&dl=0') },
  { title: 'Quizás no lo sabías (Instrumental)', audioUrl: dropboxRaw('https://www.dropbox.com/scl/fi/hohlm8qzyss5vhd6tfdsv/quiz-s-no-lo-sabias-LP-Instrumental.mp3?rlkey=qcub6k6whw12k02lu1c3o6d2v&st=adtn4jdi&dl=0') },
];

export const EVENTS_SCHEDULE: TimelineEvent[] = [
  {
    id: 'intro',
    time: '08:00',
    title: 'Track 01: El Despertar',
    lockedTitle: 'Inicialización del Sistema',
    description: 'Bienvenida a tus 40 años. El día comienza con lujo y una vista espectacular. Respira profundo, una nueva era comienza hoy con este desayuno especial.',
    location: 'Habitación Principal',
    image: '/images/event-intro.jpg',
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
    image: '/images/event-gift.jpg',
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
    image: '/images/event-letter.jpg', 
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
    image: '/images/event-playlist.jpg', // Puedes usar cualquier foto genérica o la de Unsplash descargada
    type: 'playlist',
    playlist: [
      { 
        title: "Seguiste conmigo", 
        artist: "Ariel Romero", 
        audioUrl: dropboxRaw('https://www.dropbox.com/scl/fi/urs8pcoqwnq8cbudjsx8k/1-seguiste-conmigo.mp3?rlkey=u4salako6za5xk1b0d5gtmkus&st=kk2skqn1&dl=0'),
        lyrics: `[Verse]\nNo sé decir cuándo empezó\nSolo sé que estabas ahí\nAntes de entender lo que venía\nAntes de aprender a cuidar\n\n[Verse]\nPasaron intentos\nPasaron errores\nPasaron años\n\n[Outro]\nY tú\nSeguiste`
      },
      { 
        title: "Porque estás", 
        artist: "Ariel Romero", 
        audioUrl: dropboxRaw('https://www.dropbox.com/scl/fi/cjdjqa0v1rn6ijypepn87/2-porque-est-s.mp3?rlkey=636voyy8amcnf76zf1xcdbo7m&st=4xnsesqs&dl=0'),
        lyrics: `[Verse 1]\nTrabajas sin pausa para que el día funcione\nTodo lo planeas, incluso lo que nadie ve\nSe nota cuando estás\nY mucho más cuando no estás\n\n[Verse 2]\nSabes la importancia de cada detalle\nLo que se dice y lo que no\nTu presencia pone orden\nY tu voz organiza el caos\n\n[Chorus]\nSe sostiene lo que tocás\nSin tener que explicarlo\nHay cosas que siguen en pie\nPorque estás, y eso basta\n\n[Outro]\nTal vez no lo sepan afuera\nPero aquí\nSe siente en mi alma lo sé`
      },
      { 
        title: "Mi aliento", 
        artist: "Ariel Romero", 
        audioUrl: dropboxRaw('https://www.dropbox.com/scl/fi/ryjv3etc672k3i80uns4y/3-mi-aliento.mp3?rlkey=d0nxzg1nny8y9y8f2nkerf8gi&st=3dasdbjx&dl=0'),
        lyrics: `[Verse 1]\nCaminas sin pelear con las horas\nNi las empujas, ni las dejas ir\nTu silencio tiene un calor tibio\nQue aprende mi forma de vivir\n\n[Verse 2]\nNo llegas quebrando la calma\nLlegas para echar raíz\nVital como el primer aliento\nVerdad que, sin voz, sabe latir\n\n[Chorus]\nY yo entiendo tu idioma lento\nGramática de piel, urgente y presente\nDonde tu forma de ser acomoda\nTodo lo que vive dentro de mí\n\nHay manos que rozan la superficie\nLas tuyas van al fondo del mar\nNo piden permiso, solo enseñan\nEl camino justo para descansar\n\n[Bridge]\nSi el mundo se inclina y me aplasta\nY mi día se vuelve metal\nEres refugio sin paredes\nDonde el peso deja de empujar\n\n[Chorus / Outro]\nAprendí que hay bellezas ocultas\nQue no se miran, se deben honrar\nMujeres que no son pirotecnia\nSon faro, son puerto, son mar\n\nY en la forma en que caminas conmigo\nComo prometimos en el altar\nYo aprendo a vivir a tu ritmo\nDisfrutando la vida a tu lado\nYo aprendo a quedarme en calma\nY a estar junto a ti\n\n[End]\nMira lo que el tiempo ha hecho en mí\nDesde que aprendí a verte así`
      },
      { 
        title: "Quizás no lo sabías", 
        artist: "Ariel Romero", 
        audioUrl: dropboxRaw('https://www.dropbox.com/scl/fi/uu4cq3it6f4fqcz2v2xrj/4-Quiz-s-no-lo-sabias.mp3?rlkey=eaqygmvdvuqk3z60f26wu06t8&st=4kz8eqh3&dl=0'),
        lyrics: `[Verse 1]\nTienes una forma honesta\nDe mirar la realidad\nNo prometes lo imposible\nPero cumples de verdad\nHaces fácil lo correcto\nAunque cueste un poco más\nY sin darte cuenta enseñas\nCómo se debe caminar\n\n[Pre-Chorus]\nTal vez no lo ves en ti\nPero se nota al pasar\nDonde otros dudan o se rompen\nTú no sueltas, sabes estar\n\n[Chorus]\nY yo\nTe miro y lo entiendo\nEres más fuerte de lo que crees\nMás clara de lo que dices\nTienes una luz tranquila\nQue no pide atención\nY si el mundo no lo nota\nHoy lo digo yo\n\n[Verse 2]\nTienes manos que construyen\nSin hacer ruido al llegar\nUna paciencia valiente\nQue no se aprende en ningún lugar\nSabes cuidar lo importante\nSin dejar de soñar\nY haces que creer en el bien\nNo parezca ingenuidad\n\n[Pre-Chorus]\nTal vez nadie te enseñó\nA mirarte desde afuera\nPero hay verdad en tu forma\nY belleza en tu manera\n\n[Chorus]\nY yo\nTe miro y lo entiendo\nEres más firme de lo que ves\nMás grande de lo que imaginas\nTienes una luz tranquila\nQue ordena el corazón\nY si el mundo no lo dice\nHoy lo digo yo\n\n[Bridge]\nNo es solo amor lo que siento\nEs respeto y admiración\nEs saber que caminar contigo\nMe hace mejor\n\n[Final Chorus]\nY yo\nSi volviera a empezar de cero\nTe elegiría otra vez\nSin dudar ni un segundo\nPorque hay belleza en tu carácter\nY verdad en tu voz\nY amar así, con lo que eres\nSe siente nuevo\nComo la primera vez\n\n[Outro]\nTal vez no lo sabías\nTal vez nadie lo dijo\nPero cuando sonríes\nAsí te veo yo`
      },
      { 
        title: "Luz de mi sendero", 
        artist: "Ariel Romero", 
        audioUrl: dropboxRaw('https://www.dropbox.com/scl/fi/qm9zo934w025oazuzcyk2/5-Luz-de-mi-sendero.mp3?rlkey=4tb50g8d12byr1b8klul65lac&st=rsxvqkd5&dl=0'),
        lyrics: `**Verso 1**\nEres brisa en mi ventana,\nrisa clara de la aurora,\nun milagro de mañana\nque en mis brazos aún reposa.\nCon tus ojos de promesa\ny tu paso todavía,\nDios me dio la más perfecta\nrazón para cada día.\n\n**Estribillo**\nAilari Leonor, luz de mi sendero,\nnunca estarás sola, yo estaré contigo.\nHasta mi último aliento, te cuidaré,\ny en el bien te guiaré.\nCon la mano en la Palabra\ny el temor santo de Dios,\nte mostraré el camino\ncon ternura y con valor.\n\n**Verso 2**\nTe enseñaré a ver las estrellas\nno solo en el cielo azul,\nsino en cada buena huella\nque deje el amor en ti.\nQue el respeto sea tu escudo,\nla verdad tu canción,\ny que en lo alto siempre encuentres\nconsuelo y dirección.\n\n**Puente**\nY cuando seas adulta,\ny el mundo intente callarte,\nrecuerda que desde pequeña\naprendiste a caminar con fe.\nPorque el mismo Dios que me dio tu nombre,\nte sostiene con su eterno amor\n\n**Estribillo (repetición con ligera variación emocional)**\nAilari Leonor, luz de mi sendero,\naunque el tiempo me lleve,\nsiempre estaré contigo.\nHasta mi último aliento, te cuidaré,\ny en el bien te guiaré...\nCon la mano en la Palabra\ny el temor santo de Dios,\nte mostraré el camino\ncon ternura y con valor.\n\n**Cierre (susurrado o cantado muy suave):**\nMi niña... Dios en el cielo vela por ti.\nY yo, por ti, daría mil vidas....`
      },
      { 
        title: "Antes de verte", 
        artist: "Ariel Romero", 
        audioUrl: dropboxRaw('https://www.dropbox.com/scl/fi/eaf7uqsgm46tiax0vs6vw/6-Antes-de-verte.mp3?rlkey=tkrffbgqwqya0q00bnguk2dmm&st=5ijjf8qs&dl=0'),
        lyrics: `Llegaste sin avisar\nAntes de saber tu voz\nY ya estabas acomodando\nEl pulso del corazón\nTodavía no sé tu nombre\nNi tu forma de mirar\nPero hay algo en este silencio\nQue me enseña a esperar\n\n[Pre-Chorus]\nNo necesito verte\nPara saber quién vas a ser\nHay promesas en tu latido\nQue me hacen orar por ti\n\n[Chorus]\nY aquí estás\nAntes de llegar al mundo\nAntes de aprender a hablar\nYa me enseñas a confiar\nNo sé quién serás mañana\nPero sé lo esencial\nQue viniste con propósito\nY no por casualidad\n\n[Verse 2]\nTal vez rías como tu madre\nO camines como yo\nTal vez mires todo de frente\nO preguntes siempre más\nSea cual sea tu manera\nQuiero estar para escuchar\nPara mostrarte el camino\nY dejarte caminar\n\n[Pre-Chorus]\nNo vengo a escribir tu historia\nNi a decirte quién serás\nSolo a darte raíces firmes\nY espacio para volar\n\n[Chorus]\nY aquí estás\nAntes de llegar al mundo\nAntes de decir tu voz\nYa me cambias la razón\nNo sé quién serás mañana\nPero sé la verdad\nQue tu vida tiene sentido\nDesde antes de empezar\n\n[Bridge]\nSi alguna vez dudas\nO el miedo quiere entrar\nRecuerda que antes de verte\nYa te supimos amar\n\n[Final Chorus]\nY aquí estás\nPequeña vida esperada\nEnvuelta en fe y oración\nEn silencio y gratitud\nNo sé qué nombre llevarás\nPero sé lo esencial\nQue no caminas solo\nHay amor cuidando\nCada paso que darás\n\n[Outro]\nTodavía no te vemos\nPero ya estás aquí`
      },
      { 
        title: "Quedarse", 
        artist: "Ariel Romero", 
        audioUrl: dropboxRaw('https://www.dropbox.com/scl/fi/kv2qk6u8qva2vo46ue767/7-Quedarse.mp3?rlkey=59f32u2m5hnuafqutcak8wrel&st=eqkn8t1j&dl=0'),
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
    image: '/images/event-video.jpg', // Miniatura del video
    type: 'video',
    videoUrl: dropboxRaw('https://www.dropbox.com/scl/fi/sz5ugs4e4ft4fagptvkts/lv_0_20251224132333.mp4?rlkey=bxu21fuu7yf1q36tz1ua50rst&st=kmiephms&dl=0'),
    hint: 'Próximo: Prepárate para la extracción...',
  },
  {
    id: 'outing',
    time: '16:00',
    title: 'Track 06: La Extracción',
    lockedTitle: 'Coordenadas Subidas',
    description: 'El vehículo está esperando abajo. El destino es clasificado. Código de vestimenta: Icónico.',
    location: 'Calles de la Ciudad',
    image: '/images/event-outing.jpg',
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
    image: '/images/event-party.jpg',
    type: 'music',
    hint: 'Sistema recargando para el año 41...',
  }
];
