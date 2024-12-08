'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'; 

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/blogs');
        const data = await res.json();
        setBlogs(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));

        // Ambil kategori unik dari blog
        const uniqueCategories = [...new Set(data.map(blog => blog.category.name))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    // Parsing query parameter category dari URL
    const queryParams = new URLSearchParams(window.location.search);
    const category = queryParams.get('category');
    if (category) {
      setSelectedCategory(category); // Setel selectedCategory dari query parameter
    }
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    return selectedCategory ? blog.category.name.toLowerCase() === selectedCategory.toLowerCase() : true;
  });

  useEffect(() => {
    setTotalPages(Math.ceil(filteredBlogs.length / itemsPerPage));
  }, [filteredBlogs]);

  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    // Update query string pada URL dengan kategori yang dipilih
    const queryParams = new URLSearchParams(window.location.search);
    if (category) {
      queryParams.set('category', category); // Set query parameter 'category'
    } else {
      queryParams.delete('category'); // Hapus query parameter jika tidak ada kategori
    }
    window.history.replaceState(null, '', `?${queryParams.toString()}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl underline font-thin font-serif text-center my-8">Blog List</h1>

      {/* Filter Kategori */}
      {/* <div className="mb-6">
        <select 
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border px-4 py-2 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category, idx) => (
            <option key={idx} value={category}>{category}</option>
          ))}
        </select>
      </div> */}

      {/* Menampilkan Daftar Blog */}
      {filteredBlogs.length > 0 ? (
        <div className="space-y-6">
          {paginatedBlogs.map((blog) => (
            <div key={blog.id} className="flex items-center bg-white shadow-md rounded-lg overflow-hidden p-6">
              <div className="h-36 w-20 sm:h-48 sm:w-27 lg:w-72 lg:h-96 relative mr-6">
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Blog Image" 
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-1 mb-2">
                  <span className="text-gray-500 text-sm">{blog.category.name}</span>
                  <span className="text-gray-500 font-bold text-sm">•</span>
                  <span className="text-gray-500 text-sm">{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>
                <h2 className="text-7xl font-extralight font-serif text-gray-800 mb-5">{blog.title}</h2>
                <p className="text-gray-600 mt-2">{blog.description}</p>
                <div className="mt-4">
                  <Link href={`/blogs/${blog.id}`}>
                    <span className="text-blue-500 font-mono text-md underline">Read More</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No blog available at the moment.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          {currentPage > 1 && (
            <button 
              onClick={() => setCurrentPage(currentPage - 1)} 
              className="text-blue-500 hover:underline"
            >
              Newer Posts
            </button>
          )}
          {currentPage < totalPages && (
            <button 
              onClick={() => setCurrentPage(currentPage + 1)} 
              className="text-blue-500 hover:underline ml-auto"
            >
              Older Posts
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogsList;
