'use client';
import styles from './my-account.module.scss';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { useSession, signOut } from 'next-auth/react';
import { CgSpinner } from 'react-icons/cg';

export default function Account() {
  const { data: session } = useSession();

  async function Logout() {
    await signOut();
  }

  const Loading = () => {
    return (
      <PageWrapper>
        <section className={styles.loading}>
          <CgSpinner />
          <h1>Loading</h1>
        </section>
      </PageWrapper>
    );
  };

  if (typeof session === 'undefined') {
    return <Loading />;
  }

  return (
    <PageWrapper>
      <section className={styles.container}>
        <header className={styles.container__header}>
          <h1 className={styles.container__header__title}>My Account</h1>
        </header>
        <main className={styles.container__main}>
          <hgroup className={styles.container__main__hgroup}>
            <h1>{session?.user?.name}</h1>
            <h1>{session?.user?.email}</h1>
          </hgroup>
          <button onClick={() => Logout()} className={styles.container__main__button}>
            Log Out
          </button>
        </main>
      </section>
    </PageWrapper>
  );
}
