'use client'
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; 
import { AuthContext } from '../../../../context/AuthContext';
const EditBlog = ({ params }) => {
  const { slug } = React.use(params) 
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const {currentUser, userData} = useContext(AuthContext);
  const {userRole, setUserRole} = useState('')
  // const [blogID, setBlogID] = useState('');
  const router = useRouter();


  // Fetch blog data based on slug
  useEffect(() => {
    if (slug) {
      fetchBlogData(slug);
    }
  }, [slug, userData]);

  const fetchBlogData = async (slug) => {
    try {
      const res = await fetch(`http://localhost:8000/api/blogs/${slug}`)
      const data = await res.json();
      // setUserRole(userData?.role)
      // Cek apakah user yang sedang login adalah admin atau author dari blog ini
      setBlog(data);
      console.log("haha:",data?.user_id)
      // if (userData?.role == 'admin' || data?.user_id == userData?.id) {
          // setBlogID(data?.id);
        setTitle(data.title);
        setContent(data.content);
        setCategoryId(data.category_id);
        setDescription(data.description);
      // }
      // else {
        Swal.fire({
          title: 'Akses Ditolak',
          text: 'Kamu bukan admin atau author dari tulisan ini!',
          icon: 'error',
        });
        router.push('/blogs'); // Redirect jika akses tidak diperbolehkan
        return; // Keluar dari fungsi jika akses ditolak
      // }
      
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle form submission to update blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedBlog = {
      title,
      content,
      category_id: categoryId,
      description,
    };
    console.log(userData?.role, blog)
    // if (userData?.role !== 'admin' || blog?.user_id !== userData.id) {
    //   // Jika bukan admin atau bukan author, tampilkan pesan
    //   Swal.fire({
    //     title: 'Akses Ditolak',
    //     text: 'Kamu bukan admin atau author dari tulisan ini!',
    //     icon: 'error',
    //   });
    //   router.push('/blogs');
    // }

    // else {
      const result = await Swal.fire({
        title: 'oke ?',
        text: "perbarui tulisan kakmu ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, update!',
        cancelButtonText: 'Batal',
      });


      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:8000/api/blogs/${blog.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBlog),
          });

          const data = await res.json();

          if (res.ok) {
            await Swal.fire({
              title: 'Blog Updated!',
              text: 'Your blog has been updated successfully.',
              icon: 'success',
            });
            router.push(`/blogs/${data?.id}`);
          } else {
            Swal.fire({
              title: 'Error',
              text: data.message || 'Failed to update blog.',
              icon: 'error',
            });
          }
        } catch (error) {
          console.error('Error updating blog:', error);
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong while updating the blog.',
            icon: 'error',
          });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); 
      }
    // }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-10 border-2 border-gray-200 shadow-xl">
      <h1 className="text-5xl font-serif text-center font-bold mb-3">Edit Blog</h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-600">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-semibold text-gray-600">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-600">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-semibold text-gray-600">Category</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Blog'}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
