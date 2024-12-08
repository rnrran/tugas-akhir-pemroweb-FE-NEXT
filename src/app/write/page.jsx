'use client'

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';  // Import SweetAlert2

const WriteBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]); // Menyimpan kategori
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Ambil kategori dari API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categories');
        const data = await response.json();
        setCategories(data); // Simpan kategori ke dalam state
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  // Fungsi untuk mengirimkan data blog ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const userToken = localStorage.getItem('user_token');  // Token dari localStorage

    if (!userToken) {
      setError('Please log in first');
      setLoading(false);
      return;
    }

    const userId = 1; // Gantilah dengan ID pengguna yang aktif

    const blogData = {
      title,
      content,
      description,
      user_id: userId,
      category_id: categoryId,  // Kirim category_id
    };

    try {
      const response = await fetch('http://localhost:8000/api/blogs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (response.ok) {
        // Menampilkan konfirmasi menggunakan SweetAlert
        await Swal.fire({
          title: 'Blog Created!',
          text: 'Your blog has been created successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Reset form setelah berhasil menulis
        setTitle('');
        setContent('');
        setDescription('');
        setCategoryId('');
      } else {
        setError(data.message || 'Failed to create blog');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while creating the blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 mt-10 border-2 border-gray-200 shadow-xl">
      <h1 className="text-5xl font-serif text-center font-bold mb-3">Write a New Blog</h1>

      {error && (
        <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-600">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your blog title"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-gray-600">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your blog content"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-600">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Short description of your blog"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-600">Category</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteBlog;
