import NextAuth from 'next-auth/next';
import { config } from '@/helpers/auth';

export const runtime = 'edge';

const handler = NextAuth(config);

export { handler as GET, handler as POST };
