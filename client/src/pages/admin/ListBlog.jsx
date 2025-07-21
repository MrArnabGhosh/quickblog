import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'

const ListBlog = () => {

  const [blog, setBlog] = useState([])

  const fetchBlogs = async () => {
    setBlog(blog_data)
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
               {blog.map((blog, index) => {
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />
               })}
            </tbody>
          </table>
        </div>

    </div>
  )
}

export default ListBlog