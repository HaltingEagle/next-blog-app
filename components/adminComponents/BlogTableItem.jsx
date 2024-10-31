import React from 'react'
import Image from 'next/image'
import {assets} from '@/assets/assets'
const BlogTableItem = ({authorImg, title,author, date, deleteBlog, mongoId}) => {
    const BlogDate = new Date(date);

    return (
        <tr className='bg-white border-b'>
            <th scope='row' className='items-center hidden gap-3 px-6 py-4 font-medium text-gray-900 sm:flex whitespace-nowrap'>
                <Image src={authorImg?authorImg:assets.profile_icon} alt='avatar' width={40} height={40}/>
                <p>{author?author:"No Author"}</p>
            </th>
            <td className='px-6 py-4'>
                {title?title:"No Title"}
            </td>

            <td className='px-6 py-4'>
                {BlogDate.toDateString()}
            </td>

            <td onClick={() => deleteBlog(mongoId)} className='px-6 py-4 text-white bg-red-600 border border-black cursor-pointer'>
                <button >x</button>
            </td>
        </tr>
    )
}

export default BlogTableItem