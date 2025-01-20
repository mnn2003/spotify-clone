import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePlayerStore } from '../store/usePlayerStore';
import { Track } from '../types/music';
import { Play, Pause, Plus } from 'lucide-react';
import { searchTracks } from '../services/musicApi';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [tracks, setTracks] = useState<Track[]>([]);
  const { currentTrack, isPlaying, setCurrentTrack, togglePlay } = usePlayerStore();

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const results = await searchTracks(query);
        setTracks(results);
      }
    };

    fetchResults();
  }, [query]);

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      setCurrentTrack(track);
    }
  };

  return (
    <div className="space-y-8">
      {query && (
        <h1 className="text-3xl font-bold mb-8">
          Search results for "{query}"
        </h1>
      )}

      {!query && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {['Rock', 'Jazz', 'Classical', 'Electronic', 'Hip Hop'].map((genre) => (
            <div
              key={genre}
              className="aspect-square relative overflow-hidden rounded-lg group cursor-pointer"
              style={{
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-colors" />
              <h3 className="absolute bottom-4 left-4 text-2xl font-bold">
                {genre}
              </h3>
            </div>
          ))}
        </div>
      )}

      {query && tracks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Songs</h2>
          <div className="space-y-2">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-white hover:bg-opacity-10 group"
              >
                <img
                  src={track.artwork}
                  alt={track.title}
                  className="w-12 h-12 rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{track.title}</h3>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handlePlayTrack(track)}
                    className="p-2 rounded-full bg-white text-black hover:scale-105 transition-transform"
                  >
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause size={20} />
                    ) : (
                      <Play size={20} />
                    )}
                  </button>
                  <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-10">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {query && !tracks.length && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">No results found</h2>
          <p className="text-gray-400">
            We couldn't find anything matching "{query}"
          </p>
        </div>
      )}
    </div>
  );
};