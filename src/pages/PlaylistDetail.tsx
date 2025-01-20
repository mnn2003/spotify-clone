import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLibraryStore } from '../store/useLibraryStore';
import { usePlayerStore } from '../store/usePlayerStore';
import { Play, Pause, Clock, MoreHorizontal, Heart, Share2 } from 'lucide-react';

export const PlaylistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const playlist = useLibraryStore((state) =>
    state.playlists.find((p) => p.id === id)
  );
  const { currentTrack, isPlaying, togglePlay } = usePlayerStore();
  const [isLiked, setIsLiked] = useState(false);

  if (!playlist) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Playlist not found</h2>
        <p className="text-gray-400">
          The playlist you're looking for doesn't exist
        </p>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const totalDuration = playlist.tracks.reduce(
    (total, track) => total + track.duration,
    0
  );

  return (
    <div>
      <div className="flex items-end gap-6 mb-6">
        <img
          src={playlist.artwork || 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300'}
          alt={playlist.name}
          className="w-60 h-60 shadow-lg rounded-lg"
        />
        <div>
          <p className="text-sm font-medium mb-2">Playlist</p>
          <h1 className="text-7xl font-bold mb-6">{playlist.name}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="font-medium text-white">
              {playlist.tracks.length} songs
            </span>
            <span>•</span>
            <span>{Math.floor(totalDuration / 60)} minutes</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 mb-8">
        <button
          onClick={togglePlay}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 text-black hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`text-3xl ${isLiked ? 'text-green-500' : 'text-gray-400'} hover:text-green-500`}
        >
          <Heart size={32} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <Share2 size={28} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal size={28} />
        </button>
      </div>

      <div className="bg-gray-900 bg-opacity-40 rounded-lg">
        <div className="grid grid-cols-[auto,1fr,1fr,auto] gap-4 px-4 py-2 border-b border-gray-800 text-sm text-gray-400">
          <div className="w-8">#</div>
          <div>Title</div>
          <div>Album</div>
          <div className="w-16 text-right">
            <Clock size={16} />
          </div>
        </div>
        {playlist.tracks.map((track, index) => (
          <div
            key={track.id}
            className={`grid grid-cols-[auto,1fr,1fr,auto] gap-4 px-4 py-2 hover:bg-white hover:bg-opacity-5 group ${
              currentTrack?.id === track.id ? 'text-green-500' : ''
            }`}
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
    </div>
  );
};