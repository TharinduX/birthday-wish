import connectMongoDB from '@/lib/mongodb';
import Wish from '@/models/Wish';
import { NextResponse } from 'next/server';



//get single wish
export async function GET(
  request: any,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const wish = await Wish.findById(params.id);
    return NextResponse.json(wish, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
