import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TVShows from './pages/TVShows';
import Movies from './pages/Movies';
import NewPopular from './pages/NewPopular';
import MyList from './pages/MyList';
import Search from './pages/Search';
import Notifications from './pages/Notifications';
import VideoPlayer from './pages/VideoPlayer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/new-popular" element={<NewPopular />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/watch" element={<VideoPlayer />} />
      </Routes>
    </div>
  );
}

export default App;