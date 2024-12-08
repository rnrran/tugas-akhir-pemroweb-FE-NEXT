'use client'
// components/Header.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SideBar from '../components/menu/SideBar';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Menambahkan event listener untuk mendeteksi tombol ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        toggleMenu();  
      }
    };

    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]); 

  return (
    <header className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Kiri: Nama Aplikasi */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="text-5xl font-bold text-gray-900 font-serif">wleowleo.</div>
          </Link>
        </div>

        {/* Kanan: Menu Navigasi dan Tombol Burger (untuk mobile) */}
        <div className="flex items-center space-x-6">
          {/* Menu Navigasi untuk Web */}
          <div className="hidden md:flex items-center space-x-6">
            <a href={'/'}>
              <span className="text-gray-900 hover:text-gray-600 hover:border-b-2 border-gray-300 sm:ml-12">All Reviews</span>
            </a>
            
            {/* Ganti button dengan <a> */}
            <a href='/?category=Books'>
              <span className="text-gray-900 hover:text-gray-600 hover:border-b-2 border-gray-300">Books</span>
            </a>
            
            <a href='/?category=Comics'>
              <span className="text-gray-900 hover:text-gray-600 hover:border-b-2 border-gray-300">Comics</span>
            </a>
            
            <a href='/?category=Films'>
              <span className="text-gray-900 hover:text-gray-600 hover:border-b-2 border-gray-300">Films</span>
            </a>
            
            <a href='/?category=Animation'>
              <span className="text-gray-900 hover:text-gray-600 hover:border-b-2 border-gray-300">Animations</span>
            </a>
            
            <a href='/?category=Documentation'>
              <span className="text-gray-900 hover:text-gray-600 hover:border-b-2 border-gray-300">Tech Documentation</span>
            </a>
            
            <a href='/?category=Others'>
              <span className="text-gray-900 hover:text-gray-600 hover:border-b-2 border-gray-300">Others</span>
            </a>
            
            <Link href={'#'}>
              <span className="text-gray-900 hover:text-gray-600 hover:border-b-2 border-gray-300">About</span>
            </Link>
            
            <Link href={'#'}>
              <span className="text-gray-900 hover:text-gray-600 hover:border-b-2 border-gray-300">Contact</span>
            </Link>
          </div>

          {/* Tombol Burger Menu untuk Mobile */}
          <button onClick={toggleMenu} className="text-gray-900 p-2 ml-28 rounded-full border-2 border-gray-900 text-xs bg-gray-200 hover:bg-gray-300">
            <span>menu</span>
          </button>
        </div>
      </div>

      {/* Menu Burger dengan Semua Menu (Untuk Mobile) */}
      {isMenuOpen && (
        <SideBar toggleMenu={toggleMenu}/>
      )}
    </header>
  );
};

export default Header;
