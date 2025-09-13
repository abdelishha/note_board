import React from 'react'
import { Link, useNavigate } from 'react-router'
import { PlusIcon, LogOutIcon } from 'lucide-react' 

const NavBar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <header className='bg-base-300 border-b border-base-content/10'>
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>Note Book</h1>
          <div className='flex items-center gap-4'>
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className='h-5 w-5'/>
              <span>New Note</span>
            </Link>
            
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="btn btn-ghost hover:btn-error" // DaisyUI classes
              title="Logout"
            >
              <LogOutIcon className='h-5 w-5'/>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar