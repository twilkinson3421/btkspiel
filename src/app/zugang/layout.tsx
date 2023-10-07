import { Fragment } from 'react';
import { getServerSession } from 'next-auth';
import { config } from '@/helpers/auth';
import { redirect } from 'next/navigation';

export default async function ZugangLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(config);

  if (session) {
    redirect('/features/my-account');
  }

  return <Fragment>{children}</Fragment>;
}
