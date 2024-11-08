'use client';

import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartPage() {
  const { cart, dispatch } = useCart();
  const [updatedQuantities, setUpdatedQuantities] = useState({});
  const router = useRouter();

  const handleQuantityChange = (productId, quantity) => {
    setUpdatedQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const updateQuantity = (productId) => {
    const quantity = parseInt(updatedQuantities[productId]);
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_CART', productId, quantity });
    }
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const proceedToCheckout = () => {
    router.push('/payment');
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-gray-100'>
      <header className='bg-blue-600 text-white py-6 px-8 flex justify-between items-center shadow-lg'>
        <h1 className='text-3xl font-bold'>Shopping Cart</h1>
        <Link href='/'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg'>
            Continue Shopping
          </button>
        </Link>
      </header>

      <main className='py-10 px-8'>
        {cart.length === 0 ? (
          <div className='text-center'>
            <p className='text-2xl font-semibold text-gray-700'>
              Your cart is empty
            </p>
            <Link href='/'>
              <button className='mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105'>
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <div className='max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-xl'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              Your Cart
            </h2>
            <div className='space-y-6'>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center p-6 bg-gray-50 rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105'>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className='w-28 h-28 object-cover rounded-lg border-2 border-gray-300'
                  />
                  <div className='ml-6 flex-1'>
                    <h3 className='text-xl font-semibold text-gray-800'>
                      {item.name}
                    </h3>
                    <p className='text-gray-600 text-sm mt-1'>
                      {item.description}
                    </p>
                    <p className='text-blue-500 font-bold text-lg mt-2'>
                      ${item.price}
                    </p>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <input
                      type='number'
                      min='1'
                      value={updatedQuantities[item.id] || item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      className='w-16 p-2 border text-black border-gray-300 rounded-lg text-center'
                    />
                    {/* <button
                      onClick={() => updateQuantity(item.id)}
                      className='bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105'>
                      Update
                    </button> */}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className='ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105'>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className='mt-10 text-right'>
              <button
                onClick={proceedToCheckout}
                className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105'>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
