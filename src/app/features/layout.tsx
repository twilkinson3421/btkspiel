import { Fragment } from 'react';
import { getServerSession } from 'next-auth';
import { config } from '@/helpers/auth';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account | BTK Spiel',
  description: 'My Account | BTK Spiel',
};

export default async function FeaturesLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(config);

  if (!session) {
    redirect('/zugang/login');
  }

  return <Fragment>{children}</Fragment>;
}
