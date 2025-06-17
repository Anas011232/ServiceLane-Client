import React from 'react';
import { Link } from 'react-router';
import { FaGhost, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-white px-4">
      <FaGhost size={120} className="animate-bounce mb-8" />
      <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">404</h1>
      <p className="text-2xl mb-8 font-semibold drop-shadow-md">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center bg-white text-purple-700 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-purple-100 transition"
      >
        <FaHome className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
