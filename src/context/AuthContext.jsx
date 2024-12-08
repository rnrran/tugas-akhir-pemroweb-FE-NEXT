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

  // Memantau perubahan state.currentUser dan state.userToken
  useEffect(() => {
    // console.log('State changed:', state);

    if (state.currentUser) {
    //   console.log('Saving currentUser to localStorage:', state.currentUser);
      localStorage.setItem('user', JSON.stringify(state.currentUser));
    } else {
      console.log('Removing currentUser from localStorage');
      localStorage.removeItem('user');
    }

    if (state.userToken) {
    //   console.log('Saving userToken to localStorage:', state.userToken);
      localStorage.setItem('user_token', state.userToken);
    } else {
    //   console.log('Removing userToken from localStorage');
      localStorage.removeItem('user_token');
    }
  }, [state.currentUser, state.userToken]);

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
            // console.log('Fetched user data:', userData);
            dispatch({
              type: 'SET_USER',
              payload: userData, 
            });
            setData(userData); 
          } else {
            console.error('Error fetching user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUser();
  }, [state.userToken, dispatch]); // Ketika token berubah, fetch ulang data user

  return (
    // current user = token, userData = profil
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch, userData: data }}>
      {children}
    </AuthContext.Provider>
  );
};
