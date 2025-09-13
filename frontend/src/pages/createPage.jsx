import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import api from "../lib/axios"
import {Link, Navigate} from 'react-router'
import { useState } from 'react'
import {useNavigate} from 'react-router'
import {useEffect} from 'react'
import {toast} from 'react-hot-toast'
const CreatePage = () => {
  const navigate = useNavigate()
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [authorized, setAuthorized] = useState(null);


  const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!title.trim() || !content.trim()){
            toast.error("All fields are required")
            return
        }
        setLoading(true)
        try{
           await api.post(`notes/`, { title, content }, {
             headers: {
               Authorization: `Bearer ${sessionStorage.getItem('token')}`
             }
           })
           toast.success("Note created successfully")
           navigate("/home")
        }catch(error){
          if (error.response && error.response.status === 401) {
            toast.error("Session expired. Please log in again.");
            setAuthorized(false);
          } else {
            console.log("Error creating note",error)
            toast.error("Failed")
          }
        } finally{setLoading(false)}
  }     
  return (
     <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
                <Link to = "/home" className = "btn btn-ghost mb-6">
                 <ArrowLeftIcon className='size-5' />
                  Back to Notes
                </Link>
                <div className='card bg-base-100'>
                    <div className='card-body'>
                        <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-control mb-4'>
                                <label className="label">
                                    <span className='label-text'>Title</span>
                                </label>
                                <input type='text' placeholder='Note Title' className='input input-bordered' value = {title} onChange = {(e) => setTitle(e.target.value)}>
                                </input>
                            </div>
                <div className='form-control mb-4'>
                    <label className='label'>
                        <span className='label-text'>Content</span>
                    </label>
                    <textarea placeholder = "write your note here..." className='textarea textarea-bordered h-32' value = {content} onChange = {(e) => setContent(e.target.value)}/>
                </div>
                <div className='card-actions justify-end'>
                    <button type = "submit" className='btn btn-primary' disabled = {loading}>
                        {loading ? "Creating...": "Create Note"}
                    </button>
                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     </div>
    
  )
}

export default CreatePage
