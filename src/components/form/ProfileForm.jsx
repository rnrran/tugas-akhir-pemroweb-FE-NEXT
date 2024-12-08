'use client'

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';  

const ProfileForm = ( {currentUser} ) => {
  // Ambil data user dan token dari AuthContext
  const { userData } = useContext(AuthContext);
  const userToken = currentUser?.token
  console.log(userToken, "current")
  const [name, setName] = useState(userData?.name || '');  
  const [email, setEmail] = useState(userData?.email || '');  
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (userData) {
      setName(userData.name || ''); 
      setEmail(userData.email || '');  
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPasswordError('');

    // Validasi konfirmasi password
    if (password && password !== passwordConfirmation) {
      setPasswordError('Password dan konfirmasi password tidak cocok');
      setLoading(false);
      return;
    }

    const updatedData = { name, email };
    if (password) {
      updatedData.password = password;
      updatedData.password_confirmation = passwordConfirmation;
    }

    try {
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Profile updated successfully');
        location.reload();

      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('An error occurred while updating your profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Name</label>
        <input
          type="text"
          id="name"
          value={name || ''}  // Pastikan nilai value tidak undefined
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
        <input
          type="email"
          id="email"
          value={email || ''}  // Pastikan nilai value tidak undefined
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-600">New Password (Optional)</label>
        <input
          type="password"
          id="password"
          value={password || ''}  // Pastikan nilai value tidak undefined
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter new password (optional)"
        />
      </div>

      <div>
        <label htmlFor="passwordConfirmation" className="block text-sm font-semibold text-gray-600">Confirm Password</label>
        <input
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation || ''}  
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Confirm new password"
        />
      </div>

      {passwordError && (
        <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
          <strong>Error:</strong> {passwordError}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          className="w-full py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
