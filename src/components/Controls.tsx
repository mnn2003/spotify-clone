import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';
import { PlayerState } from '../types/music';

interface ControlsProps {
  isPlaying: boolean;
  repeat: PlayerState['repeat'];
  shuffle: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleRepeat: () => void;
  onToggleShuffle: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  repeat,
  shuffle,
  onPlayPause,
  onNext,
  onPrevious,
  onToggleRepeat,
  onToggleShuffle
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onToggleShuffle}
        className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${
          shuffle ? 'text-blue-500' : 'text-gray-700'
        }`}
      >
        <Shuffle size={20} />
      </button>
      <button
        onClick={onPrevious}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
      >
        <SkipBack size={24} />
      </button>
      <button
        onClick={onPlayPause}
        className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 text-white transition-colors"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <button
        onClick={onNext}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
      >
        <SkipForward size={24} />
      </button>
      <button
        onClick={onToggleRepeat}
        className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${
          repeat !== 'none' ? 'text-blue-500' : 'text-gray-700'
        }`}
      >
        <Repeat size={20} />
      </button>
    </div>
  );
};