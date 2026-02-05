
import React from 'react';
import { TimelineEvent } from '../types';
import Countdown from './Countdown';

interface SidebarProps {
  schedule: TimelineEvent[];
  unlockedIds: string[];
  currentId: string | null; 
  onSelectEvent: (index: number) => void;
  onSelectLobby: () => void; 
  nextLockedEvent: TimelineEvent | undefined;
  isTestMode?: boolean;
  onToggleTestMode?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  schedule, 
  unlockedIds, 
  currentId, 
  onSelectEvent,
  onSelectLobby,
  nextLockedEvent,
  isTestMode,
  onToggleTestMode
}) => {
  const currentEvent = schedule.find(e => e.id === currentId);

  return (
    // CAMBIO: h-[35vh] en móvil para permitir ver el visor abajo, md:h-full en desktop
    <aside className="w-full md:w-80 h-[35vh] md:h-full flex flex-col glass-panel border-r border-white/10 relative z-20 flex-none">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-white/10 bg-vinyl-black/80 flex-none">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-display font-black text-2xl md:text-3xl tracking-tighter text-white leading-none">
              ABIGAIL <span className="text-neon-red">VOL. 40</span>
            </h1>
            <p className="font-mono text-[9px] text-neutral-500 mt-2 tracking-[0.2em] uppercase">
              Digital Experience
            </p>
          </div>
          
          {/* Botón de Test sutil */}
          {onToggleTestMode && (
            <button 
              onClick={onToggleTestMode}
              className={`p-2 rounded border transition-colors ${isTestMode ? 'bg-neon-red/20 border-neon-red text-neon-red' : 'bg-white/5 border-white/10 text-neutral-600'}`}
              title="Alternar Modo Test"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
            </button>
          )}
        </div>
      </div>

      {/* Tracklist */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        
        <div
          onClick={onSelectLobby}
          className={`
            group relative p-3 md:p-4 rounded-md border transition-all duration-300 cursor-pointer
            ${currentId === null 
              ? 'bg-white/10 border-neon-blue/50 shadow-[0_0_15px_rgba(0,243,255,0.05)]' 
              : 'border-transparent hover:bg-white/5'}
          `}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`font-mono text-[10px] ${currentId === null ? 'text-neon-blue' : 'text-neutral-500'}`}>
              00:00
            </span>
          </div>
          <h3 className={`font-bold text-xs md:text-sm ${currentId === null ? 'text-white' : 'text-gray-400'}`}>
            PORTADA / LOBBY
          </h3>
        </div>

        <div className="h-px bg-white/10 my-2 mx-2"></div>

        {schedule.map((event, index) => {
          const isUnlocked = unlockedIds.includes(event.id);
          const isActive = event.id === currentId;
          
          return (
            <div
              key={event.id}
              onClick={() => isUnlocked && onSelectEvent(index)}
              className={`
                group relative p-3 md:p-4 rounded-md border transition-all duration-300
                ${isUnlocked ? 'cursor-pointer hover:bg-white/5' : 'cursor-not-allowed opacity-40'}
                ${isActive ? 'bg-white/10 border-neon-red/50 shadow-[0_0_15px_rgba(255,0,60,0.05)]' : 'border-transparent'}
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-mono text-[10px] ${isActive ? 'text-neon-red' : 'text-neutral-500'}`}>
                  {event.time}
                </span>
                {isActive && (
                  <span className="flex items-center gap-1 text-neon-red animate-pulse text-[9px] font-bold tracking-widest">
                    ACTIVO
                  </span>
                )}
              </div>
              <h3 className={`font-bold text-xs md:text-sm truncate ${isUnlocked ? 'text-gray-200' : 'text-gray-600 font-mono italic'}`}>
                {isUnlocked ? event.title : 'Segmento Bloqueado'}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Pie de Sidebar con Hint Prominente */}
      <div className="p-4 md:p-6 border-t border-white/10 bg-black/60 backdrop-blur-md flex-none hidden md:block">
        <p className="text-[10px] text-neutral-500 font-mono mb-3 uppercase tracking-widest">
          Siguiente Objetivo
        </p>
        
        {nextLockedEvent && !isTestMode ? (
          <div className="space-y-4">
            <Countdown targetTime={nextLockedEvent.time} />
            
            {/* Caja de Pista Dinámica */}
            <div className="p-3 bg-neon-blue/5 rounded border border-neon-blue/20">
               <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-pulse" />
                  <p className="text-[9px] font-mono text-neon-blue uppercase font-bold">Pista Actual</p>
               </div>
               <p className="text-[11px] text-gray-400 italic leading-tight">
                 "{currentEvent?.hint || 'Explora el timeline para avanzar'}"
               </p>
            </div>
          </div>
        ) : (
          <div className={`font-mono text-xs uppercase tracking-[0.2em] border p-3 text-center rounded animate-pulse ${isTestMode ? 'border-neon-red/50 bg-neon-red/10 text-neon-red' : 'border-neon-blue/30 bg-neon-blue/10 text-neon-blue'}`}>
            {isTestMode ? 'VISTA PREVIA ACTIVA' : 'SISTEMA COMPLETO ✓'}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
