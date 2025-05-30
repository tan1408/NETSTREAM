import React, { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-12 py-6">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-red-600 text-4xl font-bold">NETSTREAM</Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/tv-shows" className="text-white hover:text-gray-300">TV Shows</Link>
            <Link to="/movies" className="text-white hover:text-gray-300">Movies</Link>
            <Link to="/new-popular" className="text-white hover:text-gray-300">New & Popular</Link>
            <Link to="/my-list" className="text-white hover:text-gray-300">My List</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/search" className="p-2 hover:text-gray-300">
            <Search className="text-white" size={20} />
          </Link>

          <Link to="/notifications" className="relative">
            <Bell className="text-white" size={20} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </Link>

          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;