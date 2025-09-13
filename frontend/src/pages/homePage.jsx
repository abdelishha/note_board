import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import api from "../lib/axios"
import NavBar from '../Components/NavBar'
import RateLimitedUI from '../Components/RateLimitedUI'
import toast from 'react-hot-toast'
import NoteCard from '../Components/NoteCard'
import NoteNotFound from '../Components/NoteNotFound'

const HomePage = () => {
  const navigate = useNavigate()
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        // Add authorization header
        const res = await api.get("/notes", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        })
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.error("Fetch notes error:", error)
        if (error.response?.status === 429) {
          setIsRateLimited(true)
        } else if (error.response?.status === 401) {
          sessionStorage.removeItem('token')
          navigate('/')
        } else if(error.response?.status === 404){
          setNotes([])
        } else {
          toast.error("Failed to load notes")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="min-h-screen w-full bg-black">    
      <NavBar onLogout={handleLogout} />
      
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading ? (
          <div className="text-center text-primary py-10">Loading notes...</div>
        ) : notes.length === 0 && !isRateLimited ? (
          <NoteNotFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage