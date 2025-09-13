import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../lib/axios'
import { LoaderIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link } from 'react-router'
import { ArrowLeftIcon,Trash2Icon } from 'lucide-react'
const NoteDetail = () => {
  const [note,setNote] = useState("")
  const [loading,setLoading] = useState(true)
  const [saving,setSaving] = useState(false)
  const navigate = useNavigate();

  const {id} = useParams();
  useEffect(() =>{
    const fetchNote = async () =>{
       setLoading(true)
        try{
          const res = await api.get(`/notes/${id}`,{
            headers:{
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
          })
          setNote(res.data)
        } catch(error){
          console.log("Error ",error)
          toast.error("Failed to fetch the note")
        } finally{
            setLoading(false)
        }
    }
    fetchNote()
  },[id]);
const handleDelete = async () => {
    if(!window.confirm("are you sure you want to delte")) return
    try{
       await api.delete(`/notes/${id}`,{
        headers:{
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
       })
       toast.success("deleted successfully")
       navigate("/home")
    } catch(error){
      console.log("error",error)
      toast.error("error occurred")
    }
}
const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note,{
        headers:{
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      toast.success("Note updated successfully");
      navigate("/home");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };
if(loading){
    return(
       <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
       </div>
    )
}
  return (
   <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/home" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetail
