import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ArrowLeft, ShoppingCart, Loader } from 'lucide-react';
import { addToCart } from '../store/cartSlice';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/shop" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Shop
      </Link>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <div className="w-full bg-white rounded-lg p-8">
          <img src={product.image} alt={product.title} className="w-full h-auto object-contain max-h-96" />
        </div>
        <div className="mt-10 px-4 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{product.title}</h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</p>
          </div>
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 dark:text-gray-300 space-y-6">
              <p>{product.description}</p>
            </div>
          </div>
          <div className="mt-10 flex sm:flex-col1">
            <button
              onClick={handleAddToCart}
              className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full transition-colors"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
