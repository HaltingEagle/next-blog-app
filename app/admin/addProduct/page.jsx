"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { assets } from '@/assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Page = () => {
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        title:"",
        description:"",
        category:"Startup",
        author:"Alex Bob",
        authorImg: "/author_img.png",
    });

    const onChangeHandler = (e) => {
        setData(data => ({ ...data, [e.target.name]: e.target.value }));
        console.log(data);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("author", data.author);
        formData.append("authorImg", data.authorImg);
        const res = await axios.post('/api/blog', formData);
        if(res.data.success) {
            toast.success(res.data.msg);
            setImage(false);
            setData({
                title:"",
                description:"",
                category:"Startup",
                author:"Alex Bob",
                authorImg: "/author_img.png",
            })
        }
        else{
            toast.error(res.data.msg);
        }
    }
    return (
        <>
            <form onSubmit={(e) => submitHandler(e)} className='px-5 pt-5 sm:pt-12 sm:pl-16'>
                <p className='text-xl'>Upload thumbnail:</p>
                <label htmlFor="image">
                    <Image src={!image?assets.upload_area:URL.createObjectURL(image)} alt='upload icon' width={140} height={70} className='mt-4 cursor-pointer'/>
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required/>
                
                <p className='mt-4 text-xl'>Blog Title:</p>
                <input name='title' onChange={(e) => onChangeHandler(e)} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type='text' placeholder='Type Here' required/>

                <p className='mt-4 text-xl'>Blog Description:</p>
                <textarea className='w-full sm:w-[500px] mt-4 px-4 py-3 border' onChange={(e) => onChangeHandler(e)} value={data.description} name='description' type='text' placeholder='Type Content Here' rows={6} required/>

                <p className='mt-4 text-xl'>Blog Category:</p>
                <select className='w-40 px-4 py-3 mt-4 text-gray-500 border' onChange={(e) => onChangeHandler(e)} value={data.category} name="category" >
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
                <br />
                <button type='submit' className='w-40 h-12 mt-8 text-white bg-black' >ADD</button>
            </form>
        </>
    )
}

export default Page