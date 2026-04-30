import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Loader, Filter } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  
  // New Filter States
  const [sortOrder, setSortOrder] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  // Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories')
        ]);
        setProducts(productsRes.data);
        setCategories(['all', ...categoriesRes.data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchCategory = category === 'all' || p.category === category;
      const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchMinPrice = minPrice === '' || p.price >= parseFloat(minPrice);
      const matchMaxPrice = maxPrice === '' || p.price <= parseFloat(maxPrice);
      return matchCategory && matchSearch && matchMinPrice && matchMaxPrice;
    });

    if (sortOrder === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortOrder === 'name-asc') result.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortOrder === 'name-desc') result.sort((a, b) => b.title.localeCompare(a.title));

    return result;
  }, [products, category, searchTerm, sortOrder, minPrice, maxPrice]);

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

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(8);
  }, [category, searchTerm, sortOrder, minPrice, maxPrice]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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
        
        {/* Main Search and Category */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-sm"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 capitalize transition-colors shadow-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mb-8 flex flex-col md:flex-row gap-4 items-center border border-gray-200 dark:border-slate-700">
        <div className="flex items-center text-gray-700 dark:text-gray-300 mr-4 font-medium">
          <Filter className="h-5 w-5 mr-2" />
          Filters:
        </div>
        
        <div className="flex space-x-2 items-center">
          <label className="text-sm text-gray-600 dark:text-gray-400">Price:</label>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
          />
        </div>

        <div className="flex space-x-2 items-center md:ml-auto">
          <label className="text-sm text-gray-600 dark:text-gray-400">Sort By:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
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
