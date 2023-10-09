import Link from 'next/link';
import styles from './game-card.module.scss';
import { getESRB, getPEGI } from '@/data/ratings';

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  genres: [
    {
      id: number;
      name: string;
      slug: string;
    }
  ];
  esrb_rating: {
    id: number;
    name: string;
  };
}

export default function GameCard({ game }: { game: Game }) {
  const released = new Date(game.released);
  const localeReleased = released.toLocaleDateString();

  const noImg = game?.background_image === null;
  const parts = noImg ? [] : game?.background_image?.split('media/');
  const whole: any = noImg ? null : `${parts[0]}media/crop/600/400/${parts[1]}`;

  return (
    <Link tabIndex={0} href={`/games/${game.slug}`} className={styles.container}>
      {!noImg && (
        <img src={whole} alt={game.name} draggable='false' loading='lazy' decoding='async' className={styles.container__image} />
      )}
      <hgroup className={styles.container__header}>
        <h1 className={styles.container__header__title}>{game.name}</h1>
      </hgroup>
      <main className={styles.container__main}>
        <span className={styles.container__main__rating}>{`⭐`.repeat(Math.round(game?.rating))}</span>
        <span className={styles.container__main__released}>Released: {localeReleased}</span>
        <span className={styles.container__main__metacritic}>Metacritic: {game?.metacritic}</span>
        <span className={styles.container__main__genre}>Genre: {game?.genres[0]?.name}</span>
        {game?.esrb_rating?.id && game?.esrb_rating?.id !== 6 && (
          <img
            src={`/media/uploads/PEGI/PEGI_${getPEGI(game?.esrb_rating?.id)}.svg`}
            alt={getPEGI(game?.esrb_rating?.id)}
            draggable='false'
            loading='lazy'
            decoding='async'
            className={styles.container__main__pegi}
          />
        )}
        {game?.esrb_rating?.id && (
          <img
            src={`/media/uploads/ESRB/ESRB_${getESRB(game?.esrb_rating?.id)}.svg`}
            alt={game?.esrb_rating?.name}
            draggable='false'
            loading='lazy'
            decoding='async'
            className={styles.container__main__esrb}
          />
        )}
      </main>
    </Link>
  );
}
