import { NextResponse } from "next/server";
import { connectToDB } from "src/lib/connectDB";
import User from "src/models/user.modal";



connectToDB();
export async function POST(req){

  try {
    const body = await req.json();
    const {token} = body;
    const user = await User.findOne({verifyToken:token, verifyTokenExpirey:{$gt:Date.now()}});
    if(!user?._id) return NextResponse.json({msg:"invalid token", success:false},{status:400});

    user.isVerified = true;
    user.verifyToken = null;
    user.verifyTokenExpirey = null;
    user.save();
    return NextResponse.json({msg:"user verified", success:true},{status:200})
  } catch (error) {
    return NextResponse.json({msg:error.message, success:false},{status:500})
  }

}