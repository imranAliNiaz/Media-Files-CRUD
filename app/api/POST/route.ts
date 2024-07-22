import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
 export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const fileStr = await  request.json();

     const result= await sql`INSERT INTO  urls (url,format) VALUES (${fileStr.url},${fileStr.format});`;
    return NextResponse.json({ data:result,sucess:true}, { status: 200 });
   
  } catch(e){
    return NextResponse.json({error:"Error"})
  }
};
