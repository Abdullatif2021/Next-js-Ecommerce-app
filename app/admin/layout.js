'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user?.isAdmin) {
      router.push('/products');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session?.user?.isAdmin) {
    return null;
  }

  const navItems = [
    { name: 'Overview', href: '/admin' },
    { name: 'Products', href: '/admin/products' },
    { name: 'Users', href: '/admin/users' },
  ];

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <aside className='w-64 bg-gray-800 text-white flex flex-col justify-between p-5'>
        <div>
          <h2 className='text-2xl font-bold mb-6'>Admin Dashboard</h2>
          <nav className='space-y-4'>
            {navItems.map((item) => (
              <Link href={item.href} key={item.name}>
                <span
                  className={`block text-lg cursor-pointer px-4 py-2 rounded-lg ${
                    pathname === item.href
                      ? 'bg-gray-700 shadow-lg'
                      : 'hover:bg-gray-700 hover:shadow-md'
                  }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={() => signOut()}
          className='mt-6 w-full bg-red-600 text-white text-lg font-semibold py-2 rounded-lg hover:bg-red-500'>
          Sign Out
        </button>
      </aside>

      <main className='flex-1 p-8 bg-white shadow-lg'>{children}</main>
    </div>
  );
}
