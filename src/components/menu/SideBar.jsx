'use client'
import Swal from 'sweetalert2';  
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext' 
import { useRouter } from 'next/navigation';

const SideBar = ({ toggleMenu }) => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const { push } = useRouter()

  // Fungsi untuk logout
  const handleLogout = async () => {
    const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Anda akan keluar dari akun ini.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, keluar!',
        cancelButtonText: 'Batal',
      });

      if (result.isConfirmed) {
        try {
          // Mengambil token dari localStorage atau dari state
          const token = localStorage.getItem('user_token') || state.userToken;
      
          // Melakukan request POST ke API logout
          const response = await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          });
      
          if (response.ok) {
            // Jika logout berhasil, dispatch LOGOUT dan redirect ke halaman login
            dispatch({ type: 'LOGOUT' });
            localStorage.removeItem('user');
            localStorage.removeItem('user_token');

            await Swal.fire({
                title: 'logout sukses!',
                text: 'dadah.',
                icon: 'success',
                confirmButtonText: 'OK',
              });

            window.location.href = '/'; // Redirect ke halaman utama atau login
          } else {
            // Jika terjadi error saat logout, tampilkan pesan error
            const errorData = await response.json();
            console.error('Logout failed:', errorData.message);
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
      } else {
        // Jika pembatalan logout, tidak melakukan apa-apa
        console.log('Logout dibatalkan');
      }
    };
  

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
        <div className="fixed top-0 right-0 w-96 bg-white h-full shadow-lg z-50 p-6 space-y-6">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-green-400 hover:text-black hover:border-none rounded-full pr-2 pl-2 pb-1 border-1 border-black bg-white hover:bg-gray-300 text-xs"
          >
            <span>x</span>
          </button>

            <Link href="/" className='flex justify-center'>
                <div className="block text-black font-semibold hover:text-green-600 font-serif text-4xl mb-4">
                    Mierda
                </div>
            </Link>
          <div className="max-h-[80vh] overflow-y-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr>
                  <th>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <a href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                      All Review
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <a href="/?category=Books" className="block text-gray-600 font-semibold hover:text-green-600">
                      Books
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <a href="/?category=Comics" className="block text-gray-600 font-semibold hover:text-green-600">
                      Comics
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <a href="/?category=Films" className="block text-gray-600 font-semibold hover:text-green-600">
                      Films
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <a href="/?category=Animation" className="block text-gray-600 font-semibold hover:text-green-600">
                      Animations
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <Link href="/Resume" className="block text-gray-600 font-semibold hover:text-green-600">
                      Resume
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <Link href="/Project" className="block text-gray-600 font-semibold hover:text-green-600">
                      Project
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <a href="/?category=Documentation" className="block text-gray-600 font-semibold hover:text-green-600">
                      Tech Documentations
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <Link href="/Resources" className="block text-gray-600 font-semibold hover:text-green-600">
                      Study Resources
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <Link href="/Music" className="block text-gray-600 font-semibold hover:text-green-600">
                      Music
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <Link href="https://github.com/rnrran" passHref className="block text-gray-600 font-semibold hover:text-green-600">
                      Github
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <Link href="#" className="block text-gray-600 font-semibold hover:text-green-600">
                      Linkedin
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                    <Link href="#" className="block text-gray-600 font-semibold hover:text-green-600">
                      X
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            {currentUser ? (
            <>
              <Link href="/profile">
                <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 my-2 text-xs">
                  Profile
                </button>
              </Link>
              <Link href="/write">
                <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 my-2 text-xs">
                  Tulis
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 my-2 text-xs"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 my-2 text-xs">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-xs">
                  Daftar
                </button>
              </Link>
            </>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
