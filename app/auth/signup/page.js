'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
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
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const loginResult = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (!loginResult.error) {
          setSuccess(true);
          setTimeout(() => {
            router.push('/products');
          }, 1000);
        } else {
          setError('Failed to sign in automatically. Please sign in manually.');
          setLoading(false);
        }
      } else {
        setError(data.error || 'An error occurred during sign up.');
        setLoading(false);
      }
    } catch (error) {
      setError('Failed to sign up. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0'>
      <div className='bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md'>
        <h1 className='text-2xl text-black font-bold mb-6 text-center'>
          Sign Up
        </h1>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        <form onSubmit={handleSignUp} className='space-y-4'>
          <div>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
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
          <div>
            <input
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            />
            {confirmPasswordError && (
              <p className='text-red-500 text-sm mt-1'>
                {confirmPasswordError}
              </p>
            )}
          </div>
          <button
            type='submit'
            disabled={loading || success}
            className={`w-full py-3 rounded-lg transition duration-200 flex items-center justify-center ${
              success
                ? 'bg-blue-500 text-white'
                : 'bg-green-500 text-white hover:bg-green-600'
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
              ? 'Signed Up Successfully!'
              : loading
              ? 'Signing Up...'
              : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
