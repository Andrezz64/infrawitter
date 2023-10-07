import prisma from "../utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();

  

  if (req.title && req.content) {
   
    await prisma.post.create({
      data: {
        title: req.title,
        content: req.content,
      },
    });
    return NextResponse.json({ data: prisma.post.count(), msg: req.title });
  }
  return  NextResponse.json({error:"titulo ou menssagem faltando"})
}

export async function GET() {
  const getPosts = await prisma.post.findMany({orderBy:{
    createdat:"desc"
  },
  take:50
})

  return NextResponse.json(getPosts);
}

export async function PATCH(request: NextRequest){
  const req = await request.json();
  console.log(req)
  const atualizaPosts = await prisma.post.update({
    where:{
      id: req.id
    },
    data:{
      title: req.title,
      content: req.content
    }
  })
  return NextResponse.json(atualizaPosts)
}