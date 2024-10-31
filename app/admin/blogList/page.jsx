"use client"
import BlogTableItem from '@/components/adminComponents/BlogTableItem'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const Page = () => {
    const [blogs, setBlogs] = useState([])
    const fetchBlogs = async () => {
        const res = await axios.get('/api/blog');
        setBlogs(res.data.blogs);
    }

    const deleteBlog = async (mongoId) => {
        const res = await axios.delete(`/api/blog?id=${mongoId}`);
        toast.success(res.data.msg);
        fetchBlogs();
    }

    useEffect(() => {
        fetchBlogs();
    }, [])
    return (
        <div className='flex-1 px-5 pt-5 sm:pt-12 sm:pl-16'>
            <h1>All Blogs</h1>
            <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
                <table className="w-full text-sm text-gray-500">
                    <thead className='text-sm text-left text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='hidden px-6 py-3 sm:block'>
                                Author Name
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Blog Title
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Date
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((item,index)=>{
                            return <BlogTableItem key={index} mongoId={item._id} authorImg={item.authorImg} title={item.title} author={item.author} date={item.date} deleteBlog={deleteBlog}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page