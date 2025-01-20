import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';
import { usePlayerStore } from '../../store/usePlayerStore';

export const NowPlaying: React.FC = () => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const {
    currentTrack,
    isPlaying,
    volume,
    shuffle,
    repeat,
    togglePlay,
    setVolume,
    nextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat,
  } = usePlayerStore();

  useEffect(() => {
    if (waveformRef.current && currentTrack) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4f4f4f',
        progressColor: '#1db954',
        cursorColor: '#1db954',
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: 30,
      });

      wavesurfer.current.load(currentTrack.url);
      wavesurfer.current.setVolume(volume);

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="h-24 bg-black bg-opacity-95 border-t border-gray-800 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4 w-1/3">
        <img
          src={currentTrack.artwork}
          alt={currentTrack.title}
          className="w-14 h-14 rounded"
        />
        <div>
          <h4 className="text-white font-medium">{currentTrack.title}</h4>
          <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={toggleShuffle}
            className={`text-sm ${
              shuffle ? 'text-green-500' : 'text-gray-400'
            } hover:text-white`}
          >
            <Shuffle size={20} />
          </button>
          <button
            onClick={previousTrack}
            className="text-gray-400 hover:text-white"
          >
            <SkipBack size={24} />
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={nextTrack}
            className="text-gray-400 hover:text-white"
          >
            <SkipForward size={24} />
          </button>
          <button
            onClick={toggleRepeat}
            className={`text-sm ${
              repeat !== 'none' ? 'text-green-500' : 'text-gray-400'
            } hover:text-white`}
          >
            <Repeat size={20} />
          </button>
        </div>
        <div ref={waveformRef} className="w-full" />
      </div>

      <div className="flex items-center gap-2 w-1/3 justify-end">
        <Volume2 size={20} className="text-gray-400" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};