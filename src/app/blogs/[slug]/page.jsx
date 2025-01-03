'use client'
import Swal from 'sweetalert2';
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm' 
import remarkHtml from 'remark-html' 
import rehypeRaw from 'rehype-raw' 
import { AuthContext } from '../../../context/AuthContext'
import './BlogContent.css'

const BlogPage = ({ params, content }) => {
  const { slug } = React.use(params) 
  const [blog, setBlog] = useState(null)
  const [previousBlogSlug, setPreviousBlogSlug] = useState(null)
  const [nextBlogSlug, setNextBlogSlug] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const { userData, currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (slug) {
      fetchBlog(slug)
    }
  }, [slug])

  const fetchBlog = async (slug) => {
    try {
      const response = await fetch(`http://localhost:8000/api/blogs/${slug}`)
      const data = await response.json()
      setBlog(data)
      setPreviousBlogSlug((parseInt(slug) - 1).toString())  
      setNextBlogSlug((parseInt(slug) + 1).toString()) 
    } catch (error) {
      console.error('Error fetching blog:', error)
    }
  }

  // Kirim Komentar
  const submitComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
  
    const token = localStorage.getItem('user_token'); 
    const userId = userData?.id; 
  
    const commentData = {
      content: newComment,
      blog_id: blog.id,
      user_id: userId,
    };
  
    try {
      const response = await fetch('http://localhost:8000/api/comments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',

        },
        body: JSON.stringify(commentData),
      });
  
      // Cek apakah response status 200-299
      if (response.ok) {
        const data = await response.json(); // Hanya parse JSON jika OK
        setNewComment('');
        Swal.fire({
          title: 'Komentar Terkirim',
          text: 'Komentar Anda telah berhasil dikirim.',
          icon: 'success',
        });
        // location.reload()
        router.push('')
        return
      } else {
        // Tangani jika server mengembalikan status error (misal 401, 403, dsb)
        const data = await response.json();
        Swal.fire({
          title: 'Gagal',
          text: data.message || 'Ada masalah dalam mengirim komentar.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      Swal.fire({
        title: 'Terjadi Kesalahan',
        text: 'Tidak dapat mengirim komentar. Silakan coba lagi nanti.',
        icon: 'error',
      });
    }
  };
  
  console.log('blog',userData )

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user_token'))
  }, [])

  return (
    <div className="container mx-auto p-6">
      {/* Menampilkan Blog */}
      {blog ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-gray-600 mb-2 text-sm pl-2">
            <span className='pr-1'>{blog.category?.name}</span>
            <span className='pr-2'>{new Date(blog.created_at).toLocaleDateString()}</span>
            - 
            <span className='pl-2'>Written by {blog?.user?.name} </span>
          </div>
          <h1 className="text-9xl font-thin font-serif text-gray-800 mb-4 w-max-1/2">{blog.title}</h1>
          <div className='font-light font-sans my-5 mb-3 pl-2 italic'>
            "{blog?.description}"
          </div>
          <div className='flex justify-center'>
            <img 
              src="/resources/images/heheheha.png" 
              alt="Blog Image" 
              className="w-8/12 h-1/5 object-cover rounded-none mb-6 "
            />
          </div>


          <ReactMarkdown 
            className={'pl-2 font-light font-sans mt-5 container mx-auto w-10/12'}
            children={blog.content} 
            remarkPlugins={[remarkGfm, remarkHtml]} 
            rehypePlugins={[rehypeRaw]} 
            components={{
              blockquote: ({node, ...props}) => (
                <blockquote className="custom-blockquote" {...props} />
              ),
              p: ({node, ...props}) => (
                <p className="custom-paragraph" {...props} />
              ),
            }}
            // dangerouslySetInnerHTML={{ __html: content }} 
          />
          {/* <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="text-gray-800 leading-7"
          ></div> */}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No content yet...</p>
        </div>
      )}

      {/* Menampilkan Komentar */}
      {blog?.comments?.length > 0 && (
        <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Comments</h3>
        <div className="max-h-56 overflow-y-auto"> {/* Membatasi tinggi dan menambahkan scroll */}
          {blog.comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="text-gray-800 font-semibold">{comment.user?.name}</div>
              <div className="text-gray-600">{comment.content}</div>
              <div className="text-sm text-gray-500">
                {new Date(comment.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Jika tidak ada komentar */}
      {blog?.comments?.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}

      {/* Formulir Komentar */}
      {isLoggedIn && (
        <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Leave a Comment</h3>
          <form onSubmit={submitComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            ></textarea>
            <button
              type="submit"
              disabled={!newComment.trim() || !isLoggedIn}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Submit Comment
            </button>
          </form>
        </div>
      )}

      {/* Tombol untuk Post Sebelumnya dan Berikutnya */}
      <div className="mt-8 flex justify-between">
        {previousBlogSlug && (
          <button
            onClick={() => router.push(`/blogs/${previousBlogSlug}`)}
            className="text-blue-500 hover:underline"
          >
            Older Post
          </button>
        )}
        {nextBlogSlug && (
          <button
            onClick={() => router.push(`/blogs/${nextBlogSlug}`)}
            className="text-blue-500 hover:underline"
          >
            Newer Post
          </button>
        )}
      </div>
    </div>
  )
}

export default BlogPage
