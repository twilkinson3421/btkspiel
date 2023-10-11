'use client';
import styles from './my-account.module.scss';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

export default function Account() {
  const { data: session }: any = useSession();
  const [error, setError] = useState({ error: false, message: '' });
  const [owned, setOwned] = useState([]);

  useEffect(() => {
    if (typeof session !== 'undefined' && session) {
      getOwnedGames();
    }
  }, [session]);

  async function getOwnedGames() {
    const name = session.user.name;

    try {
      const response = await fetch('/api/games/owned/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (!response.ok) {
        setError({ error: true, message: 'Something went wrong fetching owned games [905 Internal]' });
        return;
      }

      const { owned: $owned } = await response.json();

      setOwned($owned);
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [906 Internal]' });
    }
  }

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
          <main className={styles.container__main__data}>
            {error.error && <span>{error.message}</span>}
            {JSON.stringify(owned)}
          </main>
          <button onClick={() => Logout()} className={styles.container__main__button}>
            Log Out
          </button>
        </main>
      </section>
    </PageWrapper>
  );
}
