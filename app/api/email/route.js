import { ConnectDB } from "@/lib/config/db"
import EmailModel from "@/lib/models/EmailModel";
import {writeFile} from "fs/promises"
const { NextResponse } = require("next/server")
const fs = require("fs");
const LoadDB = async () => {
    await ConnectDB();
}
export async function POST(req){
    const formData = await req.formData();
    const emailData = {
        email: `${formData.get("email")}`,
    }
    await EmailModel.create(emailData);
    return NextResponse.json({success: true, msg: "Email Saved"});
}

export async function GET(){
    const emails = await EmailModel.find();
    return NextResponse.json({success: true, emails});
}

export async function DELETE(req){
    const emailId = req.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(emailId);
    return NextResponse.json({success: true, msg: "Email Deleted"});
}
