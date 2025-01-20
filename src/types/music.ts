export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork: string;
  url: string;
  genre: string;
  releaseDate: string;
  isDownloaded?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  artwork: string;
  tracks: Track[];
  createdAt: string;
}

export interface Genre {
  id: string;
  name: string;
  artwork: string;
}

export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  repeat: 'none' | 'all' | 'one';
  crossfade: number;
  queue: Track[];
  history: Track[];
}

export interface Library {
  savedTracks: Track[];
  savedAlbums: Album[];
  playlists: Playlist[];
  recentlyPlayed: Track[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  releaseDate: string;
  tracks: Track[];
  genre: string;
}