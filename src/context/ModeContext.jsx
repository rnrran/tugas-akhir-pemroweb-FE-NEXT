// src/context/ModeContext.js
'use client'

import React, { createContext, useState, useContext } from 'react';

// Membuat context untuk mode
const ModeContext = createContext();

export const useMode = () => useContext(ModeContext);

export const ModeProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  return (
    <ModeContext.Provider value={{ isEditMode, toggleEditMode }}>
      {children}
    </ModeContext.Provider>
  );
};
