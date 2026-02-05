
import React, { useRef, useEffect, useState } from 'react';
import { TimelineEvent } from '../types';
import { STANDBY_IMAGES, LOBBY_AUDIO_TRACKS } from '../constants';

interface EventViewerProps {
  event: TimelineEvent | null;
  isPlaying: boolean;
  onAudioEnded: () => void;
  globalTrackIndex: number;
  activePlaylistIndex: number;
  onSelectPlaylistTrack: (index: number) => void;
}

const EventViewer: React.FC<EventViewerProps> = ({ 
  event, 
  isPlaying, 
  onAudioEnded, 
  globalTrackIndex,
  activePlaylistIndex,
  onSelectPlaylistTrack
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false); 
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Carrusel de fondo: Mantenemos todas las imágenes cargadas para transiciones suaves
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % STANDBY_IMAGES.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

  // Control de Audio
  const isPlaylist = event?.type === 'playlist';
  const audioSrc = isPlaylist 
    ? event.playlist?.[activePlaylistIndex]?.audioUrl 
    : LOBBY_AUDIO_TRACKS[globalTrackIndex].audioUrl;

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && audioSrc) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioSrc]);

  useEffect(() => {
    setVideoLoaded(false);
  }, [event?.id]);

  const currentTrack = isPlaylist ? event.playlist?.[activePlaylistIndex] : null;

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col bg-vinyl-black">
      
      {/* 
         BACKGROUND SYSTEM REFACTORIZADO 
         1. Capa Ambiental: Imagen desenfocada que llena toda la pantalla (evita bordes negros vacíos).
         2. Capa Contenida: La imagen nítida centrada con "object-contain" para respetar límites.
      */}
      
      {/* 1. Fondo Ambiental (Blur) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {STANDBY_IMAGES.map((img, index) => (
          <div 
            key={`blur-${index}`}
            className={`absolute inset-0 bg-cover bg-center blur-3xl scale-110 transition-opacity duration-[2000ms] ease-in-out ${index === currentBgIndex ? 'opacity-30' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Textura de ruido suave */}
        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay" />
      </div>

      {/* 2. Carrusel Principal (Marco Contenido) */}
      <div className={`absolute inset-0 z-0 flex items-center justify-center transition-all duration-1000 ${event ? 'scale-95 opacity-20 blur-sm' : 'scale-100 opacity-100'}`}>
         {/* Contenedor con límites máximos para PC */}
         <div className="relative w-full h-full p-6 md:p-12 lg:p-16 flex items-center justify-center">
            {STANDBY_IMAGES.map((img, index) => (
              <div 
                key={`main-${index}`}
                className={`
                  absolute inset-6 md:inset-12 lg:inset-16 
                  bg-contain bg-center bg-no-repeat 
                  transition-all duration-[2000ms] ease-in-out
                  ${index === currentBgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}
                style={{ backgroundImage: `url(${img})` }}
              >
                 {/* Sombra proyectada para dar efecto de "marco" flotante */}
                 <div className={`w-full h-full shadow-2xl transition-opacity duration-[2000ms] ${index === currentBgIndex ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            ))}
         </div>
      </div>

      {/* 3. Overlay Oscuro para Modo Evento */}
      <div className={`absolute inset-0 bg-black z-0 transition-opacity duration-700 pointer-events-none ${event ? 'opacity-90' : 'opacity-0'}`} />
      
      <audio ref={audioRef} src={audioSrc} onEnded={onAudioEnded} />
      
      {/* CONTENIDO (Z-INDEX SUPERIOR) */}
      <div className="relative z-10 flex-1 flex flex-col items-center p-4 md:p-12 overflow-y-auto w-full custom-scrollbar">
        
        {!event ? (
          <div className="w-full h-full flex flex-col justify-end items-center pb-32 animate-fade-in pointer-events-none">
            {/* El pointer-events-none permite ver la imagen "detrás" sin bloquear clicks si hubiera interactividad, 
                aunque aquí el contenido es visual. El texto tiene pointer-events-auto si fuera necesario. */}
            <div className="w-full max-w-lg text-center bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto">
              <h2 className="font-display text-4xl text-white tracking-widest uppercase text-shadow-glow">Esperando Señal</h2>
              <p className="font-mono text-neon-red mt-2 tracking-widest text-sm animate-pulse uppercase">Radio Global Online</p>
              <div className="mt-4 text-gray-400 font-mono text-[10px] uppercase tracking-[0.2em]">
                 Frecuencia: {LOBBY_AUDIO_TRACKS[globalTrackIndex].title}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center animate-fade-in pb-20 md:pb-0">
            
            {/* Cabecera de Evento */}
            <div className="w-full max-w-5xl mb-6 md:mb-8 flex justify-between items-end border-b border-white/10 pb-4">
               <div>
                  <span className="font-mono text-neon-blue text-[10px] tracking-[0.3em] uppercase">Abigail Vol. 40 • Mission Timeline</span>
                  <h1 className="text-2xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">{event.title}</h1>
               </div>
               <div className="font-mono text-xs md:text-sm text-gray-500 bg-white/5 px-2 md:px-3 py-1 rounded border border-white/10 whitespace-nowrap ml-4">{event.time}</div>
            </div>

            {/* CONTENIDO SEGÚN TIPO */}
            {event.type === 'playlist' ? (
              <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
                {/* Lista de tracks */}
                <div className="lg:w-1/3 flex flex-col gap-4">
                  <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="p-4 border-b border-white/5 bg-white/5">
                      <h3 className="font-display text-sm text-white tracking-widest uppercase">Master Recordings</h3>
                    </div>
                    <div className="divide-y divide-white/5 max-h-[30vh] lg:max-h-[50vh] overflow-y-auto custom-scrollbar">
                      {event.playlist?.map((track, idx) => (
                        <button key={idx} onClick={() => onSelectPlaylistTrack(idx)}
                          className={`w-full flex items-center p-4 hover:bg-white/10 transition-colors text-left ${activePlaylistIndex === idx ? 'bg-white/10' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0 font-mono text-xs ${activePlaylistIndex === idx ? 'bg-neon-red text-white' : 'bg-gray-800 text-gray-400'}`}>
                            {idx + 1}
                          </div>
                          <div className="truncate">
                            <div className={`font-bold text-sm truncate ${activePlaylistIndex === idx ? 'text-neon-red' : 'text-gray-100'}`}>{track.title}</div>
                            <div className="text-[10px] text-gray-500 uppercase font-mono">{track.artist}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Hint visible en Playlist */}
                  <div className="p-5 bg-neon-blue/5 border border-neon-blue/20 rounded-xl">
                     <p className="text-[10px] font-mono text-neon-blue uppercase mb-2 tracking-widest">Pista de Desbloqueo:</p>
                     <p className="text-sm text-gray-300 italic font-light leading-relaxed">"{event.hint}"</p>
                  </div>
                </div>

                {/* Visor de Letras */}
                <div className="lg:w-2/3 bg-[#fcfbf7] text-neutral-800 rounded-sm shadow-2xl border-x-[4px] md:border-x-[12px] border-white/10 relative overflow-hidden">
                   <div className="p-6 md:p-12 overflow-y-auto max-h-[50vh] md:max-h-[70vh] custom-scrollbar-light">
                      <div className="border-b border-neutral-200 pb-6 mb-8">
                         <h2 className="font-display font-black text-2xl md:text-4xl uppercase tracking-tighter text-neutral-900 leading-none">{currentTrack?.title}</h2>
                         <p className="font-mono text-xs text-neutral-400 mt-2 uppercase tracking-widest">{currentTrack?.artist} • Studio Anniversary Mix</p>
                      </div>
                      <div className="font-serif text-lg md:text-2xl leading-relaxed whitespace-pre-line opacity-90 text-neutral-700 italic">
                         {currentTrack?.lyrics || "Esta pista es una pieza instrumental compuesta para este momento."}
                      </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                 {/* Contenedor Visual (Imagen/Video) */}
                 <div className="relative mb-8 w-full max-w-5xl flex justify-center">
                    {event.type === 'video' ? (
                       <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black">
                          {videoLoaded ? (
                             <video src={event.videoUrl} controls autoPlay className="w-full h-full object-contain" playsInline />
                          ) : (
                             <div className="absolute inset-0 bg-cover bg-center flex items-center justify-center cursor-pointer group" 
                                  style={{backgroundImage: `url(${event.image})`}} onClick={() => setVideoLoaded(true)}>
                               <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                               <div className="z-10 flex flex-col items-center gap-4">
                                  <button className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-neon-red/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 md:w-12 md:h-12 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                  </button>
                                  <span className="font-mono text-xs text-white uppercase tracking-widest animate-pulse">Desencriptar Archivo Visual</span>
                               </div>
                             </div>
                          )}
                       </div>
                    ) : (
                       <div className="relative flex flex-col items-center w-full">
                          <img 
                            src={event.image} 
                            className="w-auto h-auto max-w-full md:max-w-3xl max-h-[45vh] md:max-h-[65vh] object-contain rounded-2xl shadow-2xl border border-white/20 bg-black/50" 
                            alt={event.title}
                          />
                          
                          {event.type === 'letter' && (
                             <div className="mt-6 md:mt-8 bg-[#e3dcd2] text-black p-6 md:p-8 rounded shadow-2xl w-full max-w-xl md:max-w-2xl border-t-8 border-neon-red transform md:-rotate-1">
                                <p className="font-serif italic text-lg md:text-2xl leading-relaxed text-neutral-800">"{event.description}"</p>
                             </div>
                          )}
                       </div>
                    )}
                 </div>

                 {event.type !== 'letter' && (
                    <div className="max-w-3xl w-full text-center space-y-6 md:space-y-8">
                      <p className="text-lg md:text-2xl text-gray-200 font-light leading-relaxed px-4">{event.description}</p>
                      
                      {/* Hint del Sistema (Pista) */}
                      <div className="inline-block w-full max-w-lg bg-black/40 border border-white/10 p-4 md:p-6 rounded-xl text-left shadow-xl backdrop-blur-sm mx-auto">
                        <div className="flex items-center gap-3 mb-3">
                           <div className="w-3 h-3 rounded-full bg-neon-blue animate-pulse shadow-[0_0_8px_#00f3ff]" />
                           <span className="text-xs font-mono text-neon-blue uppercase tracking-[0.3em] font-bold">Protocolo de Búsqueda</span>
                        </div>
                        <p className="text-sm md:text-base text-gray-400 font-mono italic leading-relaxed">"{event.hint}"</p>
                      </div>
                    </div>
                 )}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .text-shadow-glow { text-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
        .custom-scrollbar-light::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb { background: #d1d1d1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default EventViewer;
