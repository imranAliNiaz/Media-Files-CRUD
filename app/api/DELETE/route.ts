import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await sql`DELETE FROM urls WHERE id = ${data.id};`
    return NextResponse.json({ data: result, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, success: false }, { status: 500 });
  }
}
