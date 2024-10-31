import { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'
const BlogList = () => {
    const [category, setCategory] = useState("All")
    const [blogs, setBlogs] = useState([])

    const fetchBlogs = async () => {
        const res = await axios.get('/api/blog');
        setBlogs(res.data.blogs);
    }

    useEffect(() => {
        fetchBlogs();
    }, [])
    return (
        <div>
            <div className="flex justify-center gap-6 my-10">
                <button onClick={() => setCategory("All")} className={`px-4 py-1 ${category === "All" ? "bg-black text-white" : "bg-white text-black"} rounded-sm`}>All</button>
                <button onClick={() => setCategory("Technology")} className={`px-4 py-1 ${category === "Technology" ? "bg-black text-white" : "bg-white text-black"} rounded-sm`}>Technology</button>
                <button onClick={() => setCategory("Startup")} className={`px-4 py-1 ${category === "Startup" ? "bg-black text-white" : "bg-white text-black"} rounded-sm`}>Startup</button>
                <button onClick={() => setCategory("Lifestyle")} className={`px-4 py-1 ${category === "Lifestyle" ? "bg-black text-white" : "bg-white text-black"} rounded-sm`}>Lifestyle</button>
            </div>
            <div className="flex flex-wrap justify-around gap-1 mb-16 gap-y-10 xl:mx-24">
                {blogs.filter(item => category === "All" ? item : item.category === category).map((item, index) => {
                    return (
                        <BlogItem key={index} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category} />
                    )
                })}
            </div>
        </div>
    )
}

export default BlogList