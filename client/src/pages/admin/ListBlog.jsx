import React, { useEffect, useState } from 'react'

import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../../context/AppContext'
import toast from 'react-hot-toast'

const ListBlog = () => {

  const [blogs, setBlogs] = useState([])
  const {axios}= useAppContext()

  const fetchBlogs = async () => {
    try {
      const {data}= await axios.get('/api/admin/blogs')
      console.log(data)
      if(data.success){
        setBlogs(data.blogs)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-6 bg-blue-50/50'>
      <h1>All Blogs</h1>

      <div className='relative h-4/5 mt-4 overflow-x-auto shadow rounded-lg scrollbar-hide max-w-4xl  bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-gray-600 uppercase text-left text-xs'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6'> #</th>
                <th scope='col' className='px-2 py-4'> Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'> Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'> Status</th>
                <th scope='col' className='px-2 py-4'> Actions</th>
              </tr>
            </thead>
            <tbody>
               {blogs.map((item, index) => {
                return <BlogTableItem key={item._id} blog={item} fetchBlogs={fetchBlogs} index={index + 1} />
               })}
            </tbody>
          </table>
        </div>

    </div>
  )
}

export default ListBlog