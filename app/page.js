// app/page.js
'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait until session is loaded

    if (session?.user?.isAdmin) {
      router.push('/admin'); // Redirect to admin if user is an admin
    } else {
      router.push('/products'); // Redirect to products if not admin
    }
  }, [session, status, router]);

  return null; // No need to render anything on this page
}
