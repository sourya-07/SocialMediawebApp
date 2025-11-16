import React, { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react';
import Loading from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { fetchConnections } from '../features/connections/connectionSlice';
import { useAuth } from '@clerk/clerk-react';

const Layout = () => {
  const user = useSelector((state) => state.user.value)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  useEffect(() => {
    const loadConnections = async () => {
      if (user) {
        const token = await getToken();
        dispatch(fetchConnections(token));
      }
    };
    loadConnections();
  }, [user, getToken, dispatch]);

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