import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    const $password = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.create({ name, email, password: $password });

    return NextResponse.json({ message: 'Successfully registered!' }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}
