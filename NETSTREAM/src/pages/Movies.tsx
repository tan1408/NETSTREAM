import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { fetchTopRated, fetchMoviesByGenre } from '../api';
import MovieRow from '../components/MovieRow';
import { Film, Star, Flame, Sword, Heart } from 'lucide-react';

const Movies = () => {
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [action, setAction] = useState<Movie[]>([]);
  const [romance, setRomance] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [topRatedData, actionData, romanceData] = await Promise.all([
          fetchTopRated(),
          fetchMoviesByGenre(28), // Action
          fetchMoviesByGenre(10749), // Romance
        ]);
        
        setTopRated(topRatedData);
        setAction(actionData);
        setRomance(romanceData);
      } catch (error) {
        console.error('Error loading movies:', error);
      }
    };
    loadMovies();
  }, []);

  return (
    <div className="pt-24 px-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        <Film className="text-red-600" />
        Movies
      </h1>
      
      <div className="space-y-12">
        <MovieRow
          title="Top Rated"
          movies={topRated}
          icon={<Star className="text-red-600" />}
        />
        <MovieRow
          title="Action & Adventure"
          movies={action}
          icon={<Sword className="text-red-600" />}
        />
        <MovieRow
          title="Romance"
          movies={romance}
          icon={<Heart className="text-red-600" />}
        />
      </div>
    </div>
  );
};

export default Movies;