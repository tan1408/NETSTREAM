import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  icon?: React.ReactNode;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, icon }) => {
  const [scrollX, setScrollX] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    const scrollAmount = 200;
    const container = document.getElementById(`slider-${title}`);
    if (container) {
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
        setScrollX(Math.max(scrollX - scrollAmount, 0));
      } else {
        container.scrollLeft += scrollAmount;
        setScrollX(scrollX + scrollAmount);
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-4 px-12">
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      
      <div className="group relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleScroll('left')}
        >
          <ChevronLeft className="text-white" size={24} />
        </button>

        <div
          id={`slider-${title}`}
          className="flex gap-4 overflow-x-scroll scrollbar-hide px-12 scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleScroll('right')}
        >
          <ChevronRight className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;