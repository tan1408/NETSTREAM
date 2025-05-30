import React from 'react';
import { Bell, Film, Tv, Star } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'New Arrival',
    message: 'Inception is now available to stream',
    icon: <Film className="text-red-600" />,
    time: '2 hours ago'
  },
  {
    id: 2,
    title: 'Continue Watching',
    message: 'Resume watching Stranger Things where you left off',
    icon: <Tv className="text-red-600" />,
    time: '1 day ago'
  },
  {
    id: 3,
    title: 'Recommended',
    message: 'Based on your watchlist: The Dark Knight',
    icon: <Star className="text-red-600" />,
    time: '2 days ago'
  }
];

const Notifications = () => {
  return (
    <div className="pt-24 px-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        <Bell className="text-red-600" />
        Notifications
      </h1>

      <div className="max-w-2xl mx-auto">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className="bg-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-700 transition cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-gray-900 rounded-lg">
                {notification.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{notification.title}</h3>
                <p className="text-gray-400">{notification.message}</p>
                <span className="text-sm text-gray-500 mt-2 block">
                  {notification.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;