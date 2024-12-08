'use client'
import React from 'react';
import './globals.css';
import Header from '../components/Header'
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { AuthContext, AuthContextProvider } from '../context/AuthContext'

export default function RootLayout ({ children }) {
  return (
  <>
    <AuthContextProvider>
      <InnerLayout> { children } </InnerLayout>  
    </AuthContextProvider>  
  </>
)}

// Fungsi untuk menambahkan kelas font variabel
function InnerLayout({ children }) {
  const path = usePathname();
  const { push } = useRouter();

  return (
    <>
      <html lang="en">
        <body className="geist-sans geist-mono antialiased">
          <Header/>
          {children}
        </body>
      </html>
    </>
  );
}
