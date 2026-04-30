import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} ShopHub Capstone Project. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
