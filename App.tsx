
import React, { useState, useEffect } from 'react';
import { EVENTS_SCHEDULE, EVENT_DATE_ISO, LOBBY_AUDIO_TRACKS } from './constants';
import { TimelineEvent } from './types';
import Sidebar from './components/Sidebar';
import EventViewer from './components/EventViewer';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(-1); 
  const [isPlaying, setIsPlaying] = useState(false); 
  const [isTestMode, setIsTestMode] = useState(false); // Nuevo estado para pruebas
  
  // Audio Control States
  const [globalTrackIndex, setGlobalTrackIndex] = useState(0);
  const [playlistTrackIndex, setPlaylistTrackIndex] = useState(0);

  useEffect(() => {
    const checkEvents = () => {
      if (isTestMode) {
        // En modo test, desbloqueamos TODO
        setUnlockedIds(EVENTS_SCHEDULE.map(e => e.id));
        return;
      }

      const now = new Date();
      const newUnlockedIds = EVENTS_SCHEDULE.filter(event => {
        const eventDate = new Date(`${EVENT_DATE_ISO}T${event.time}:00`);
        return now >= eventDate;
      }).map(e => e.id);
      setUnlockedIds(newUnlockedIds);
    };

    const interval = setInterval(checkEvents, 1000);
    checkEvents();
    return () => clearInterval(interval);
  }, [isTestMode]); // Se dispara cuando cambia el modo test

  const handleNext = () => {
    const isLobby = currentEventIndex === -1;
    const currentEvent = isLobby ? null : EVENTS_SCHEDULE[currentEventIndex];

    if (isLobby) {
      setGlobalTrackIndex(prev => (prev + 1) % LOBBY_AUDIO_TRACKS.length);
    } else if (currentEvent?.type === 'playlist' && currentEvent.playlist) {
      if (playlistTrackIndex < currentEvent.playlist.length - 1) {
        setPlaylistTrackIndex(prev => prev + 1);
      } else {
        if (currentEventIndex < unlockedIds.length - 1) {
          setCurrentEventIndex(prev => prev + 1);
          setPlaylistTrackIndex(0);
        }
      }
    } else if (currentEventIndex < unlockedIds.length - 1) {
      setCurrentEventIndex(prev => prev + 1);
    }
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const isLobby = currentEventIndex === -1;
    const currentEvent = isLobby ? null : EVENTS_SCHEDULE[currentEventIndex];

    if (isLobby) {
      setGlobalTrackIndex(prev => (prev - 1 + LOBBY_AUDIO_TRACKS.length) % LOBBY_AUDIO_TRACKS.length);
    } else if (currentEvent?.type === 'playlist' && currentEvent.playlist) {
      if (playlistTrackIndex > 0) {
        setPlaylistTrackIndex(prev => prev - 1);
      } else {
        setCurrentEventIndex(prev => prev - 1);
      }
    } else if (currentEventIndex > 0) {
      setCurrentEventIndex(prev => prev - 1);
      const prevEvent = EVENTS_SCHEDULE[currentEventIndex - 1];
      if (prevEvent.type === 'playlist' && prevEvent.playlist) {
        setPlaylistTrackIndex(prevEvent.playlist.length - 1);
      }
    } else {
      setCurrentEventIndex(-1);
    }
    setIsPlaying(true);
  };

  const handleSelectEvent = (index: number) => {
    setCurrentEventIndex(index);
    setPlaylistTrackIndex(0);
    setIsPlaying(true);
  };

  const handleSelectLobby = () => {
    setCurrentEventIndex(-1);
    setIsPlaying(true);
  };

  const isLobby = currentEventIndex === -1;
  const currentEvent = isLobby ? null : EVENTS_SCHEDULE[currentEventIndex];
  const nextLockedEvent = EVENTS_SCHEDULE.find(e => !unlockedIds.includes(e.id));
  
  let controlTitle = isLobby 
    ? LOBBY_AUDIO_TRACKS[globalTrackIndex].title 
    : (currentEvent?.type === 'playlist' 
        ? `${currentEvent.playlist?.[playlistTrackIndex]?.title || 'Playlist'}`
        : currentEvent?.title || 'Radio Offline');

  return (
    <div className={`flex flex-col h-screen bg-vinyl-black text-gray-200 font-sans overflow-hidden relative ${isTestMode ? 'border-2 border-neon-red/20' : ''}`}>
      <div className="absolute inset-0 z-50 pointer-events-none crt-overlay opacity-30"></div>
      
      {isTestMode && (
        <div className="absolute top-0 left-0 w-full bg-neon-red/80 text-white text-[10px] font-mono text-center py-1 z-[100] tracking-[0.5em] uppercase animate-pulse">
          Modo Test Activo - Todos los archivos desbloqueados
        </div>
      )}

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <Sidebar 
          schedule={EVENTS_SCHEDULE}
          unlockedIds={unlockedIds}
          currentId={currentEvent?.id || null}
          onSelectEvent={handleSelectEvent}
          onSelectLobby={handleSelectLobby}
          nextLockedEvent={nextLockedEvent}
          isTestMode={isTestMode}
          onToggleTestMode={() => setIsTestMode(!isTestMode)}
        />
        <EventViewer 
          event={currentEvent}
          isPlaying={isPlaying}
          onAudioEnded={handleNext}
          globalTrackIndex={globalTrackIndex}
          activePlaylistIndex={playlistTrackIndex}
          onSelectPlaylistTrack={setPlaylistTrackIndex}
        />
      </div>

      <Controls 
        onPrev={handlePrev}
        onNext={handleNext}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        isPlaying={isPlaying}
        canPrev={true}
        canNext={true}
        title={controlTitle}
      />
    </div>
  );
};

export default App;
