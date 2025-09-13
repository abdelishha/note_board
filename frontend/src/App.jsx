import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router'
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/createPage"
import NoteDetail from "./pages/NoteDetail"
import Auth from './authentications/Auth'
import Signup from './authentications/Signup'
import NavBar from './Components/NavBar'
import OpeningPage from './pages/OpeningPage'
import { AnimatePresence, motion } from 'framer-motion'

// Basic ProtectedRoute - no token verification
const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token')
  return token ? children : <Navigate to="/login"/>
}

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};

const App = () => {
  const location = useLocation();
  return (
    <div data-theme="forest" className="relative h-full w-full min-h-screen">
      <div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black min-h-screen'>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <OpeningPage />
              </motion.div>
            } />
            <Route path="/login" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Auth />
              </motion.div>
            } />
            <Route path="/signup" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Signup />
              </motion.div>
            } />
            {/* Protected Routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <HomePage />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/create" element={
              <ProtectedRoute>
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <NavBar />
                  <CreatePage />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="/note/:id" element={
              <ProtectedRoute>
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <NavBar />
                  <NoteDetail />
                </motion.div>
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App