'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignupPage = () => {
  const [name, setName] = useState('')  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Fungsi signup
  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const password_confirmation = confirmPassword
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, 
          email,
          password,
          password_confirmation,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/login')
      } else {
        setError(data.message || 'Signup failed')
      }
    } catch (error) {
      alert('Gagal membuat akun')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 to-gray-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Daftar</h2>

        {error && (
          <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        <form onSubmit={signup} className="space-y-6">
          {/* Nama */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Nama</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm your password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>

          <div className="text-center mt-4">
            <span className='text-sm'>Ada akun? </span>
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:underline ml-1"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
