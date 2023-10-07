'use client';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { useSession, signOut } from 'next-auth/react';

export default function Account() {
  const { data: session } = useSession();

  async function Logout() {
    await signOut();
  }

  return (
    <PageWrapper>
      <h1>My Account</h1>
      <span>{session?.user?.name}</span>
      <span>{session?.user?.email}</span>
      <button onClick={() => Logout()}>Logout</button>
    </PageWrapper>
  );
}
