import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { fetchTrending } from '../api';
import MovieRow from '../components/MovieRow';
import { Sparkles, TrendingUp, Calendar } from 'lucide-react';

const NewPopular = () => {
  const [trending, setTrending] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchTrending();
        setTrending(data);
      } catch (error) {
        console.error('Error loading trending content:', error);
      }
    };
    loadMovies();
  }, []);

  const newReleases = trending.filter(
    movie => new Date(movie.release_date || movie.first_air_date || '').getFullYear() >= 2024
  );

  return (
    <div className="pt-24 px-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        <Sparkles className="text-red-600" />
        New & Popular
      </h1>
      
      <div className="space-y-12">
        <MovieRow
          title="Trending Now"
          movies={trending}
          icon={<TrendingUp className="text-red-600" />}
        />
        <MovieRow
          title="New Releases"
          movies={newReleases}
          icon={<Calendar className="text-red-600" />}
        />
      </div>
    </div>
  );
};

export default NewPopular;