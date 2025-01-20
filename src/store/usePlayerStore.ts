import { create } from 'zustand';
import { Track, PlayerState } from '../types/music';

interface PlayerStore extends PlayerState {
  currentTrack: Track | null;
  setCurrentTrack: (track: Track) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setCrossfade: (seconds: number) => void;
  addToHistory: (track: Track) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  shuffle: false,
  repeat: 'none',
  crossfade: 0,
  queue: [],
  history: [],

  setCurrentTrack: (track) => {
    set({ currentTrack: track });
    get().addToHistory(track);
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setVolume: (volume) => set({ volume }),

  seek: (time) => set({ currentTime: time }),

  addToQueue: (track) =>
    set((state) => ({ queue: [...state.queue, track] })),

  removeFromQueue: (trackId) =>
    set((state) => ({
      queue: state.queue.filter((track) => track.id !== trackId),
    })),

  clearQueue: () => set({ queue: [] }),

  nextTrack: () => {
    const { queue, currentTrack, repeat, shuffle } = get();
    if (!queue.length) return;

    let nextTrack;
    if (shuffle) {
      const index = Math.floor(Math.random() * queue.length);
      nextTrack = queue[index];
    } else {
      const currentIndex = queue.findIndex((t) => t.id === currentTrack?.id);
      nextTrack = queue[(currentIndex + 1) % queue.length];
    }

    if (repeat === 'one') {
      nextTrack = currentTrack!;
    }

    get().setCurrentTrack(nextTrack);
  },

  previousTrack: () => {
    const { history } = get();
    if (history.length < 2) return;
    
    const previousTrack = history[history.length - 2];
    get().setCurrentTrack(previousTrack);
    set((state) => ({
      history: state.history.slice(0, -1),
    }));
  },

  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),

  toggleRepeat: () => {
    const modes: PlayerState['repeat'][] = ['none', 'all', 'one'];
    set((state) => ({
      repeat: modes[(modes.indexOf(state.repeat) + 1) % modes.length],
    }));
  },

  setCrossfade: (seconds) => set({ crossfade: seconds }),

  addToHistory: (track) =>
    set((state) => ({
      history: [...state.history, track].slice(-50), // Keep last 50 tracks
    })),
}));