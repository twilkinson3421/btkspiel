import PageWrapper from '@/components/PageWrapper/PageWrapper';
import styles from './game.module.scss';
import Link from 'next/link';
import { getESRB, getPEGI } from '@/data/ratings';
import { MdOpenInNew, MdCalendarMonth } from 'react-icons/md';
import { Fragment } from 'react';
import ClientMeta from './ClientMeta';
import { notFound } from 'next/navigation';
import Interactive from './Interactive';
import { config } from '@/helpers/auth';
import { getServerSession } from 'next-auth';

interface Game {
  // ! Individual game (!= Game from list)
  detail: any;
  id: number;
  name: string;
  slug: string;
  metacritic: number;
  released: string;
  updated: string;
  website: string;
  background_image: string;
  rating: number;
  platforms: [
    {
      platform: {
        id: number;
        name: string;
        slug: string;
      };
    }
  ];
  esrb_rating: {
    id: number;
    name: string;
  };
  developers: [
    {
      id: number;
      name: string;
      slug: string;
    }
  ];
  genres: [
    {
      id: number;
      name: string;
      slug: string;
    }
  ];
  tags: [
    {
      id: number;
      name: string;
      slug: string;
    }
  ];
  publishers: [
    {
      id: number;
      name: string;
      slug: string;
    }
  ];
  description_raw: string;
}

export default async function Game({ params: { game: slug } }: { params: { game: string } }) {
  const session: any = await getServerSession(config);

  const options = {
    key: process.env.NEXT_PUBLIC_RAWG_API_KEY,
  };

  const games$res = await fetch(`https://api.rawg.io/api/games/${slug}?key=${options.key}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const game: Game = await games$res.json();

  if (typeof game?.detail === 'string') {
    notFound();
    return null;
  }

  const released = new Date(game.released);
  const localeReleased = released.toLocaleDateString();
  const updated = new Date(game.updated);
  const localeUpdated = updated.toLocaleDateString();

  return (
    <Fragment>
      <ClientMeta title={`${game.name} | BTK Spiel`} description={`${game.name} | BTK Spiel`} />
      <PageWrapper>
        <img src={game.background_image} alt={game.name} draggable='false' loading='lazy' decoding='async' className={styles.image} />
        <main className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.header__title}>{game.name}</h1>
            <h2 className={styles.header__developer}>{game.developers[0]?.name}</h2>
            {session && <Interactive username={session.user.name} id={game.id} name={game.name} slug={game.slug} />}
          </header>
          <section className={styles.details}>
            <section className={styles.details__upper}>
              <span className={styles.details__upper__released}>
                <MdCalendarMonth />
                Released: {localeReleased}
              </span>
              <span className={styles.details__upper__updated}>
                <MdCalendarMonth />
                Updated: {localeUpdated}
              </span>
              <span className={styles.details__upper__rating}>{`⭐`.repeat(Math.round(game?.rating))}</span>
              <span className={styles.details__upper__metacritic}>Metacritic: {game?.metacritic ?? '?'}</span>
              <span className={styles.details__upper__publisher}>Publisher: {game.publishers[0]?.name}</span>
            </section>
            <section className={styles.details__middle}>
              {game?.esrb_rating?.id && game?.esrb_rating?.id !== 6 && (
                <img
                  src={`/media/uploads/PEGI/PEGI_${getPEGI(game?.esrb_rating?.id)}.svg`}
                  alt={getPEGI(game?.esrb_rating?.id)}
                  draggable='false'
                  loading='lazy'
                  decoding='async'
                  className={styles.details__middle__pegi}
                />
              )}
              {game?.esrb_rating?.id && (
                <img
                  src={`/media/uploads/ESRB/ESRB_${getESRB(game?.esrb_rating?.id)}.svg`}
                  alt={game?.esrb_rating?.name}
                  draggable='false'
                  loading='lazy'
                  decoding='async'
                  className={styles.details__middle__esrb}
                />
              )}
            </section>
            <section className={styles.details__lower}>
              <ul className={styles.details__lower__platforms}>
                {game.platforms.map(({ platform: { id, name } }: any) => (
                  <li key={id} className={styles.details__lower__platforms__item}>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </section>
          </section>
          <Link href={'https://rawg.io'} rel='noopener noreferrer' target='_blank' className={styles.source}>
            Data from RAWG.IO <MdOpenInNew />
          </Link>
          <p className={styles.description}>
            {game.description_raw}
            <Link href={game.website} rel='noopener noreferrer' target='_blank' className={styles.link}>
              Game Website <MdOpenInNew />
            </Link>
          </p>
          <ul className={styles.genres}>
            {game?.genres &&
              game.genres.map(({ name, id }: { name: string; id: number }) => {
                return (
                  <li key={id} className={styles.genres__item}>
                    {name}
                  </li>
                );
              })}
          </ul>
          <ul className={styles.tags}>
            {game?.tags &&
              game.tags.map(({ name, id }: { name: string; id: number }) => {
                return (
                  <li key={id} className={styles.tags__item}>
                    {'#'}
                    {name}
                  </li>
                );
              })}
          </ul>
        </main>
      </PageWrapper>
    </Fragment>
  );
}
