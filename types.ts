
export interface SubTrack {
  title: string;
  artist: string;
  audioUrl: string;
  lyrics?: string;
  duration?: string;
}

export interface LobbyTrack {
  title: string;
  audioUrl: string;
}

export interface TimelineEvent {
  id: string;
  time: string; // HH:MM format (24h)
  title: string;
  lockedTitle?: string; // Title shown when event is locked
  description: string;
  location: string;
  image: string; // URL
  type: 'music' | 'video' | 'moment' | 'letter' | 'playlist'; 
  audioUrl?: string; // Main audio for the event (MP3/Link)
  playlist?: SubTrack[]; // For type 'playlist'
  videoUrl?: string; // Direct Video URL (MP4)
  youtubeId?: string; // YouTube Video ID
  hint: string; // Hint for the next event
}

export type EventStatus = 'locked' | 'unlocked' | 'active';

export interface AppState {
  currentTime: Date;
  unlockedEventIds: string[];
  currentEventIndex: number;
  isPlaying: boolean; // Global audio state
}
