import { useState, useRef, useEffect } from 'react';
import { Track, PlayerState } from '../types/music';

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    shuffle: false,
    repeat: 'none'
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration
      }));
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (playerState.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const setVolume = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = value;
    setPlayerState(prev => ({ ...prev, volume: value }));
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setPlayerState(prev => ({ ...prev, currentTime: time }));
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setPlayerState(prev => ({ ...prev, isPlaying: true }));
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
    }
  };

  const nextTrack = () => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    playTrack(queue[nextIndex]);
  };

  const previousTrack = () => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    playTrack(queue[prevIndex]);
  };

  const toggleShuffle = () => {
    setPlayerState(prev => ({ ...prev, shuffle: !prev.shuffle }));
  };

  const toggleRepeat = () => {
    const modes: PlayerState['repeat'][] = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(playerState.repeat);
    const nextIndex = (currentIndex + 1) % modes.length;
    setPlayerState(prev => ({ ...prev, repeat: modes[nextIndex] }));
  };

  return {
    audioRef,
    currentTrack,
    playerState,
    queue,
    setQueue,
    togglePlay,
    setVolume,
    seek,
    playTrack,
    nextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat
  };
};