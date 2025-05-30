import axios from 'axios';
import { Movie, VideoResult, Genre } from './types';

const API_KEY = 'a7bb79ac5cb5509b32d97c560c5640b2';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchTrending = async (): Promise<Movie[]> => {
  const response = await api.get('/trending/all/week');
  return response.data.results;
};

export const fetchNetflixOriginals = async (): Promise<Movie[]> => {
  const response = await api.get('/discover/tv', {
    params: {
      with_networks: 213,
    },
  });
  return response.data.results;
};

export const fetchTopRated = async (): Promise<Movie[]> => {
  const response = await api.get('/movie/top_rated');
  return response.data.results;
};

export const fetchMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  const response = await api.get('/discover/movie', {
    params: {
      with_genres: genreId,
    },
  });
  return response.data.results;
};

export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres;
};

export const fetchMovieVideos = async (movieId: number): Promise<VideoResult[]> => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query) return [];
  const response = await api.get('/search/multi', {
    params: {
      query,
    },
  });
  return response.data.results;
};