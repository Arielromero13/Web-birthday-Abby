
import { TimelineEvent, LobbyTrack } from './types';

export const EVENT_DATE_ISO = '2026-05-02';

// --- HELPER PARA DROPBOX ---
// Convierte enlaces de visualización (www) en enlaces de recurso directo (dl)
// y asegura que termine en dl=1 como solicitaste.
const db = (url: string) => {
  if (!url) return '';
  if (url.includes('dropbox.com')) {
    let newUrl = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    // Reemplazamos el parámetro final si existe para forzar dl=1
    newUrl = newUrl.replace('&dl=0', '&dl=1');
    return newUrl;
  }
  return url;
};

// --- ENLACES PROPORCIONADOS ---

// FOTOS (11 Imágenes proporcionadas)
// Asignamos nombres cortos F1..F11
const F1  = 'https://www.dropbox.com/scl/fi/fgt7owr1929uhu9quf7s7/DSC00825.jpg?rlkey=2suo1mrqc9rwahyl23c33jsgl&st=i5n9mghh&dl=0';
const F2  = 'https://www.dropbox.com/scl/fi/8akfqr80af7c191v6bbki/IMG_20181012_114144.jpg?rlkey=br76nll9ng61mudonzoen54bq&st=p12t9qrt&dl=0';
const F3  = 'https://www.dropbox.com/scl/fi/ewuhwl5l5k7ddampon3u2/IMG_20181012_131809.jpg?rlkey=fdz9dmtagts100x8hpgcpdflr&st=lg40yl3u&dl=0';
const F4  = 'https://www.dropbox.com/scl/fi/fzscef1djlzf1mqxz4uir/IMG_20190502_200637.jpg?rlkey=9fev1ir3quxp19dk0iqadar4n&st=g2ek3k88&dl=0';
const F5  = 'https://www.dropbox.com/scl/fi/2jl2dltoj9v0447fs7qzy/IMG-20151128-WA0006.jpg?rlkey=1jk0xvp32pyuijip2odd0fe1i&st=g1bpyx9w&dl=0';
const F6  = 'https://www.dropbox.com/scl/fi/p56n6t34532up9h2t25tm/IMG-20180706-WA0063.jpg?rlkey=5t55hclmy1m0zzt6ec8h8rybj&st=jeyqhwj0&dl=0';
const F7  = 'https://www.dropbox.com/scl/fi/gmez8u530jix8z41513ep/IMG-20240622-WA0020.jpg?rlkey=jgdgj4bkq2w0pmqhwloq03xqw&st=wxvvabwv&dl=0';
const F8  = 'https://www.dropbox.com/scl/fi/hxxz1cadp4x68jyweihl0/IMG-20260204-WA0011.jpg?rlkey=ba9sh2qp7rh9x01tv5ckpu78z&st=hltfaf6b&dl=0';
const F9  = 'https://www.dropbox.com/scl/fi/zl62ztx6ip6cxktprmtil/IMG-20260204-WA0012.jpg?rlkey=os2uaccs2k8vfcruj1zrtq1bo&st=36opp7em&dl=0';
const F10 = 'https://www.dropbox.com/scl/fi/qdvo3j8niqcbfc5wznvv2/IMG-20260204-WA0024.jpg?rlkey=hzczqtji23hrrvt3ji2f02p5p&st=q4ijuzmi&dl=0';
const F11 = 'https://www.dropbox.com/scl/fi/enupahk7sfrgy0ze18lok/Screenshot_20170417-190118.png?rlkey=75ewlolef1lhga1mleo42xk92&st=fdm6o6sh&dl=0';

