import { assets } from "@/assets/assets"
import Image from "next/image"
import Link from "next/link"


const Sidebar = () => {
    return (
        <div className="flex flex-col bg-slate-100">
            <div className="px-2 py-3 border border-black sm:pl-14">
                <Image src={assets.logo} alt='logo' width={120}/>
            </div>
            <div className="w-28 sm:w-80 h-[100vh] relative py-12 border border-black">
                <div className="w-[50%] sm:w-[80%] absolute right-0">
                    <Link href="/admin/addProduct" className="flex items-center gap-3 px-3 py-2 font-medium bg-white border border-black shadow-[-5px_5px_0px_#000000]">
                        <Image src={assets.add_icon} alt='home icon' width={28}/><p>Add Blogs</p>
                    </Link>

                    <Link href="/admin/blogList" className=" mt-5 flex items-center gap-3 px-3 py-2 font-medium bg-white border border-black shadow-[-5px_5px_0px_#000000]">
                        <Image src={assets.blog_icon} alt='home icon' width={28}/><p>Blog Lists</p>
                    </Link>

                    <Link href="/admin/subscription" className="mt-5 flex items-center gap-3 px-3 py-2 font-medium bg-white border border-black shadow-[-5px_5px_0px_#000000]">
                        <Image src={assets.email_icon} alt='home icon' width={28}/><p>Subscriptions</p>
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default Sidebar