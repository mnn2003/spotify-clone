import { Track, Album } from '../types/music';

const JAMENDO_CLIENT_ID = '86c7d25c'; // This is a public client ID for demo purposes

interface JamendoTrack {
  id: string;
  name: string;
  duration: number;
  artist_name: string;
  album_name: string;
  audio: string;
  image: string;
  releasedate: string;
  license_ccurl: string;
}

const transformTrack = (track: JamendoTrack): Track => ({
  id: track.id,
  title: track.name,
  artist: track.artist_name,
  album: track.album_name,
  duration: Math.floor(track.duration),
  artwork: track.image,
  url: `${track.audio}?client_id=${JAMENDO_CLIENT_ID}`,
  genre: '',
  releaseDate: track.releasedate,
  isDownloaded: false
});

export const searchTracks = async (query: string): Promise<Track[]> => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=20&search=${query}&include=musicinfo&groupby=artist_id`
    );
    const data = await response.json();
    return data.results.map(transformTrack);
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
};

export const getPopularTracks = async (): Promise<Track[]> => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=20&ordering=popularity_total&include=musicinfo`
    );
    const data = await response.json();
    return data.results.map(transformTrack);
  } catch (error) {
    console.error('Error fetching popular tracks:', error);
    return [];
  }
};

export const getTracksByGenre = async (genre: string): Promise<Track[]> => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=20&tags=${genre}&include=musicinfo&groupby=artist_id`
    );
    const data = await response.json();
    return data.results.map(transformTrack);
  } catch (error) {
    console.error('Error fetching tracks by genre:', error);
    return [];
  }
};