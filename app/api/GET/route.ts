import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
        //Specify the path you want to revalidate
        const path = request.nextUrl.searchParams.get('path') || '/';
        //Call the revalidatePath function and pass in the path parameter
        revalidatePath(path);
    const result = await sql`SELECT * FROM urls;`
    console.log("RESULT___________________________", result)
   
    // Set cache control headers to prevent caching
    const response = NextResponse.json({ data: result.rows, success: true }, { status: 200 });
    response.headers.set('Cache-Control', 'no-store');
 
    return response;
  } catch (error) {
    return NextResponse.json({ error, success: false }, { status: 500 });
  }
}
