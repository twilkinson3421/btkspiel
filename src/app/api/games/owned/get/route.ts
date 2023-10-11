import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ name });
    const { owned } = user?.games;

    return NextResponse.json({ owned }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
