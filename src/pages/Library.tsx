import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLibraryStore } from '../store/useLibraryStore';
import { Play, Clock, Music2 } from 'lucide-react';

type ViewType = 'playlists' | 'albums' | 'artists' | 'tracks';
type SortType = 'name' | 'date' | 'artist';
type SortOrder = 'asc' | 'desc';

export const Library: React.FC = () => {
  const [view, setView] = useState<ViewType>('playlists');
  const [sort, setSort] = useState<SortType>('name');
  const [order, setOrder] = useState<SortOrder>('asc');
  const { savedTracks, savedAlbums, playlists } = useLibraryStore();

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const sortItems = <T extends { name?: string; title?: string; artist?: string; createdAt?: string }>(
    items: T[],
    sortType: SortType,
    sortOrder: SortOrder
  ) => {
    return [...items].sort((a, b) => {
      let compareA: string;
      let compareB: string;

      switch (sortType) {
        case 'name':
          compareA = (a.name || a.title || '').toLowerCase();
          compareB = (b.name || b.title || '').toLowerCase();
          break;
        case 'artist':
          compareA = (a.artist || '').toLowerCase();
          compareB = (b.artist || '').toLowerCase();
          break;
        case 'date':
          compareA = a.createdAt || '';
          compareB = b.createdAt || '';
          break;
        default:
          compareA = '';
          compareB = '';
      }

      return sortOrder === 'asc'
        ? compareA.localeCompare(compareB)
        : compareB.localeCompare(compareA);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView('playlists')}
            className={`px-4 py-2 rounded-full ${
              view === 'playlists'
                ? 'bg-white text-black'
                : 'text-white hover:bg-white hover:bg-opacity-10'
            }`}
          >
            Playlists
          </button>
          <button
            onClick={() => setView('albums')}
            className={`px-4 py-2 rounded-full ${
              view === 'albums'
                ? 'bg-white text-black'
                : 'text-white hover:bg-white hover:bg-opacity-10'
            }`}
          >
            Albums
          </button>
          <button
            onClick={() => setView('artists')}
            className={`px-4 py-2 rounded-full ${
              view === 'artists'
                ? 'bg-white text-black'
                : 'text-white hover:bg-white hover:bg-opacity-10'
            }`}
          >
            Artists
          </button>
          <button
            onClick={() => setView('tracks')}
            className={`px-4 py-2 rounded-full ${
              view === 'tracks'
                ? 'bg-white text-black'
                : 'text-white hover:bg-white hover:bg-opacity-10'
            }`}
          >
            Tracks
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="bg-transparent border border-gray-700 rounded-md px-3 py-1"
          >
            <option value="name">Sort by name</option>
            <option value="date">Sort by date</option>
            <option value="artist">Sort by artist</option>
          </select>
          <button
            onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-1 border border-gray-700 rounded-md hover:bg-white hover:bg-opacity-10"
          >
            {order === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {view === 'tracks' && (
        <div className="bg-gray-900 bg-opacity-40 rounded-lg">
          <div className="grid grid-cols-[auto,1fr,1fr,auto] gap-4 px-4 py-2 border-b border-gray-800 text-sm text-gray-400">
            <div className="w-8">#</div>
            <div>Title</div>
            <div>Album</div>
            <div className="w-16 text-right">
              <Clock size={16} />
            </div>
          </div>
          {sortItems(savedTracks, sort, order).map((track, index) => (
            <div
              key={track.id}
              className="grid grid-cols-[auto,1fr,1fr,auto] gap-4 px-4 py-2 hover:bg-white hover:bg-opacity-5 group"
            >
              <div className="w-8 flex items-center text-gray-400 group-hover:text-white">
                <span className="group-hover:hidden">{index + 1}</span>
                <Play size={16} className="hidden group-hover:block" />
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={track.artwork}
                  alt={track.title}
                  className="w-10 h-10 rounded"
                />
                <div>
                  <div className="font-medium">{track.title}</div>
                  <div className="text-sm text-gray-400">{track.artist}</div>
                </div>
              </div>
              <div className="flex items-center text-gray-400">
                {track.album}
              </div>
              <div className="w-16 flex items-center justify-end text-gray-400">
                {formatDuration(track.duration)}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'playlists' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortItems(playlists, sort, order).map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="bg-gray-800 bg-opacity-40 rounded-lg p-4 hover:bg-opacity-60 transition-colors group"
            >
              <div className="relative">
                <img
                  src={playlist.artwork || 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300'}
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded-lg mb-4"
                />
                <button className="absolute bottom-6 right-2 p-3 rounded-full bg-green-500 text-black opacity-0 group-hover:opacity-100 hover:scale-105 transition-all shadow-lg">
                  <Play size={24} />
                </button>
              </div>
              <h3 className="font-semibold truncate">{playlist.name}</h3>
              <p className="text-sm text-gray-400 truncate">
                {playlist.tracks.length} tracks
              </p>
            </Link>
          ))}
        </div>
      )}

      {view === 'albums' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortItems(savedAlbums, sort, order).map((album) => (
            <div
              key={album.id}
              className="bg-gray-800 bg-opacity-40 rounded-lg p-4 hover:bg-opacity-60 transition-colors group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={album.artwork}
                  alt={album.title}
                  className="w-full aspect-square object-cover rounded-lg mb-4"
                />
                <button className="absolute bottom-6 right-2 p-3 rounded-full bg-green-500 text-black opacity-0 group-hover:opacity-100 hover:scale-105 transition-all shadow-lg">
                  <Play size={24} />
                </button>
              </div>
              <h3 className="font-semibold truncate">{album.title}</h3>
              <p className="text-sm text-gray-400 truncate">{album.artist}</p>
            </div>
          ))}
        </div>
      )}

      {view === 'artists' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from(
            new Set(savedTracks.map((track) => track.artist))
          ).map((artist) => (
            <div
              key={artist}
              className="bg-gray-800 bg-opacity-40 rounded-lg p-4 hover:bg-opacity-60 transition-colors group cursor-pointer"
            >
              <div className="relative">
                <div className="w-full aspect-square rounded-full bg-gray-700 flex items-center justify-center mb-4">
                  <Music2 size={48} className="text-gray-500" />
                </div>
                <button className="absolute bottom-6 right-2 p-3 rounded-full bg-green-500 text-black opacity-0 group-hover:opacity-100 hover:scale-105 transition-all shadow-lg">
                  <Play size={24} />
                </button>
              </div>
              <h3 className="font-semibold truncate text-center">{artist}</h3>
              <p className="text-sm text-gray-400 truncate text-center">Artist</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};