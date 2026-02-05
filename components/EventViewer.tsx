
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

  // Carrusel de fondo
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
    // CAMBIO: order-1 en móvil (arriba), md:order-none (derecha/normal en desktop).
    <div className="relative overflow-hidden flex flex-col bg-vinyl-black order-1 md:order-none flex-1 h-full w-full border-b md:border-b-0 md:border-l border-white/10">
      
      {/* 
         BACKGROUND SYSTEM
      */}
      
      {/* 1. Fondo Ambiental (Blur) - Solo visible cuando hay evento activo o para dar profundidad */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {STANDBY_IMAGES.map((img, index) => (
          <div 
            key={`blur-${index}`}
            className={`absolute inset-0 bg-cover bg-center blur-3xl scale-110 transition-opacity duration-[2000ms] ease-in-out ${index === currentBgIndex ? 'opacity-30' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay" />
      </div>

      {/* 2. Carrusel Principal (LOBBY MODE) */}
      {/* CAMBIO: Lógica para que en modo Lobby (!event) la imagen sea bg-cover (Fill) */}
      <div className={`absolute inset-0 z-0 flex items-center justify-center transition-all duration-1000 ${event ? 'scale-95 opacity-20 blur-sm' : 'scale-100 opacity-100'}`}>
         {/* En móvil inset-0 para aprovechar cada pixel, en desktop marco elegante si hay evento */}
         <div className={`relative w-full h-full flex items-center justify-center ${event ? 'p-0 md:p-12 lg:p-16' : 'p-0'}`}>
            {STANDBY_IMAGES.map((img, index) => (
              <div 
                key={`main-${index}`}
                className={`
                  absolute 
                  ${event ? 'inset-0 md:inset-12 lg:inset-16 bg-contain' : 'inset-0 bg-cover'} 
                  bg-center bg-no-repeat 
                  transition-all duration-[2000ms] ease-in-out
                  ${index === currentBgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                `}
                style={{ backgroundImage: `url(${img})` }}
              >
                 {/* Sombra interna para legibilidad en modo fill */}
                 {!event && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
                 )}
                 
                 {/* Marco decorativo solo en desktop si hay evento */}
                 <div className={`w-full h-full shadow-2xl transition-opacity duration-[2000ms] hidden md:block ${index === currentBgIndex ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            ))}
         </div>
      </div>

      {/* 3. Overlay Oscuro (Solo activo cuando hay un evento seleccionado para oscurecer el fondo) */}
      <div className={`absolute inset-0 bg-black z-0 transition-opacity duration-700 pointer-events-none ${event ? 'opacity-90' : 'opacity-0'}`} />
      
      <audio ref={audioRef} src={audioSrc} onEnded={onAudioEnded} />
      
      {/* CONTENIDO PRINCIPAL SCROLLABLE */}
      {/* Padding reducido en móvil */}
      <div className="relative z-10 flex-1 flex flex-col items-center p-2 md:p-12 overflow-y-auto w-full custom-scrollbar">
        
        {!event ? (
          // CAMBIO: justify-end para mover el mensaje abajo, pb-8 para separarlo del borde/sidebar
          <div className="w-full h-full flex flex-col justify-end items-center animate-fade-in pointer-events-none pb-8 md:pb-12">
            <div className="w-[95%] md:w-full max-w-lg text-center bg-black/30 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto">
              {/* CAMBIO: Textos actualizados para mayor expectativa */}
              <div className="flex justify-center mb-3">
                 <div className="w-12 h-1 bg-neon-red rounded-full animate-pulse shadow-[0_0_10px_#ff003c]" />
              </div>
              
              <h2 className="font-display text-2xl md:text-4xl text-white tracking-widest uppercase text-shadow-glow leading-none mb-2">
                Experiencia Vol. 40
              </h2>
              
              <p className="font-mono text-neon-blue/80 tracking-widest text-[10px] md:text-sm uppercase mb-4">
                Sincronizando Memorias...
              </p>
              
              <div className="border-t border-white/10 pt-3 mt-2">
                <p className="text-gray-300 font-sans text-xs md:text-sm font-light leading-relaxed">
                  "Todo está listo para celebrar tu historia. Espera la señal para comenzar."
                </p>
                <div className="mt-3 text-neutral-500 font-mono text-[9px] uppercase tracking-[0.2em] animate-pulse">
                   Audio Actual: {LOBBY_AUDIO_TRACKS[globalTrackIndex].title}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center animate-fade-in pb-10">
            
            {/* Cabecera Compacta */}
            <div className="w-full max-w-5xl mb-2 md:mb-8 flex flex-col md:flex-row justify-between md:items-end border-b border-white/10 pb-2 md:pb-4 gap-1">
               <div className="text-center md:text-left">
                  <span className="font-mono text-neon-blue text-[8px] md:text-[10px] tracking-[0.3em] uppercase block mb-1">Mission Timeline</span>
                  <h1 className="text-xl md:text-4xl font-display font-bold text-white uppercase tracking-tight leading-none">{event.title}</h1>
               </div>
               <div className="self-center md:self-auto font-mono text-[9px] md:text-sm text-gray-400 bg-white/5 px-2 md:px-3 py-0.5 rounded border border-white/10 w-fit mt-1 md:mt-0">{event.time}</div>
            </div>

            {/* CONTENIDO SEGÚN TIPO */}
            {event.type === 'playlist' ? (
              <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-3 md:gap-8 h-full">
                {/* 
                   Lista de tracks (Playlist) 
                   Móvil: Max-Height restringido para ver letras abajo.
                */}
                <div className="lg:w-1/3 flex flex-col gap-2 md:gap-4 shrink-0">
                  <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="p-2 border-b border-white/5 bg-white/5 flex justify-between items-center">
                      <h3 className="font-display text-[10px] md:text-sm text-white tracking-widest uppercase">Select Track</h3>
                      <span className="text-[9px] text-neon-red font-mono">{activePlaylistIndex + 1}/{event.playlist?.length}</span>
                    </div>
                    {/* Altura muy controlada en móvil: max-h-[140px] para que no ocupe toda la pantalla */}
                    <div className="divide-y divide-white/5 max-h-[140px] lg:max-h-[50vh] overflow-y-auto custom-scrollbar">
                      {event.playlist?.map((track, idx) => (
                        <button key={idx} onClick={() => onSelectPlaylistTrack(idx)}
                          className={`w-full flex items-center p-2 md:p-4 hover:bg-white/10 transition-colors text-left ${activePlaylistIndex === idx ? 'bg-white/10' : ''}`}>
                          <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-2 md:mr-3 shrink-0 font-mono text-[9px] md:text-xs ${activePlaylistIndex === idx ? 'bg-neon-red text-white' : 'bg-gray-800 text-gray-400'}`}>
                            {idx + 1}
                          </div>
                          <div className="truncate min-w-0">
                            <div className={`font-bold text-xs md:text-sm truncate ${activePlaylistIndex === idx ? 'text-neon-red' : 'text-gray-100'}`}>{track.title}</div>
                            <div className="text-[8px] md:text-[10px] text-gray-500 uppercase font-mono truncate">{track.artist}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visor de Letras (Ocupa el resto) */}
                <div className="lg:w-2/3 bg-[#fcfbf7] text-neutral-800 rounded-lg shadow-2xl border-l-[4px] md:border-l-[12px] border-white/10 relative overflow-hidden flex-1 min-h-[300px]">
                   <div className="p-4 md:p-12 overflow-y-auto h-full custom-scrollbar-light absolute inset-0">
                      <div className="border-b border-neutral-200 pb-2 mb-3 md:pb-6 md:mb-8 sticky top-0 bg-[#fcfbf7]/95 backdrop-blur z-10">
                         <h2 className="font-display font-black text-lg md:text-4xl uppercase tracking-tighter text-neutral-900 leading-none">{currentTrack?.title}</h2>
                         <p className="font-mono text-[9px] md:text-xs text-neutral-400 mt-1 uppercase tracking-widest">{currentTrack?.artist}</p>
                      </div>
                      <div className="font-serif text-sm md:text-2xl leading-relaxed whitespace-pre-line opacity-90 text-neutral-700 italic pb-12">
                         {currentTrack?.lyrics || "Instrumental."}
                      </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                 {/* Contenedor Visual (Imagen/Video) */}
                 <div className="relative mb-4 md:mb-8 w-full max-w-5xl flex justify-center">
                    {event.type === 'video' ? (
                       <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black">
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
                                  <span className="font-mono text-xs text-white uppercase tracking-widest animate-pulse">Reproducir</span>
                               </div>
                             </div>
                          )}
                       </div>
                    ) : (
                       <div className="relative flex flex-col items-center w-full">
                          {/* 
                             CAMBIO: max-h-[20vh] en móvil para reducir AÚN MÁS el tamaño visual de la foto
                             y asegurar que el texto sea el protagonista en la parte inferior.
                          */}
                          <img 
                            src={event.image} 
                            className="w-auto h-auto max-w-full md:max-w-3xl max-h-[20vh] md:max-h-[50vh] object-contain rounded-xl md:rounded-2xl shadow-2xl border border-white/20 bg-black/50" 
                            alt={event.title}
                          />
                          
                          {event.type === 'letter' && (
                             <div className="mt-4 md:mt-8 bg-[#e3dcd2] text-black p-4 md:p-8 rounded shadow-2xl w-full max-w-xl md:max-w-2xl border-t-8 border-neon-red transform md:-rotate-1">
                                <p className="font-serif italic text-sm md:text-2xl leading-relaxed text-neutral-800">"{event.description}"</p>
                             </div>
                          )}
                       </div>
                    )}
                 </div>

                 {event.type !== 'letter' && (
                    <div className="max-w-3xl w-full text-center space-y-4 md:space-y-8 pb-4">
                      <p className="text-sm md:text-2xl text-gray-200 font-light leading-relaxed px-2">{event.description}</p>
                      
                      {/* Hint del Sistema (Pista) */}
                      <div className="inline-block w-[95%] md:w-full max-w-lg bg-black/40 border border-white/10 p-3 md:p-4 rounded-xl text-left shadow-xl backdrop-blur-sm mx-auto">
                        <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                           <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-neon-blue animate-pulse shadow-[0_0_8px_#00f3ff]" />
                           <span className="text-[9px] md:text-xs font-mono text-neon-blue uppercase tracking-[0.3em] font-bold">Protocolo</span>
                        </div>
                        <p className="text-[11px] md:text-base text-gray-400 font-mono italic leading-relaxed">"{event.hint}"</p>
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
        .custom-scrollbar-light::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb { background: #d1d1d1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default EventViewer;
