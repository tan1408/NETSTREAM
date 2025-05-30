import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import YouTube from 'react-youtube';
import { fetchMovieVideos } from '../api';
import type { Movie, VideoResult } from '../types';

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [videos, setVideos] = useState<VideoResult[]>([]);
  const movie = location.state?.movie as Movie;

  useEffect(() => {
    if (!movie) {
      navigate('/');
      return;
    }

    const loadVideos = async () => {
      try {
        const results = await fetchMovieVideos(movie.id);
        setVideos(results);
      } catch (error) {
        console.error('Error loading videos:', error);
      }
    };
    loadVideos();
  }, [movie, navigate]);

  const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

  if (!movie || !trailer) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition"
        >
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>
      </div>

      <div className="relative pt-16">
        <div className="aspect-video w-full bg-black">
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
                origin: window.location.origin,
                enablejsapi: 1,
                host: 'https://www.youtube-nocookie.com'
              },
            }}
            className="w-full h-full"
            onError={(error) => console.error('YouTube Player Error:', error)}
          />
        </div>

        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
          >
            {isMuted ? (
              <VolumeX className="text-white\" size={20} />
            ) : (
              <Volume2 className="text-white" size={20} />
            )}
          </button>
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{movie.title || movie.name}</h1>
          <p className="text-gray-300 text-lg">{movie.overview}</p>
          
          <div className="mt-4 text-sm text-gray-400">
            <p>Release Date: {movie.release_date || movie.first_air_date}</p>
            <p className="mt-1">Rating: {movie.vote_average.toFixed(1)} / 10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;