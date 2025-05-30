import React, { useEffect, useState } from 'react';
import { X, Star, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import YouTube from 'react-youtube';
import { Movie, VideoResult } from '../types';
import { fetchMovieVideos } from '../api';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const [videos, setVideos] = useState<VideoResult[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const results = await fetchMovieVideos(movie.id);
        setVideos(results);
      } catch (error) {
        console.error('Error loading videos:', error);
      }
    };
    loadVideos();
  }, [movie.id]);

  const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

  const handleFullscreen = () => {
    const element = document.documentElement;
    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative bg-zinc-900 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div className="absolute top-4 right-4 z-20 flex gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
          >
            {isMuted ? (
              <VolumeX className="text-white" size={20} />
            ) : (
              <Volume2 className="text-white" size={20} />
            )}
          </button>
          <button
            onClick={handleFullscreen}
            className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
          >
            <Maximize2 className="text-white" size={20} />
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
          >
            <X className="text-white" size={20} />
          </button>
        </div>

        <div className="relative aspect-video">
          {trailer ? (
            <YouTube
              videoId={trailer.key}
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  mute: isMuted ? 1 : 0,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
              className="w-full h-full"
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title || movie.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            {movie.title || movie.name}
          </h2>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={20} />
              <span className="text-white font-semibold">{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">
              {movie.release_date || movie.first_air_date}
            </span>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;