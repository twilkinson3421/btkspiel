import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, game }: { name: string; game: { id: number; name: string; slug: string } } = await req.json();

    await connectMongoDB();
    await User.updateOne({ name }, { $push: { 'games.wishlist': game } });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
