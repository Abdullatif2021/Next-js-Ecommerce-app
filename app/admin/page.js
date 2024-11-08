'use client';

import { useEffect, useState } from 'react';
import { FaBox, FaUsers } from 'react-icons/fa';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ products: 0, users: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const productRes = await fetch('/api/products');
      const products = await productRes.json();
      const userRes = await fetch('/api/users');
      const users = await userRes.json();

      setCounts({
        products: products.totalProducts,
        users: users.length,
      });
    };

    fetchCounts();
  }, []);

  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold text-[#816767] mb-8'>Admin Overview</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg'>
          <div className='mr-4 text-4xl'>
            <FaBox />
          </div>
          <div>
            <h2 className='text-lg font-semibold'>Total Products</h2>
            <p className='text-4xl font-bold'>{counts.products}</p>
          </div>
        </div>

        <div className='flex items-center bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow-lg'>
          <div className='mr-4 text-4xl'>
            <FaUsers />
          </div>
          <div>
            <h2 className='text-lg font-semibold'>Total Users</h2>
            <p className='text-4xl font-bold'>{counts.users}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
