import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { fetchNetflixOriginals } from '../api';
import MovieRow from '../components/MovieRow';
import { Tv, TrendingUp, Star } from 'lucide-react';

const TVShows = () => {
  const [shows, setShows] = useState<Movie[]>([]);

  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchNetflixOriginals();
        setShows(data);
      } catch (error) {
        console.error('Error loading TV shows:', error);
      }
    };
    loadShows();
  }, []);

  return (
    <div className="pt-24 px-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        <Tv className="text-red-600" />
        TV Shows
      </h1>
      
      <div className="space-y-12">
        <MovieRow
          title="Popular on NetStream"
          movies={shows}
          icon={<TrendingUp className="text-red-600" />}
        />
        <MovieRow
          title="Top Rated Series"
          movies={shows.filter(show => show.vote_average > 8)}
          icon={<Star className="text-red-600" />}
        />
      </div>
    </div>
  );
};

export default TVShows;