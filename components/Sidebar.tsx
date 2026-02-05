
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
    // CAMBIO: order-2 en móvil (abajo), h-[25dvh] fijo en móvil.
    // Esto asegura que la navegación esté abajo y el contenido visual arriba.
    <aside className="w-full md:w-80 lg:w-96 h-[25dvh] md:h-full flex flex-col glass-panel md:border-r border-t md:border-t-0 border-white/10 relative z-20 flex-none order-2 md:order-none shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
      
      {/* 1. HEADER + COUNTDOWN SECTION */}
      <div className="flex-none bg-vinyl-black/90 border-b border-white/10 z-10">
        <div className="px-3 py-2 md:p-6 flex justify-between items-center">
          <div>
            <h1 className="font-display font-black text-sm md:text-3xl tracking-tighter text-white leading-none">
              ABIGAIL <span className="text-neon-red">VOL. 40</span>
            </h1>
            <p className="font-mono text-[9px] text-neutral-500 mt-1 md:mt-2 tracking-[0.2em] uppercase hidden md:block">
              Digital Experience
            </p>
          </div>
            
          {/* Botón Test Mode discretísimo */}
          {onToggleTestMode && (
            <button 
              onClick={onToggleTestMode}
              className={`p-1.5 md:p-2 rounded border transition-colors ${isTestMode ? 'bg-neon-red/20 border-neon-red text-neon-red' : 'bg-white/5 border-white/10 text-neutral-600'}`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
            </button>
          )}
        </div>

        {/* COUNTDOWN INTEGRADO EN EL HEADER (Versión muy compacta para móvil) */}
        <div className="px-3 md:px-6 pb-2 md:pb-6">
          <div className="hidden md:flex items-center justify-between mb-2">
            <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
              Siguiente Objetivo
            </p>
          </div>
          
          {nextLockedEvent && !isTestMode ? (
            <div className="flex gap-2 items-center">
              <Countdown targetTime={nextLockedEvent.time} />
              
              {/* Hint */}
              <div className="flex-1 p-1 md:p-2 bg-neon-blue/5 rounded border border-neon-blue/20 overflow-hidden h-[28px] md:h-auto flex items-center">
                 <p className="text-[9px] md:text-[11px] text-gray-400 italic leading-tight truncate">
                   "{currentEvent?.hint || 'Explora el timeline...'}"
                 </p>
              </div>
            </div>
          ) : (
            <div className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] border p-1 md:p-2 text-center rounded animate-pulse ${isTestMode ? 'border-neon-red/50 bg-neon-red/10 text-neon-red' : 'border-neon-blue/30 bg-neon-blue/10 text-neon-blue'}`}>
              {isTestMode ? 'TEST ACTIVO' : 'SISTEMA COMPLETO'}
            </div>
          )}
        </div>
      </div>

      {/* 2. TRACKLIST SCROLLABLE */}
      <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-1 md:space-y-2 custom-scrollbar shadow-inner bg-black/20">
        
        <div
          onClick={onSelectLobby}
          className={`
            group relative p-2 md:p-4 rounded-md border transition-all duration-300 cursor-pointer flex-shrink-0
            ${currentId === null 
              ? 'bg-white/10 border-neon-blue/50 shadow-[0_0_15px_rgba(0,243,255,0.05)]' 
              : 'border-transparent hover:bg-white/5'}
          `}
        >
          <div className="flex items-center justify-between mb-0.5 md:mb-1">
            <span className={`font-mono text-[9px] md:text-[10px] ${currentId === null ? 'text-neon-blue' : 'text-neutral-500'}`}>
              00:00
            </span>
          </div>
          <h3 className={`font-bold text-[10px] md:text-sm ${currentId === null ? 'text-white' : 'text-gray-400'}`}>
            PORTADA
          </h3>
        </div>

        {schedule.map((event, index) => {
          const isUnlocked = unlockedIds.includes(event.id);
          const isActive = event.id === currentId;
          
          return (
            <div
              key={event.id}
              onClick={() => isUnlocked && onSelectEvent(index)}
              className={`
                group relative p-2 md:p-4 rounded-md border transition-all duration-300 flex-shrink-0
                ${isUnlocked ? 'cursor-pointer hover:bg-white/5' : 'cursor-not-allowed opacity-40'}
                ${isActive ? 'bg-white/10 border-neon-red/50 shadow-[0_0_15px_rgba(255,0,60,0.05)]' : 'border-transparent'}
              `}
            >
              <div className="flex items-center justify-between mb-0.5 md:mb-1">
                <span className={`font-mono text-[9px] md:text-[10px] ${isActive ? 'text-neon-red' : 'text-neutral-500'}`}>
                  {event.time}
                </span>
                {isActive && (
                  <span className="flex items-center gap-1 text-neon-red animate-pulse text-[8px] md:text-[9px] font-bold tracking-widest">
                    •
                  </span>
                )}
              </div>
              <h3 className={`font-bold text-[10px] md:text-sm truncate ${isUnlocked ? 'text-gray-200' : 'text-gray-600 font-mono italic'}`}>
                {isUnlocked ? event.title : 'Bloqueado'}
              </h3>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
