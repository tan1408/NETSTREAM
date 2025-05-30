import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Movie } from '../types';
import { searchMovies } from '../api';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query) {
        setIsLoading(true);
        try {
          const data = await searchMovies(query);
          setResults(data);
        } catch (error) {
          console.error('Error searching:', error);
        }
        setIsLoading(false);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  return (
    <div className="pt-24 px-12 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="relative mb-8">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for movies, TV shows, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : query && (
          <div className="text-center text-gray-400">
            No results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;