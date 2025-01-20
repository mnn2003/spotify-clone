import React from 'react';
import { Track } from '../types/music';
import { Play, Music } from 'lucide-react';

interface PlaylistProps {
  tracks: Track[];
  currentTrack: Track | null;
  onTrackSelect: (track: Track) => void;
}

export const Playlist: React.FC<PlaylistProps> = ({ tracks, currentTrack, onTrackSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-h-[400px] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Playlist</h2>
      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => onTrackSelect(track)}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
              currentTrack?.id === track.id
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              {track.artwork ? (
                <img
                  src={track.artwork}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Music size={20} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{track.title}</p>
              <p className="text-sm text-gray-500 truncate">{track.artist}</p>
            </div>
            {currentTrack?.id === track.id && (
              <Play size={20} className="flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};