"use client";
import { useEffect, useState } from "react";
import { assets, blog_data } from "@/assets/assets";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
const Page = () => {
    const [data, setData] = useState(null);
    const {id} = useParams();
    const fetchBlogData = async () => {
        console.log(id)
        const res = await axios.get(`/api/blog?id=${id}`);
        console.log(res.data)
        setData(res.data.blog);
    };

    useEffect(() => {
        fetchBlogData();
    }, []);

    return (
            data ? (
                <>
                    <div className="px-5 py-5 bg-gray-200 md:px-12 lg:px-28">
                        <div className="flex items-center justify-between">
                            <Link href={"/"}>
                                <Image src={assets.logo} alt="logo"  width={180} className="w-[130px] sm:w-auto" />
                            </Link>
                            <button className="flex items-center gap-2 px-3 py-1 font-medium border border-black border-solid sm:py-3 sm:px-6 shadow-[-7px_7px_0px_#000000]">Get Started <Image src={assets.arrow} alt="arrow" width={12} /></button>
                        </div>
                        <div className="my-24 text-center">
                            <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
                            <Image src={data.author_img} alt="author picture" width={60} height={60} className="mx-auto mt-6 border border-white rounded-full" />
                            <p className="pb-2 mt-1 text-lg max-w-[740px] m-auto">{data.author}</p>
                        </div>
                    </div>
                    <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
                        <Image className="border-4 border-white" src={data.image} alt="blog_pic" width={1280} height={720} />
                        <div className="blog-content" dangerouslySetInnerHTML={{__html: data.description}}>
                        </div>
                        <div className="my-24">
                            <p className="my-4 font-semibold text-black">Share this article on social media</p>
                            <div className="flex">
                                <Image src={assets.facebook_icon} alt="facebook" width={50} />
                                <Image src={assets.twitter_icon} alt="twitter" width={50}  />
                                <Image src={assets.googleplus_icon} alt="googleplus" width={50} />
                            </div>
                        </div>

                    </div>
                    <Footer/>
                </>
            ) : (
                <></>
            )
    );
};

export default Page;
