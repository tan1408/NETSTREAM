import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { ListPlus } from 'lucide-react';

const MyList = () => {
  const [myList, setMyList] = useState<Movie[]>([]);

  useEffect(() => {
    // Load saved movies from localStorage
    const savedList = localStorage.getItem('myList');
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }
  }, []);

  if (myList.length === 0) {
    return (
      <div className="pt-24 px-12 min-h-screen flex flex-col items-center justify-center">
        <ListPlus className="text-red-600 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Your list is empty</h1>
        <p className="text-gray-400">
          Add movies and TV shows to your list to watch them later
        </p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        <ListPlus className="text-red-600" />
        My List
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {myList.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MyList;