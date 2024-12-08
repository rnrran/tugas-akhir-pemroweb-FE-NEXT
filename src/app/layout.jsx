import React from 'react';
import './globals.css';
import Header from '../components/Header'
// Fungsi untuk menambahkan kelas font variabel
function App({ children }) {
  return (
    <html lang="en">
      <body className="geist-sans geist-mono antialiased">
      <Header/>
        {children}
      </body>
    </html>
  );
}

export default App;
