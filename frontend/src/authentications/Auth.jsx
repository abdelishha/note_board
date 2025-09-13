import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const Auth = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email.trim() || !password.trim()) {
    toast.error("Both fields are required");
    return;
  }
  setIsLoading(true);
  try {
    const { data } = await api.post("/auths/login", {
      email,
      password
    });
    sessionStorage.setItem('token', data.token);
    navigate('/home');
  } catch (error) {
    console.error("Login error:", error);
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-2xl px-8 py-16 rounded-3xl shadow-2xl bg-black flex flex-col items-center border border-base-300"
      >
        <div className="text-center text-4xl font-bold text-primary mb-8 font-mono tracking-tight">Log In</div>
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
          {isLoading ? 'Logging in...' : 'LOG IN'}
        </button>
        <Link 
          to="/forgot-password" 
          className="text-center font-semibold text-base-content/60 hover:text-primary mb-4"
        >
          FORGOT PASSWORD?
        </Link>
        <p className="text-center text-lg">
          No account?
          <Link 
            to="/signup" 
            className="font-medium text-primary underline-offset-4 hover:underline ml-1"
          >
            Create One
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Auth