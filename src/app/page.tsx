import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { getServerSession } from 'next-auth';
import { config } from '@/helpers/auth';

export default async function Home() {
  const session = await getServerSession(config);

  return (
    <PageWrapper>
      <h1>Home Page</h1>
      <span>Hello, {session?.user?.name}</span>
    </PageWrapper>
  );
}
