import React from 'react'
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useUserStore } from '../stores/useUserStore';
import { Navigate, useNavigate } from 'react-router-dom';

const HomePage = () => {

  const {user,checkAuth,loading} = useUserStore();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if(!loading){
      navigate("/category-page");
    }
  }
  return (
    <div>
      <motion.div
        className='sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className='mt-6 text-center text-3xl font-extrabold text-yellow-400'>Your College Essentials</h1>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-blue-400'>We've got you covered</h2>
        {user && (
          <div className='flex items-center justify-center min-h-screen'>
          <button
            type='submit'
            className='w-full max-w-xs flex justify-center py-2 px-4 border border-transparent 
              rounded-md shadow-sm text-sm font-medium text-white bg-blue-600
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50'
            disabled={loading} onClick={handleSearchClick}
          >
            {loading ? (
              <>
                <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                Loading...
              </>
            ) : (
              <>
                <Search className='mr-2 h-5 w-5' aria-hidden='true' />
                Search
              </>
            )}
          </button>
        </div>
        
        
        )}
      </motion.div>
    </div>
  )
}

export default HomePage;