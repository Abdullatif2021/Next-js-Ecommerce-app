'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { data: session } = useSession();
  const { dispatch, cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    if (!session) {
      setShowSignInModal(true);
      return;
    }
    dispatch({ type: 'ADD_TO_CART', product, quantity: 1 });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1000);
  };

  const handleSignOut = () => {
    setShowSignOutModal(true);
  };

  const confirmSignOut = () => {
    dispatch({ type: 'CLEAR_CART' });
    signOut();
    setShowSignOutModal(false);
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-gray-800 text-white py-4 px-8 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Shoezz</h1>

        <div className='flex items-center space-x-4'>
          <Link href='/cart'>
            <button className='relative bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg'>
              Cart
              {cart.length > 0 && (
                <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>
                  {cart.length}
                </span>
              )}
            </button>
          </Link>
          {session ? (
            <>
              <p className='hidden md:block'>
                Welcome, {session.user.email.split('@')[0]}
              </p>
              <button
                onClick={handleSignOut}
                className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg hidden md:block'>
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg hidden md:block'>
              Sign In
            </button>
          )}
        </div>
      </header>

      {showSignInModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-12 rounded-lg shadow-lg text-center'>
            <p className='text-lg text-black mb-4'>
              Please sign in to add items to the cart.
            </p>
            <button
              onClick={() => {
                signIn();
                setShowSignInModal(false);
              }}
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2'>
              Sign In
            </button>
            <button
              onClick={() => setShowSignInModal(false)}
              className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg'>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showSignOutModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-12 rounded-lg shadow-lg text-center'>
            <p className='text-lg text-black mb-4'>
              Are you sure you want to sign out?
            </p>
            <button
              onClick={confirmSignOut}
              className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mr-2'>
              Yes, Sign Out
            </button>
            <button
              onClick={() => setShowSignOutModal(false)}
              className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg'>
              Cancel
            </button>
          </div>
        </div>
      )}

      <section className='bg-gradient-to-r from-blue-100 to-purple-100 py-16 px-8 flex justify-center'>
        <div className='relative w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8 p-8 rounded-2xl shadow-lg bg-white transition-transform duration-300 transform hover:scale-105'>
          <div className='flex flex-col justify-center items-start text-left space-y-4 md:w-1/2'>
            <h2 className='text-5xl font-extrabold text-indigo-800 mb-2'>
              New Arrivals!
            </h2>
            <p className='text-lg text-gray-700'>
              Step up your style with the latest Nike AirMax, available now for
              just <span className='text-indigo-600 font-bold'>$129</span>!
            </p>
            <button className='bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg transition-transform duration-200 transform hover:scale-110'>
              View Product
            </button>
          </div>

          <div className='w-full md:w-1/2 flex justify-center'>
            <img
              src='/shoes.jpg'
              alt='Featured Product'
              className='w-full h-auto object-cover rounded-lg shadow-xl border-4 border-indigo-200 transition-transform duration-200 transform hover:scale-105'
            />
          </div>
        </div>
      </section>

      <main className='py-10 px-8'>
        <h2 className='text-2xl font-semibold text-[#6d5454] mb-6'>
          Featured Products
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {products.map((product) => (
            <div
              key={product.id}
              className='bg-white rounded-lg shadow-md p-4 flex flex-col items-center'>
              <div className='relative w-full'>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className='w-full h-40 object-cover mb-4 rounded-md'
                />
                <button className='absolute top-2 right-2 text-red-500'>
                  ❤️
                </button>
              </div>

              <div className='w-full text-center'>
                <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                  {product.name}
                </h2>
                <p className='text-sm text-gray-500 mb-2'>
                  {product.description}
                </p>
                <p className='text-xl font-bold text-gray-800 mb-4'>
                  ${product.price}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full transition-all duration-300 ${
                    addedToCart === product.id ? 'bg-green-500' : ''
                  }`}>
                  {addedToCart === product.id ? 'Added!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
