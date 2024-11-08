'use client';

import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FakePaymentPage() {
  const { dispatch } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      router.push('/products');
    }, 2000);
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='space-y-6'>
          <h2 className='text-2xl font-bold mb-4'>Select Payment Method</h2>

          <div className='space-y-4'>
            <div className='flex items-center space-x-4'>
              <input
                type='radio'
                id='credit'
                name='payment'
                className='w-4 h-4'
                defaultChecked
              />
              <label htmlFor='credit' className='text-gray-700 font-semibold'>
                Credit Card
              </label>
            </div>
            <div className='flex items-center space-x-4'>
              <input
                type='radio'
                id='paypal'
                name='payment'
                className='w-4 h-4'
              />
              <label htmlFor='paypal' className='text-gray-700 font-semibold'>
                PayPal
              </label>
            </div>
            <div className='flex items-center space-x-4'>
              <input
                type='radio'
                id='other'
                name='payment'
                className='w-4 h-4'
              />
              <label htmlFor='other' className='text-gray-700 font-semibold'>
                Other
              </label>
            </div>
          </div>

          <div className='mt-8 space-y-4'>
            <h3 className='text-xl font-bold text-gray-700'>
              Pay using credit card
            </h3>
            <input
              type='text'
              placeholder='Card Number'
              className='w-full p-3 border border-gray-300 rounded-lg'
            />
            <input
              type='text'
              placeholder='Card Holder Name'
              className='w-full p-3 border border-gray-300 rounded-lg'
            />
            <div className='flex space-x-4'>
              <input
                type='text'
                placeholder='MM/YY'
                className='w-full p-3 border border-gray-300 rounded-lg'
              />
              <input
                type='text'
                placeholder='CVV'
                className='w-full p-3 border border-gray-300 rounded-lg'
              />
            </div>
            <button
              onClick={handlePayment}
              className={`mt-4 w-full p-3 rounded-lg font-bold text-white ${
                isProcessing
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Pay'}
            </button>
          </div>
        </div>

        <div className='bg-gray-100 p-6 rounded-lg'>
          <h3 className='text-xl font-bold mb-4'>Order Summary</h3>
          <div className='space-y-4'>
            <div className='flex justify-between'>
              <p className='text-gray-600'>Product Name</p>
              <p className='text-gray-800 font-semibold'>$129.99</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-600'>Shipping</p>
              <p className='text-gray-800 font-semibold'>Free</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-600'>Estimated Tax</p>
              <p className='text-gray-800 font-semibold'>$10.00</p>
            </div>
            <div className='border-t pt-4 flex justify-between font-bold'>
              <p className='text-lg'>Total</p>
              <p className='text-lg'>$139.99</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push('/cart')}
        className='mt-6 text-blue-500 underline hover:text-blue-600'>
        Back to Cart
      </button>
    </div>
  );
}
