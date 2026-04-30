import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { logout } from '../store/authSlice';

export default function Navbar() {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">ShopHub</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link to="/shop" className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Shop</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/admin" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600">Admin</Link>
                <button onClick={handleLogout} className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
