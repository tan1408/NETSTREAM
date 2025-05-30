import React, { useState } from 'react';
import { Play, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';
import MovieModal from './MovieModal';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/watch', { state: { movie } });
  };

  return (
    <>
      <div
        className="relative flex-shrink-0 w-48 h-72 rounded-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePlay}
      >
        <img
          src={imageUrl}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-between p-4">
            <h3 className="text-white font-bold">{movie.title || movie.name}</h3>
            <div className="flex gap-2">
              <button 
                onClick={handlePlay}
                className="flex items-center gap-1 bg-white text-black px-3 py-1 rounded-sm text-sm"
              >
                <Play size={16} /> Play
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="flex items-center gap-1 bg-gray-500 bg-opacity-50 text-white px-3 py-1 rounded-sm text-sm"
              >
                <Info size={16} /> Info
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <MovieModal movie={movie} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default MovieCard;