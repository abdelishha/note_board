import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const orbVariants = {
  animate: (custom) => ({
    y: [0, custom, 0],
    x: [0, custom / 2, 0],
    transition: {
      duration: 10 + Math.random() * 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

const marqueeVariants = {
  animate: {
    x: ['100%', '-100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 18,
        ease: 'linear',
      },
    },
  },
};

const OpeningPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Animated Forest Orbs/Leaves */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Green orb top left */}
        <motion.div
          className="absolute top-[-6rem] left-[-6rem] w-96 h-96 bg-green-700 bg-opacity-30 rounded-full blur-3xl"
          custom={40}
          variants={orbVariants}
          animate="animate"
        />
        {/* Green orb bottom right */}
        <motion.div
          className="absolute bottom-[-8rem] right-[-8rem] w-[32rem] h-[32rem] bg-green-900 bg-opacity-40 rounded-full blur-3xl"
          custom={-60}
          variants={orbVariants}
          animate="animate"
        />
        {/* Smaller orb center left */}
        <motion.div
          className="absolute top-1/2 left-[-4rem] w-40 h-40 bg-emerald-600 bg-opacity-30 rounded-full blur-2xl"
          custom={30}
          variants={orbVariants}
          animate="animate"
        />
        {/* Smaller orb center right */}
        <motion.div
          className="absolute bottom-1/3 right-[-3rem] w-32 h-32 bg-lime-700 bg-opacity-20 rounded-full blur-2xl"
          custom={-25}
          variants={orbVariants}
          animate="animate"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </motion.div>

      {/* Marquee Text */}
      <div className="w-full max-w-2xl mb-8 z-20 overflow-hidden">
        <motion.div
          className="whitespace-nowrap text-lg md:text-xl font-semibold text-primary/90 tracking-wide"
          variants={marqueeVariants}
          animate="animate"
        >
          Welcome to Note Book - Capture your thoughts, organize your ideas, and bring your creativity to life! &nbsp; Welcome to Note Book – Capture your thoughts, organize your ideas, and bring your creativity to life!
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-2xl px-8 py-20 rounded-3xl shadow-2xl bg-black flex flex-col items-center justify-center border border-base-300 z-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 font-mono tracking-tight text-center">
          Welcome to Note Book
        </h1>
        <p className="text-xl text-base-content/70 mb-12 text-center">
          Capture your thoughts, organize your ideas, and bring your creativity to life.<br/>
          Start your journey by logging in or creating a new account.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary w-48 sm:w-56 text-lg"
            onClick={() => navigate('/login')}
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-outline btn-success w-48 sm:w-56 text-lg"
            onClick={() => navigate('/signup')}
          >
            Register
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default OpeningPage; 