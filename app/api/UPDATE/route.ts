import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
 export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  try {
    const data=await request.json() 
    console.log("EDIT DATA",data) 
    const result =await sql`UPDATE urls 
     SET url=${data.data.url},format=${data.data.format}
     WHERE id=${data.data.id};
     `
    return NextResponse.json({ data:result,sucess:true}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error,sucess:false }, { status: 500 });
  }
}