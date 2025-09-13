import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const Signup = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required")
      return
    }
    setIsLoading(true)
    try {
      await api.post("/auths/signup", { 
        username, 
        email, 
        password 
      })
      toast.success("Account created successfully! Please login")
      navigate('/login')
    } catch (error) {
      console.error("Signup error:", error)
      if (error.response?.data?.error) {
        toast.error(error.response.data.message)
      } else if (error.response?.status === 409) {
        toast.error("Email already exists")
      } else {
        toast.error("Signup failed. Please try again")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black">
      <form 
        className="w-full max-w-2xl px-8 py-16 rounded-3xl shadow-2xl bg-black flex flex-col items-center border border-base-300"
        id="authform"
        onSubmit={handleSubmit}
      >
        <div className="text-center text-4xl font-bold text-primary mb-8 font-mono tracking-tight">Sign Up</div>
        <div className="w-full mb-6">
          <input 
            type="text" 
            placeholder="Username" 
            className="input input-bordered w-full bg-black text-white placeholder:italic"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="w-full mb-6">
          <input 
            type="email" 
            placeholder="Email" 
            className="input input-bordered w-full bg-black text-white placeholder:italic"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-full mb-8">
          <input 
            type="password" 
            placeholder="Password" 
            className="input input-bordered w-full bg-black text-white placeholder:italic"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-full text-lg mb-4"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
        <p className="text-center text-lg">
          Already have an account?{' '}
          <a 
            href="/login" 
            className="font-medium text-primary underline-offset-4 hover:underline ml-1"
            onClick={(e) => {
              e.preventDefault()
              navigate('/login')
            }}
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  )
}

export default Signup