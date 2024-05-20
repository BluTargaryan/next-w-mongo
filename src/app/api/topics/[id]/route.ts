import { NextRequest,NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Topic from "../../../../../models/topic";

interface Request {
    json: () => { newTitle: string; newDescription: string };
  }

export async function PUT(req:Request, {params}:any){
  const {id} = params
  const {newTitle:title, newDescription:description} = await req.json()
  await connectMongoDB()
  await Topic.findByIdAndUpdate(id, {title, description})
  return NextResponse.json({message:"Topic updated"}, {status:200})
}

export async function GET(req:Request, {params}:any){
 const {id} = params
 await connectMongoDB()
 const topic = await Topic.findOne({_id:id})
 return NextResponse.json({topic}, {status:200})
  }