// CANCIONES PLAYLIST (1-7)
const S1 = 'https://www.dropbox.com/scl/fi/urs8pcoqwnq8cbudjsx8k/1-seguiste-conmigo.mp3?rlkey=u4salako6za5xk1b0d5gtmkus&st=kk2skqn1&dl=0';
const S2 = 'https://www.dropbox.com/scl/fi/cjdjqa0v1rn6ijypepn87/2-porque-est-s.mp3?rlkey=636voyy8amcnf76zf1xcdbo7m&st=4xnsesqs&dl=0';
const S3 = 'https://www.dropbox.com/scl/fi/ryjv3etc672k3i80uns4y/3-mi-aliento.mp3?rlkey=d0nxzg1nny8y9y8f2nkerf8gi&st=3dasdbjx&dl=0';
const S4 = 'https://www.dropbox.com/scl/fi/uu4cq3it6f4fqcz2v2xrj/4-Quiz-s-no-lo-sabias.mp3?rlkey=eaqygmvdvuqk3z60f26wu06t8&st=4kz8eqh3&dl=0';
const S5 = 'https://www.dropbox.com/scl/fi/qm9zo934w025oazuzcyk2/5-Luz-de-mi-sendero.mp3?rlkey=4tb50g8d12byr1b8klul65lac&st=rsxvqkd5&dl=0';
const S6 = 'https://www.dropbox.com/scl/fi/eaf7uqsgm46tiax0vs6vw/6-Antes-de-verte.mp3?rlkey=tkrffbgqwqya0q00bnguk2dmm&st=5ijjf8qs&dl=0';
const S7 = 'https://www.dropbox.com/scl/fi/kv2qk6u8qva2vo46ue767/7-Quedarse.mp3?rlkey=59f32u2m5hnuafqutcak8wrel&st=eqkn8t1j&dl=0';

// INSTRUMENTALES LOBBY
const I_LUZ    = 'https://www.dropbox.com/scl/fi/v6bvoky0e6iotagbhatgl/Ailari-Leonor-Instrumental.mp3?rlkey=h2p5fpwu8pwcdndnv0655byyo&st=2tf1z2ql&dl=0';
const I_MUNECA = 'https://www.dropbox.com/scl/fi/26vqhh81z8j7nehrj501c/mu-eca-single-LP-Instrumental.mp3?rlkey=7nhpc1s9tfnrz45g4z40or857&st=0xbwdoyk&dl=0';
const I_PORQUE = 'https://www.dropbox.com/scl/fi/lg722hw45jkno44taam18/porque-est-s-V2-Instrumental.mp3?rlkey=i2g4xj1rcwd472im23in556bz&st=n01hy2tl&dl=0';
const I_QUIZAS = 'https://www.dropbox.com/scl/fi/hohlm8qzyss5vhd6tfdsv/quiz-s-no-lo-sabias-LP-Instrumental.mp3?rlkey=qcub6k6whw12k02lu1c3o6d2v&st=adtn4jdi&dl=0';

// VIDEO (No proporcionado en la lista, mantenemos local por seguridad, si tienes link de dropbox pégalo aquí)
const VIDEO_MAIN = 'images/video 1.mp4';


export const STANDBY_IMAGES = [
  db(F1), db(F2), db(F3), db(F4), db(F5), db(F6),
  db(F7), db(F8), db(F9), db(F10), db(F11), db(F1) // Repetimos F1 para completar 12
];

export const LOBBY_AUDIO_TRACKS: LobbyTrack[] = [
  { title: 'Luz de mi sendero (Instrumental)', audioUrl: db(I_LUZ) },
  { title: 'Mi aliento (Instrumental)', audioUrl: db(I_MUNECA) },
  { title: 'Porque estás (Instrumental)', audioUrl: db(I_PORQUE) },
  { title: 'Quizás no lo sabias (Instrumental)', audioUrl: db(I_QUIZAS) },
];

