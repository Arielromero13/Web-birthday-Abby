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
    <div className="h-20 bg-vinyl-gray border-t border-white/10 flex items-center justify-between px-6 md:px-12 relative z-30 shadow-2xl">
      
      {/* Track Info (Desktop) */}
      <div className="hidden md:flex flex-col w-1/3">
        <span className="text-[10px] text-neon-red font-mono uppercase tracking-widest">Digital Master</span>
        <span className="text-sm font-bold text-white truncate">{title}</span>
      </div>

      {/* Main Buttons */}
      <div className="flex items-center justify-center gap-6 flex-1">
        <button 
          onClick={onPrev}
          disabled={!canPrev}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center border transition-all
            ${canPrev 
              ? 'border-neutral-600 bg-neutral-800 text-white hover:border-white hover:bg-neutral-700' 
              : 'border-transparent bg-neutral-900 text-neutral-700 cursor-not-allowed'}
          `}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11 19V5l-8 7 8 7zm9 0V5l-8 7 8 7z"/></svg>
        </button>

        {/* Play/Pause Main Button */}
        <button 
          onClick={onTogglePlay}
          className={`
            w-16 h-16 rounded-full bg-gradient-to-br from-neon-red to-pink-600 flex items-center justify-center 
            shadow-[0_0_20px_rgba(236,19,55,0.4)] border-4 border-vinyl-gray transform active:scale-95 transition-transform
            hover:shadow-[0_0_30px_rgba(236,19,55,0.6)]
          `}
        >
          {isPlaying ? (
             <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
             <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        <button 
          onClick={onNext}
          disabled={!canNext}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center border transition-all
            ${canNext 
              ? 'border-neutral-600 bg-neutral-800 text-white hover:border-white hover:bg-neutral-700' 
              : 'border-transparent bg-neutral-900 text-neutral-700 cursor-not-allowed'}
          `}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 19V5l8 7-8 7zm9 0V5l8 7-8 7z"/></svg>
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
