import Link from 'next/link';
import { useEffect } from 'react';
const SideBar = ({toggleMenu}) => {
    
    return (
        <>
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
          <div className="fixed top-0 right-0 w-96 bg-white h-full shadow-lg z-50 p-6 space-y-6">
            {/* Tombol Tutup */}
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-green-400 hover:text-black hover:border-none rounded-full pr-2 pl-2 pb-1 border-1 border-black bg-white hover:bg-gray-300 text-xs">
              <span>x</span>
            </button>

            {/* Menu Navigasi menggunakan table */}
            <div className="max-h-[70vh] overflow-y-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr>
                    <th>
                      <Link href="/">
                        <div className="block text-black font-semibold hover:text-green-600 font-serif text-4xl mb-4">Blog Iseng</div>
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Repeatable Table Rows */}
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        All Review
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        Books
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        Comics
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        Films
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        Animations
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        Resume
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        Project
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        Tech Documentations
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        Study Resources
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        Music
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        Github
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        Linkedin
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 hover:py-3 hover:px-5 hover:bg-gray-200 border-b-2">
                      <Link href="/" className="block text-gray-600 font-semibold hover:text-green-600">
                        X
                      </Link>
                    </td>
                  </tr>
                  {/* Add other rows similarly */}
                </tbody>
              </table>
            </div>

            {/* Tombol Login dan Sign Up */}
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login</button>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Up</button>
          </div>
        </div>
        </>
    )
}


export default SideBar;