export const EVENTS_SCHEDULE: TimelineEvent[] = [
  {
    id: 'intro',
    time: '08:00',
    title: 'Track 01: El Despertar',
    lockedTitle: 'Inicialización del Sistema',
    description: 'Bienvenida a tus 40 años. El día comienza con lujo y una vista espectacular. Respira profundo, una nueva era comienza hoy con este desayuno especial.',
    location: 'Habitación Principal',
    image: db(F1), // DSC00825
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
    image: db(F5), // IMG-2015...
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
    image: db(F11), // Screenshot carta
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
    image: db(F6), // IMG-2018...
    type: 'playlist',
    playlist: [
      { 
        title: "Seguiste conmigo", 
        artist: "Ariel Romero", 
        audioUrl: db(S1),
        lyrics: `[Verse]\nNo sé decir cuándo empezó\nSolo sé que estabas ahí\nAntes de entender lo que venía\nAntes de aprender a cuidar\n\n[Verse]\nPasaron intentos\nPasaron errores\nPasaron años\n\n[Outro]\nY tú\nSeguiste`
      },
      { 
        title: "Porque estás", 
        artist: "Ariel Romero", 
        audioUrl: db(S2),
        lyrics: `[Verse 1]\nTrabajas sin pausa para que el día funcione\nTodo lo planeas, incluso lo que nadie ve\nSe nota cuando estás\nY mucho más cuando no estás\n\n[Verse 2]\nSabes la importancia de cada detalle\nLo que se dice y lo que no\nTu presencia pone orden\nY tu voz organiza el caos\n\n[Chorus]\nSe sostiene lo que tocás\nSin tener que explicarlo\nHay cosas que siguen en pie\nPorque estás, y eso basta\n\n[Outro]\nTal vez no lo sepan afuera\nPero aquí\nSe siente en mi alma lo sé`
      },
      { 
        title: "Mi aliento", 
        artist: "Ariel Romero", 
        audioUrl: db(S3),
        lyrics: `[Verse 1]\nCaminas sin pelear con las horas\nNi las empujas, ni las dejas ir\nTu silencio tiene un calor tibio\nQue aprende mi forma de vivir\n\n[Verse 2]\nNo llegas quebrando la calma\nLlegas para echar raíz\nVital como el primer aliento\nVerdad que, sin voz, sabe latir\n\n[Chorus]\nY yo entiendo tu idioma lento\nGramática de piel, urgente y presente\nDonde tu forma de ser acomoda\nTodo lo que vive dentro de mí\n\nHay manos que rozan la superficie\nLas tuyas van al fondo del mar\nNo piden permiso, solo enseñan\nEl camino justo para descansar\n\n[Bridge]\nSi el mundo se inclina y me aplasta\nY mi día se vuelve metal\nEres refugio sin paredes\nDonde el peso deja de empujar\n\n[Chorus / Outro]\nAprendí que hay bellezas ocultas\nQue no se miran, se deben honrar\nMujeres que no son pirotecnia\nSon faro, son puerto, son mar\n\nY en la forma en que caminas conmigo\nComo prometimos en el altar\nYo aprendo a vivir a tu ritmo\nDisfrutando la vida a tu lado\nYo aprendo a quedarme en calma\nY a estar junto a ti\n\n[End]\nMira lo que el tiempo ha hecho en mí\nDesde que aprendí a verte así`
      },
      { 
        title: "Quizás no lo sabías", 
        artist: "Ariel Romero", 
        audioUrl: db(S4),
        lyrics: `[Verse 1]\nTienes una forma honesta\nDe mirar la realidad\nNo prometes lo imposible\nPero cumples de verdad\nHaces fácil lo correcto\nAunque cueste un poco más\nY sin darte cuenta enseñas\nCómo se debe caminar\n\n[Pre-Chorus]\nTal vez no lo ves en ti\nPero se nota al pasar\nDonde otros dudan o se rompen\nTú no sueltas, sabes estar\n\n[Chorus]\nY yo\nTe miro y lo entiendo\nEres más fuerte de lo que crees\nMás clara de lo que dices\nTienes una luz tranquila\nQue no pide atención\nY si el mundo no lo nota\nHoy lo digo yo\n\n[Verse 2]\nTienes manos que construyen\nSin hacer ruido al llegar\nUna paciencia valiente\nQue no se aprende en ningún lugar\nSabes cuidar lo importante\nSin dejar de soñar\nY haces que creer en el bien\nNo parezca ingenuidad\n\n[Pre-Chorus]\nTal vez nadie te enseñó\nA mirarte desde afuera\nPero hay verdad en tu forma\nY belleza en tu manera\n\n[Chorus]\nY yo\nTe miro y lo entiendo\nEres más firme de lo que ves\nMás grande de lo que imaginas\nTienes una luz tranquila\nQue ordena el corazón\nY si el mundo no lo dice\nHoy lo digo yo\n\n[Bridge]\nNo es solo amor lo que siento\nEs respeto y admiración\nEs saber que caminar contigo\nMe hace mejor\n\n[Final Chorus]\nY yo\nSi volviera a empezar de cero\nTe elegiría otra vez\nSin dudar ni un segundo\nPorque hay belleza en tu carácter\nY verdad en tu voz\nY amar así, con lo que eres\nSe siente nuevo\nComo la primera vez\n\n[Outro]\nTal vez no lo sabías\nTal vez nadie lo dijo\nPero cuando sonríes\nAsí te veo yo`
      },
      { 
        title: "Luz de mi sendero", 
        artist: "Ariel Romero", 
        audioUrl: db(S5),
        lyrics: `**Verso 1**\nEres brisa en mi ventana,\nrisa clara de la aurora,\nun milagro de mañana\nque en mis brazos aún reposa.\nCon tus ojos de promesa\ny tu paso todavía,\nDios me dio la más perfecta\nrazón para cada día.\n\n**Estribillo**\nAilari Leonor, luz de mi sendero,\nnunca estarás sola, yo estaré contigo.\nHasta mi último aliento, te cuidaré,\ny en el bien te guiaré.\nCon la mano en la Palabra\ny el temor santo de Dios,\nte mostraré el camino\ncon ternura y con valor.\n\n**Verso 2**\nTe enseñaré a ver las estrellas\nno solo en el cielo azul,\nsino en cada buena huella\nque deje el amor en ti.\nQue el respeto sea tu escudo,\nla verdad tu canción,\ny que en lo alto siempre encuentres\nconsuelo y dirección.\n\n**Puente**\nY cuando seas adulta,\ny el mundo intente callarte,\nrecuerda que desde pequeña\naprendiste a caminar con fe.\nPorque el mismo Dios que me dio tu nombre,\nte sostiene con su eterno amor\n\n**Estribillo (repetición con ligera variación emocional)**\nAilari Leonor, luz de mi sendero,\naunque el tiempo me lleve,\nsiempre estaré contigo.\nHasta mi último aliento, te cuidaré,\ny en el bien te guiaré...\nCon la mano en la Palabra\ny el temor santo de Dios,\nte mostraré el camino\ncon ternura y con valor.\n\n**Cierre (susurrado o cantado muy suave):**\nMi niña... Dios en el cielo vela por ti.\nY yo, por ti, daría mil vidas....`
      },
      { 
        title: "Antes de verte", 
        artist: "Ariel Romero", 
        audioUrl: db(S6),
        lyrics: `Llegaste sin avisar\nAntes de saber tu voz\nY ya estabas acomodando\nEl pulso del corazón\nTodavía no sé tu nombre\nNi tu forma de mirar\nPero hay algo en este silencio\nQue me enseña a esperar\n\n[Pre-Chorus]\nNo necesito verte\nPara saber quién vas a ser\nHay promesas en tu latido\nQue me hacen orar por ti\n\n[Chorus]\nY aquí estás\nAntes de llegar al mundo\nAntes de aprender a hablar\nYa me enseñas a confiar\nNo sé quién serás mañana\nPero sé lo esencial\nQue viniste con propósito\nY no por casualidad\n\n[Verse 2]\nTal vez rías como tu madre\nO camines como yo\nTal vez mires todo de frente\nO preguntes siempre más\nSea cual sea tu manera\nQuiero estar para escuchar\nPara mostrarte el camino\nY dejarte caminar\n\n[Pre-Chorus]\nNo vengo a escribir tu historia\nNi a decirte quién serás\nSolo a darte raíces firmes\nY espacio para volar\n\n[Chorus]\nY aquí estás\nAntes de llegar al mundo\nAntes de decir tu voz\nYa me cambias la razón\nNo sé quién serás mañana\nPero sé la verdad\nQue tu vida tiene sentido\nDesde antes de empezar\n\n[Bridge]\nSi alguna vez dudas\nO el miedo quiere entrar\nRecuerda que antes de verte\nYa te supimos amar\n\n[Final Chorus]\nY aquí estás\nPequeña vida esperada\nEnvuelta en fe y oración\nEn silencio y gratitud\nNo sé qué nombre llevarás\nPero sé lo esencial\nQue no caminas solo\nHay amor cuidando\nCada paso que darás\n\n[Outro]\nTodavía no te vemos\nPero ya estás aquí`
      },
      { 
        title: "Quedarse", 
        artist: "Ariel Romero", 
        audioUrl: db(S7),
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
    image: db(F3), // IMG_2018...
    type: 'video',
    videoUrl: db(VIDEO_MAIN),
    hint: 'Próximo: Prepárate para la extracción...',
  },
  {
    id: 'outing',
    time: '16:00',
    title: 'Track 06: La Extracción',
    lockedTitle: 'Coordenadas Subidas',
    description: 'El vehículo está esperando abajo. El destino es clasificado. Código de vestimenta: Icónico.',
    location: 'Calles de la Ciudad',
    image: db(F7), // IMG-2024...
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
    image: db(F8), // IMG-2026...
    type: 'music',
    hint: 'Sistema recargando para el año 41...',
  }
];
