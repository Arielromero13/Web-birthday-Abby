
import React from 'react';

interface ControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  isPlaying: boolean;
  canPrev: boolean;
  canNext: boolean;
  title: string;
}

const Controls: React.FC<ControlsProps> = ({ 
  onPrev, 
  onNext, 
  onTogglePlay, 
  isPlaying, 
  canPrev, 
  canNext, 
  title 
}) => {
  return (
    // CAMBIO: border-b en lugar de border-t, z-40 para estar sobre el contenido
    <div className="h-16 md:h-24 bg-vinyl-gray border-b border-white/10 flex items-center justify-between px-4 md:px-12 relative z-40 shadow-2xl flex-none order-first">
      
      {/* Track Info (Desktop & Tablet Large) */}
      <div className="hidden md:flex flex-col w-1/3">
        <span className="text-[10px] text-neon-red font-mono uppercase tracking-widest">Digital Master</span>
        <span className="text-sm font-bold text-white truncate max-w-[200px] lg:max-w-xs">{title}</span>
      </div>

      {/* Track Info (Mobile - Simplificado) - AHORA ABAJO de los controles en móvil para no chocar con el borde superior */}
      <div className="md:hidden absolute bottom-0 left-0 w-full -mb-5 flex justify-center pointer-events-none z-0">
         <div className="bg-black/80 backdrop-blur text-[10px] px-3 py-0.5 rounded-b border-b border-x border-white/10 truncate max-w-[80%] text-gray-300 font-mono shadow-lg">
            {title}
         </div>
      </div>

      {/* Main Buttons */}
      <div className="flex items-center justify-center gap-4 md:gap-8 flex-1 relative z-10">
        <button 
          onClick={onPrev}
          disabled={!canPrev}
          className={`
            w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all active:scale-95
            ${canPrev 
              ? 'border-neutral-600 bg-neutral-800 text-white hover:border-white hover:bg-neutral-700' 
              : 'border-transparent bg-neutral-900 text-neutral-700 cursor-not-allowed'}
          `}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11 19V5l-8 7 8 7zm9 0V5l-8 7 8 7z"/></svg>
        </button>

        {/* Play/Pause Main Button */}
        <button 
          onClick={onTogglePlay}
          className={`
            w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-neon-red to-pink-600 flex items-center justify-center 
            shadow-[0_0_20px_rgba(236,19,55,0.4)] border-4 border-vinyl-gray transform active:scale-95 transition-transform
            hover:shadow-[0_0_30px_rgba(236,19,55,0.6)]
          `}
        >
          {isPlaying ? (
             <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
             <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        <button 
          onClick={onNext}
          disabled={!canNext}
          className={`
            w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all active:scale-95
            ${canNext 
              ? 'border-neutral-600 bg-neutral-800 text-white hover:border-white hover:bg-neutral-700' 
              : 'border-transparent bg-neutral-900 text-neutral-700 cursor-not-allowed'}
          `}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 19V5l8 7-8 7zm9 0V5l8 7-8 7z"/></svg>
        </button>
      </div>

      {/* Visualizer Animation */}
      <div className="hidden md:flex w-1/3 items-center justify-end gap-1 h-8">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className={`w-1 bg-neon-red rounded-full ${isPlaying ? 'animate-pulse-fast' : 'h-1'}`}
            style={{
              height: isPlaying ? `${Math.random() * 100}%` : '4px',
              animationDelay: `${i * 0.1}s`,
              opacity: 0.6,
              transition: 'height 0.3s ease'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Controls;
