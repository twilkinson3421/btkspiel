import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// ! ROUTE IS FOR CHECKING IF USER WITH SAME NAME ALREADY EXISTS IN DATABASE - NOT FOR DUPLICATING A USER

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { name } = await req.json();
    const user = await User.findOne({ name });
    return user
      ? NextResponse.json({ message: `User with name ${name} already exists` }, { status: 409 })
      : NextResponse.json({ message: 'No user with this name' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
