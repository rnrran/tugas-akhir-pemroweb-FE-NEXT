'use client'
import {AuthContext} from '../../context/AuthContext'
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';  
const WriteBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userData } = useContext(AuthContext);
  // console.log(userData.id,"curr")


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categories');
        const data = await response.json();
        setCategories(data); 
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

    // Validasi: pastikan semua field diisi
    if (!title || !content || !description || !categoryId) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    const userToken = localStorage.getItem('user_token');
    if (!userToken) {
      setError('Please log in first');
      setLoading(false);
      return;
    }

    const blogData = {
      title,
      content,
      description,
      user_id: userData?.id,
      category_id: categoryId,
    };

    try {
      const result = await Swal.fire({
        title: 'Publish ?',
        text: 'Kamu yakin mempublish ini ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, publish!',
        cancelButtonText: 'Tak, batalkan!',
      });

      if (result.isConfirmed) {
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
          setTitle('');
          setContent('');
          setDescription('');
          setCategoryId('');
          Swal.fire({
            title: 'Sukses!',
            text: 'Tulisan kamu terpublish.',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: data.message || 'Failed to submit blog.',
            icon: 'error',
          });
        }
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 mt-10 border-2 border-gray-200 shadow-xl">
      <h1 className="text-5xl font-serif text-center font-bold mb-3">Tulis Blog</h1>

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
            placeholder="Masukan Judul"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-gray-600">Content &#40;markdown&#41;	</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Tulis konten"
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
            placeholder="Deskripsi disini"
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
            <option value="">Pilih Kategori</option>
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
            className="w-full py-3 bg-blue-600 text-white rounded-md"
            disabled={loading}
          >
            {loading ? 'tunggu...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteBlog;
