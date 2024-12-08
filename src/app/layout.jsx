'use client'
import React, { useContext, useEffect } from 'react';
import './globals.css';
import Header from '../components/Header';
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { AuthContext, AuthContextProvider } from '../context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <InnerLayout>{children}</InnerLayout>
    </AuthContextProvider>
  );
}

function InnerLayout({ children }) {
  const path = usePathname();
  const { push } = useRouter();
  const { currentUser } = useContext(AuthContext);

  const isAuthenticated = currentUser ? true : false;

  useEffect(() => {
    // Jika sudah login, alihkan dari /login atau /register
    if (isAuthenticated && (path === '/login' || path === '/register')) {
      push('/'); // Arahkan ke halaman utama jika sudah login
    }

    // // Jika belum login, alihkan ke /login
    // if (!isAuthenticated && (path !== '/login' && path !== '/register')) {
    //   push('/login'); // Arahkan ke halaman login jika belum login
    // }
  }, [isAuthenticated, path, push]);

  return (
    <>
      <html lang="en" className={path === '/login' ? "bg-gray-300" : "bg-white"}>
        <head>
          <title>Blog Iseng</title>
        </head>
        <body className={path === '/login' ? "bg-gray-300" : "bg-white"}>
          {/* Menyembunyikan Header pada /login dan /register */}
          {(path !== '/login' && path !== '/register') && <Header />}
          <main className="mx-auto">
            {children}
          </main>
        </body>
      </html>
    </>
  );
}
