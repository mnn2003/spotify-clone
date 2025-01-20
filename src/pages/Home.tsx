import React from 'react';
import { usePlayerStore } from '../store/usePlayerStore';
import { tracks } from '../data/tracks';
import { Play, Pause } from 'lucide-react';

export const Home: React.FC = () => {
  const { currentTrack, isPlaying, setCurrentTrack, togglePlay } = usePlayerStore();

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      setCurrentTrack(track);
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Tracks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-gray-800 bg-opacity-40 rounded-lg p-4 hover:bg-opacity-60 transition-colors group cursor-pointer"
              onClick={() => handlePlayTrack(track)}
            >
              <div className="relative">
                <img
                  src={track.artwork}
                  alt={track.title}
                  className="w-full aspect-square object-cover rounded-lg mb-4"
                />
                <button className="absolute bottom-6 right-2 p-3 rounded-full bg-green-500 text-black opacity-0 group-hover:opacity-100 hover:scale-105 transition-all shadow-lg">
                  {currentTrack?.id === track.id && isPlaying ? (
                    <Pause size={24} />
                  ) : (
                    <Play size={24} />
                  )}
                </button>
              </div>
              <h3 className="font-semibold truncate">{track.title}</h3>
              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
              <p className="text-sm text-gray-500 truncate">{track.album}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">All Tracks</h2>
        <div className="bg-gray-900 bg-opacity-40 rounded-lg overflow-hidden">
          <div className="grid grid-cols-[auto,1fr,1fr,auto] gap-4 px-4 py-2 border-b border-gray-800 text-sm text-gray-400">
            <div className="w-8">#</div>
            <div>Title</div>
            <div>Album</div>
            <div className="w-16 text-right">Duration</div>
          </div>
          {tracks.map((track, index) => (
            <div
              key={track.id}
              onClick={() => handlePlayTrack(track)}
              className={`grid grid-cols-[auto,1fr,1fr,auto] gap-4 px-4 py-2 hover:bg-white hover:bg-opacity-5 group cursor-pointer ${
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
                {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};