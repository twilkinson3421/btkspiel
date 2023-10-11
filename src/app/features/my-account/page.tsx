'use client';
import styles from './my-account.module.scss';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { HiArrowRight } from 'react-icons/hi2';
import { IoMdTrash } from 'react-icons/io';

export default function Account() {
  const { data: session }: any = useSession();
  const [error, setError] = useState({ error: false, message: 'Test Error' });
  const [owned, setOwned] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (typeof session !== 'undefined' && session) {
      getOwnedGames();
      getWishlist();
    }
  }, [session, loadingData]);

  async function getOwnedGames() {
    setLoadingData(true);
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
      setLoadingData(false);
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [906 Internal]' });
    }
  }

  async function getWishlist() {
    setLoadingData(true);
    const name = session.user.name;

    try {
      const response = await fetch('/api/games/wishlist/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (!response.ok) {
        setError({ error: true, message: 'Something went wrong fetching wishlist [923 Internal]' });
        return;
      }

      const { wishlist: $wishlist } = await response.json();

      setWishlist($wishlist);
      setLoadingData(false);
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [924 Internal]' });
    }
  }

  async function removeGameFromOwned({ id, name, slug }: { id: number; name: string; slug: string }) {
    setLoadingData(true);
    try {
      const remove$res = await fetch('/api/games/owned/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: session.user.name,
          game: {
            id,
            name,
            slug,
          },
        }),
      });

      if (remove$res.ok) {
        getOwnedGames();
      }
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [913 Internal]' });
    }
  }

  async function removeGameFromWishlist({ id, name, slug }: { id: number; name: string; slug: string }) {
    setLoadingData(true);
    try {
      const remove$res = await fetch('/api/games/wishlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: session.user.name,
          game: {
            id,
            name,
            slug,
          },
        }),
      });

      if (remove$res.ok) {
        getWishlist();
      }
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [919 Internal]' });
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

  const Datalist = ({ title, games, type }: { title: string; games: any; type: 'owned' | 'wishlist' }) => {
    return (
      <article className={styles.container__main__data__container}>
        <h1 className={styles.container__main__data__container__title}>{title}</h1>
        <ul className={styles.container__main__data__container__datalist}>
          {games.length === 0 && (
            <li className={styles.container__main__data__container__datalist__item}>
              <h1 className={styles.container__main__data__container__datalist__item__title}>No {title.toLowerCase()}</h1>
            </li>
          )}
          {games.map(({ id, name, slug }: { id: number; name: string; slug: string }) => {
            return (
              <li key={`${id}_${title.toLowerCase()}`} className={styles.container__main__data__container__datalist__item}>
                <h1 className={styles.container__main__data__container__datalist__item__title}>{name}</h1>
                <div>
                  <button
                    onClick={() =>
                      type === 'owned' ? removeGameFromOwned({ id, name, slug }) : removeGameFromWishlist({ id, name, slug })
                    }
                  >
                    Remove <IoMdTrash />
                  </button>
                  <Link href={`/games/${slug}`}>
                    Game Page <HiArrowRight />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </article>
    );
  };

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
          {error.error && <span className={styles.container__main__error}>{error.message}</span>}
          {loadingData && <Loading />}
          {!loadingData && (
            <main className={styles.container__main__data}>
              <Datalist title='Owned Games' games={owned} type='owned' />
              <Datalist title='Wishlist' games={wishlist} type='wishlist' />
              {error.error && <span>{error.message}</span>}
            </main>
          )}
          <button onClick={() => Logout()} className={styles.container__main__button}>
            Log Out
          </button>
        </main>
      </section>
    </PageWrapper>
  );
}
