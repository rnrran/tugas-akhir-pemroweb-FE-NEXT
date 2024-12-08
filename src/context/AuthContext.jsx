'use client'

import { createContext, useReducer, useEffect, useState } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  userToken: localStorage.getItem('user_token') || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [data, setData] = useState({});

  useEffect(() => {
    // Simpan currentUser ke localStorage saat ada perubahan
    if (state.currentUser) {
      localStorage.setItem('user', JSON.stringify(state.currentUser));
    } else {
      localStorage.removeItem('user');
    }

    if (state.userToken) {
      localStorage.setItem('user_token', state.userToken);
    } else {
      localStorage.removeItem('user_token');
    }
  }, [state]);
  
  // Fetch current user data setelah login berhasil dan token ada
  useEffect(() => {
    const fetchUser = async () => {
      if (state.userToken) {
        try {
          const response = await fetch('http://localhost:8000/api/current-user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${state.userToken}`,
              'Accept': 'application/json',
            },
          });
          const userData = await response.json();
          if (response.ok) {
            // Menyimpan data user ke state
            dispatch({
              type: 'SET_USER',
              payload: userData,
            });
            setData(userData); // Mengupdate data user
          } else {
            console.error('Error fetching user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUser();
  }, [state.userToken, dispatch]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch, userData: data }}>
      {children}
    </AuthContext.Provider>
  );
};
