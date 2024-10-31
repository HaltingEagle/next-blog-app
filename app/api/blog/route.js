import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
import {writeFile} from "fs/promises"
const { NextResponse } = require("next/server")
const fs = require("fs");


const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

export async function GET(req){
    const blogId = req.nextUrl.searchParams.get("id");
    if(blogId){
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json({success: true, blog});
    }
    const blogs = await BlogModel.find();
    console.log(blogs);
    return NextResponse.json({success: true, blogs});
}

export async function POST(req){
    const formData = await req.formData();
    const timeStamp = Date.now();
    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timeStamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timeStamp}_${image.name}`;
    const blogData = {
        title: `${formData.get("title")}`,
        description: `${formData.get("description")}`,
        category: `${formData.get("category")}`,
        author: `${formData.get("author")}`,
        image: imgUrl,
        author_img: `${formData.get("authorImg")}`,
    }
    await BlogModel.create(blogData);
    console.log("Blog Saved");
    return NextResponse.json({success: true, msg: "Blog Saved"});
}

export async function DELETE(req){
    const blogId = req.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(blogId);
    fs.unlinkSync(`./public/${blog.image}`, () =>{});
    await BlogModel.findByIdAndDelete(blogId);
    return NextResponse.json({success: true, msg: "Blog Deleted"});
}