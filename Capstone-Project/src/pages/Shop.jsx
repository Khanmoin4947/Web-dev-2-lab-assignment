import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Loader } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState([]);

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
    return products.filter(p => {
      const matchCategory = category === 'all' || p.category === category;
      const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, category, searchTerm]);

  // Debounced search handling
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shop All Products</h1>
        <div className="flex space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 capitalize"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-3 aspect-h-4 bg-white p-4">
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain object-center" />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{product.title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 capitalize">{product.category}</p>
              </div>
              <p className="mt-4 text-base font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
}
