'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');
    setLoading(true);

    let isValid = true;
    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    }

    if (!isValid) {
      setLoading(false);
      return;
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (!result || result.error) {
      setError('Invalid email or password.');
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0'>
      <div className='bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md'>
        <h1 className='text-2xl text-black font-bold mb-6 text-center'>
          Sign In
        </h1>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        <form onSubmit={handleSignIn} className='space-y-4'>
          <div>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            />
            {emailError && (
              <p className='text-red-500 text-sm mt-1'>{emailError}</p>
            )}
          </div>
          <div>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            />
            {passwordError && (
              <p className='text-red-500 text-sm mt-1'>{passwordError}</p>
            )}
          </div>
          <button
            type='submit'
            disabled={loading || success}
            className={`w-full py-3 rounded-lg transition duration-200 flex items-center justify-center ${
              success
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}>
            {loading && !success && (
              <svg
                className='animate-spin mr-2 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V4z'></path>
              </svg>
            )}
            {success
              ? 'Signed In Successfully!'
              : loading
              ? 'Signing In...'
              : 'Sign In'}
          </button>
        </form>
        <div className='mt-6 text-center'>
          <p className='text-gray-500'>Don’t have an account?</p>
          <button
            onClick={() => router.push('/auth/signup')}
            className='mt-2 text-blue-500 underline hover:text-blue-600 transition duration-200'>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
