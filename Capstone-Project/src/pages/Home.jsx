import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Premium products for</span>{' '}
          <span className="block text-indigo-600 dark:text-indigo-400 xl:inline">your everyday needs</span>
        </h1>
        <p className="mt-4 max-w-md mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-6 md:text-xl md:max-w-3xl">
          Discover a wide range of categories, fast search, and a beautiful shopping experience. Everything you need, one click away.
        </p>
        <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
          <div className="rounded-md">
            <Link to="/shop" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 md:py-4 md:text-lg md:px-10 transition-colors shadow-sm">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
