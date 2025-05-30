import React, { useEffect, useState } from 'react';
import { Play, Info, TrendingUp, Crown, Popcorn, Clapperboard, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';
import { fetchTrending, fetchNetflixOriginals, fetchTopRated, fetchMoviesByGenre } from '../api';
import MovieRow from '../components/MovieRow';
import MovieModal from '../components/MovieModal';

const Home = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [originals, setOriginals] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [trendingData, originalsData, topRatedData, actionData, comedyData] = await Promise.all([
          fetchTrending(),
          fetchNetflixOriginals(),
          fetchTopRated(),
          fetchMoviesByGenre(28),
          fetchMoviesByGenre(35),
        ]);

        setTrending(trendingData);
        setOriginals(originalsData);
        setTopRated(topRatedData);
        setActionMovies(actionData);
        setComedyMovies(comedyData);

        const randomMovie = originalsData[Math.floor(Math.random() * originalsData.length)];
        setFeaturedMovie(randomMovie);
      } catch (error) {
        console.error('Error loading movies:', error);
      }
    };

    loadMovies();
  }, []);

  if (!featuredMovie) return null;

  const handlePlay = () => {
    navigate('/watch', { state: { movie: featuredMovie } });
  };

  return (
    <>
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%),
            url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
        }}
      >
        <div className="absolute top-1/2 left-12 transform -translate-y-1/2 max-w-xl">
          <h1 className="text-5xl font-bold mb-4">{featuredMovie.title || featuredMovie.name}</h1>
          <p className="text-lg mb-6">{featuredMovie.overview}</p>
          <div className="flex gap-4">
            <button 
              onClick={handlePlay}
              className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded hover:bg-opacity-80 transition"
            >
              <Play size={20} /> Play
            </button>
            <button 
              className="flex items-center gap-2 bg-gray-500 bg-opacity-50 text-white px-6 py-2 rounded hover:bg-opacity-75 transition"
              onClick={() => setShowModal(true)}
            >
              <Info size={20} /> More Info
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-32 space-y-8 pb-12">
        <MovieRow
          title="Trending Now"
          movies={trending}
          icon={<TrendingUp className="text-red-600" />}
        />
        <MovieRow
          title="NETSTREAM Originals"
          movies={originals}
          icon={<Crown className="text-red-600" />}
        />
        <MovieRow
          title="Top Rated"
          movies={topRated}
          icon={<Flame className="text-red-600" />}
        />
        <MovieRow
          title="Action Movies"
          movies={actionMovies}
          icon={<Clapperboard className="text-red-600" />}
        />
        <MovieRow
          title="Comedy Movies"
          movies={comedyMovies}
          icon={<Popcorn className="text-red-600" />}
        />
      </div>

      {showModal && featuredMovie && (
        <MovieModal
          movie={featuredMovie}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Home;