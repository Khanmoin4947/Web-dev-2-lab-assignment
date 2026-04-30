import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { removeFromCart, addToCart, clearCart } from '../store/cartSlice';

export default function Cart() {
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleAdd = (item) => {
    dispatch(addToCart(item));
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center transition-colors duration-300">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors shadow-sm">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-8">
          <ul className="border-t border-b border-gray-200 dark:border-slate-700 divide-y divide-gray-200 dark:divide-slate-700">
            {items.map((item) => (
              <li key={item.id} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0 border border-gray-100 dark:border-slate-700 rounded-md bg-white p-2">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-center object-contain sm:w-32 sm:h-32" />
                </div>
                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link to={`/product/${item.id}`} className="font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2 transition-colors">
                            {item.title}
                          </Link>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:pr-9 flex items-center">
                      <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded">
                        <button onClick={() => handleRemove(item.id)} className="p-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none transition-colors">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 text-gray-900 dark:text-gray-100 font-medium">{item.quantity}</span>
                        <button onClick={() => handleAdd(item)} className="p-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none transition-colors">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="absolute top-0 right-0">
                        <button onClick={() => handleRemove(item.id)} className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                          <span className="sr-only">Remove</span>
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 flex text-sm text-gray-700 dark:text-gray-300">
                    <span>Total: ${(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-16 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-4 shadow-sm transition-colors duration-300">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order summary</h2>
          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600 dark:text-gray-400">Subtotal ({totalQuantity} items)</dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-white">${totalAmount.toFixed(2)}</dd>
            </div>
            <div className="border-t border-gray-200 dark:border-slate-700 pt-4 flex items-center justify-between">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Order total</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">${totalAmount.toFixed(2)}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <button className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex justify-center items-center">
              Checkout <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 text-center">
            <button onClick={() => dispatch(clearCart())} className="text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
