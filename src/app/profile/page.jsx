'use client'

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import ProfileForm from '../../components/form/ProfileForm';

const ProfilePage = () => {
  const { currentUser, userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

//   useEffect(() => {
//     if (!currentUser) {
//       router.push('/login');  // Redirect jika user belum login
//     }
//   }, [currentUser, router]);

  return (
    <div className="container mx-auto p-6 mt-10 border-2 border-gray-200 shadow-xl">
      <h1 className="text-5xl font-serif text-center font-bold mb-3">Profil</h1>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {currentUser ? (
        <ProfileForm currentUser={currentUser}/>
      ) : (
        <div className="mt-4">Loading...</div>
      )}
    </div>
  );
};

export default ProfilePage;
