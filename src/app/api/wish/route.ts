import connectMongoDB from '@/lib/mongodb';
import Wish from '@/models/Wish';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  const { senderName, recipientName, wish } = await request.json();

  try {
    await connectMongoDB();
    const newWish = await Wish.create({ senderName, recipientName, wish });
    return NextResponse.json(newWish, { status: 201 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
