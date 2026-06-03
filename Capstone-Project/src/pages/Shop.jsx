import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Loader } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRes = await axios.get('https://fakestoreapi.com/products');
        setProducts(productsRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products;

  // Handle scroll for simulated infinite scroll
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      if (visibleCount < filteredProducts.length) {
        setVisibleCount(prev => prev + 4);
      }
    }
  }, [visibleCount, filteredProducts.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
      </div>
    );
  }

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shop All Products</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="group relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200">
            <div className="aspect-w-3 aspect-h-4 bg-white p-4">
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain object-center mix-blend-multiply" />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between border-t border-gray-100 dark:border-slate-700">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">{product.title}</h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 capitalize bg-gray-100 dark:bg-slate-700 inline-block px-2 py-1 rounded mt-2">{product.category}</p>
              </div>
              <p className="mt-4 text-lg font-bold text-indigo-600 dark:text-indigo-400">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No products found matching your criteria.
        </div>
      )}

      {visibleCount < filteredProducts.length && (
        <div className="flex justify-center mt-10">
          <Loader className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
        </div>
      )}
    </div>
  );
}
