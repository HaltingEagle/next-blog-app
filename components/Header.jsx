import Image from 'next/image'
import React , {useState, useEffect} from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Header = () => {
    const [email, setEmail] = useState("")
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        const res = await axios.post('/api/email', formData);
        if(res.data.success) {
            toast.success(res.data.msg);
            setEmail("");
        }
        else{
            toast.error(res.data.msg);
        }
    }
    return (
        <div className='px-5 py-5 md:px-12 lg:px-28'>
            <div className="flex items-center justify-between">
                <Image src={assets.logo} alt='logo' className='w-[130px] sm:w-auto'/>
                <button className='flex items-center gap-2 px-3 py-1 font-medium border border-black border-solid sm:py-3 sm:px-6 shadow-[-7px_7px_0px_#000000]'>Get Started <Image src={assets.arrow} alt='arrow'/></button>
            </div>
            <div className="my-8 text-center">
                <h1 className='text-3xl font-medium sm:text-5xl'>Latest Blogs</h1>
                <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <form onSubmit={onSubmitHandler} action="" className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]'>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email' className='pl-4 outline-none'/>
                    <button type="submit" className='px-4 py-4 border-black border-1 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
                </form>
            </div>
        </div>
    )
}

export default Header