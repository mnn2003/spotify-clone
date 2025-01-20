import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Track, Album, Playlist, Library } from '../types/music';

interface LibraryStore extends Library {
  addToSavedTracks: (track: Track) => void;
  removeFromSavedTracks: (trackId: string) => void;
  addToSavedAlbums: (album: Album) => void;
  removeFromSavedAlbums: (albumId: string) => void;
  createPlaylist: (name: string, description: string) => void;
  deletePlaylist: (playlistId: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  addToRecentlyPlayed: (track: Track) => void;
}

export const useLibraryStore = create<LibraryStore>()(
  persist(
    (set) => ({
      savedTracks: [],
      savedAlbums: [],
      playlists: [],
      recentlyPlayed: [],

      addToSavedTracks: (track) =>
        set((state) => ({
          savedTracks: [...state.savedTracks, track],
        })),

      removeFromSavedTracks: (trackId) =>
        set((state) => ({
          savedTracks: state.savedTracks.filter((t) => t.id !== trackId),
        })),

      addToSavedAlbums: (album) =>
        set((state) => ({
          savedAlbums: [...state.savedAlbums, album],
        })),

      removeFromSavedAlbums: (albumId) =>
        set((state) => ({
          savedAlbums: state.savedAlbums.filter((a) => a.id !== albumId),
        })),

      createPlaylist: (name, description) =>
        set((state) => ({
          playlists: [
            ...state.playlists,
            {
              id: crypto.randomUUID(),
              name,
              description,
              artwork: '',
              tracks: [],
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      deletePlaylist: (playlistId) =>
        set((state) => ({
          playlists: state.playlists.filter((p) => p.id !== playlistId),
        })),

      addTrackToPlaylist: (playlistId, track) =>
        set((state) => ({
          playlists: state.playlists.map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, tracks: [...playlist.tracks, track] }
              : playlist
          ),
        })),

      removeTrackFromPlaylist: (playlistId, trackId) =>
        set((state) => ({
          playlists: state.playlists.map((playlist) =>
            playlist.id === playlistId
              ? {
                  ...playlist,
                  tracks: playlist.tracks.filter((t) => t.id !== trackId),
                }
              : playlist
          ),
        })),

      addToRecentlyPlayed: (track) =>
        set((state) => ({
          recentlyPlayed: [track, ...state.recentlyPlayed].slice(0, 50),
        })),
    }),
    {
      name: 'music-library',
    }
  )
);