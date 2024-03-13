import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to My App</h1>
      <div className="flex space-x-4">
        <Link
          to="/categories"
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-xl font-semibold transition duration-300 ease-in-out"
        >
          Categories
        </Link>
        <Link
          to="/products"
          className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg text-xl font-semibold transition duration-300 ease-in-out"
        >
          Products
        </Link>
      </div>
    </div>
  );
};

export default Home;
