import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'

const Layout = () => {
    const navigate= useNavigate()
    const logout = ()=>{
    //     localStorage.removeItem('user')
        navigate('/')
    }
  return (
    <>
     <div className='flex justify-between items-center py-2 px-4 h-[70px] sm:px-12 border-b border-gray-200'>
        <img src={assets.logo} alt="" className='w-32 cursor-pointer sm:w-40 ' onClick={()=>navigate('/')}/>
        <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
     </div>
     <div className='flex h-[calc(100vh-70px)]'>
      <Sidebar />
      <Outlet />
     </div>
    </>
  )
}

export default Layout