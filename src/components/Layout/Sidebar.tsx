import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';
import { useLibraryStore } from '../../store/useLibraryStore';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const playlists = useLibraryStore((state) => state.playlists);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-black h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-8">Music App</h1>
        
        <nav className="space-y-6">
          <div className="space-y-3">
            <Link
              to="/"
              className={`flex items-center gap-4 text-sm font-semibold ${
                isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Home size={24} />
              Home
            </Link>
            <Link
              to="/search"
              className={`flex items-center gap-4 text-sm font-semibold ${
                isActive('/search') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Search size={24} />
              Search
            </Link>
            <Link
              to="/library"
              className={`flex items-center gap-4 text-sm font-semibold ${
                isActive('/library') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Library size={24} />
              Your Library
            </Link>
          </div>

          <div className="space-y-3">
            <Link
              to="/create-playlist"
              className="flex items-center gap-4 text-sm font-semibold text-gray-400 hover:text-white"
            >
              <PlusSquare size={24} />
              Create Playlist
            </Link>
            <Link
              to="/liked-songs"
              className="flex items-center gap-4 text-sm font-semibold text-gray-400 hover:text-white"
            >
              <Heart size={24} />
              Liked Songs
            </Link>
          </div>
        </nav>
      </div>

      <div className="px-6 mt-6">
        <div className="h-px bg-gray-800 mb-6" />
        <div className="space-y-2 overflow-y-auto">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="block text-sm text-gray-400 hover:text-white truncate"
            >
              {playlist.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};