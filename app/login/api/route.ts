import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const req = await request.json();
  
    if(req.senha == process.env.SENHA){
        return  NextResponse.json({Sucess:"AcessoPermitido"})
    }
  

    
    return  NextResponse.json({Error:"AcessoNegado"})
  }