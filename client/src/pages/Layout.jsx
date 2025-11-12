import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react';
import { dummyUserData } from '../assets/assets';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';

const Layout = () => {
  const user = useSelector((state) => state.user.value)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return user ? (
    <div className='w-full flex h-screen'>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className='flex-1 bg-slate-50'>
        <Outlet />
      </div>
      {
        sidebarOpen ?
        <X className='absolute top3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={() => setSidebarOpen(false)} />
        :
        <Menu className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={() => setSidebarOpen(true)} />
      }
    </div>
  ) :
  <Loading />
}

export default Layout


// import React, { useState, useEffect } from 'react'
// import SideBar from '../components/SideBar'
// import { Outlet } from 'react-router-dom'
// import { Menu, X } from 'lucide-react';
// import Loading from '../components/Loading';
// import { useSelector } from 'react-redux';

// const Layout = () => {
//   const user = useSelector((state) => state.user.value)
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Add a timeout to stop loading after 5 seconds
//     const timeout = setTimeout(() => {
//       setIsLoading(false)
//     }, 5000)

//     if (user) {
//       setIsLoading(false)
//     }

//     return () => clearTimeout(timeout)
//   }, [user])

//   // Show loading only for first 5 seconds
//   if (isLoading && !user) {
//     return <Loading />
//   }

//   // If still no user after timeout, show error message
//   if (!user) {
//     return (
//       <div className='w-full h-screen flex items-center justify-center'>
//         <div className='text-center'>
//           <h2 className='text-2xl font-bold text-gray-900 mb-2'>Failed to load user data</h2>
//           <p className='text-gray-600 mb-4'>Please check your connection and try again</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
//           >
//             Reload Page
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className='w-full flex h-screen'>
//       <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className='flex-1 bg-slate-50'>
//         <Outlet />
//       </div>
//       {
//         sidebarOpen ?
//         <X className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={() => setSidebarOpen(false)} />
//         :
//         <Menu className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={() => setSidebarOpen(true)} />
//       }
//     </div>
//   )
// }

// export default Layout