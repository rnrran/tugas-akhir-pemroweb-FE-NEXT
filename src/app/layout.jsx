'use client'
import React, { useContext, useEffect } from 'react';
import './globals.css';
import Header from '../components/Header';
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { AuthContext, AuthContextProvider } from '../context/AuthContext';
import { ModeProvider } from '../context/ModeContext';
import Swal from 'sweetalert2';

export default function RootLayout({ children }) {
  return (
    <ModeProvider>
      <AuthContextProvider>
        <InnerLayout>{children}</InnerLayout>
      </AuthContextProvider>
    </ModeProvider>
  );
}

function InnerLayout({ children }) {
  const path = usePathname();
  const { push } = useRouter();
  const { currentUser, userData } = useContext(AuthContext);
  console.log(userData)
  const role = userData.role

  const isAuthenticated = currentUser ? true : false;
  console.log("data", userData)
  // console.log(isAuthenticated, "budi")

  // path restriction
  useEffect(() => {
    if (isAuthenticated && (path === '/login' || path === '/register')) {
      push('/');
    }
    console.log("user sekaranga: ", userData)
    // Jika belum login, alihkan ke /login
    if (!isAuthenticated && (path === '/profile' || path === '/write'
        || path.startsWith('/blogs/edit'))
    ) {
      Swal.fire({
        title: 'Akses Ditolak',
        text: 'Kamu belum login!',
        // icon: '',
        imageUrl: '/resources/images/logout.gif'
      })
      push('/');
    }
    console.log("role",role)
    // if ( role !== 'admin' && (path.startsWith('/blogs/edit')) ){
    //   Swal.fire({
    //     title: 'Akses Ditolak',
    //     text: 'Kamu tidak mempunyai izin edit!',
    //     // icon: '',
    //     imageUrl: '/resources/images/logout.gif'
    //   })
    //   push('/');
    // }
  }, [isAuthenticated, path, push, role]);

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
