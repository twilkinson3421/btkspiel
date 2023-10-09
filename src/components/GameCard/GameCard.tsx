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
  esrb_rating: {
    id: number;
    name: string;
  };
}

export default function GameCard({ game }: { game: Game }) {
  const released = new Date(game.released);
  const localeReleased = released.toLocaleDateString();

  const parts = game.background_image.split('media/');
  const whole = `${parts[0]}media/crop/600/400/${parts[1]}`;

  return (
    <Link tabIndex={0} href={`/games/${game.slug}`} className={styles.container}>
      <img src={whole} alt={game.name} draggable='false' loading='lazy' decoding='async' className={styles.container__image} />
      <hgroup className={styles.container__header}>
        <h1 className={styles.container__header__title}>{game.name}</h1>
      </hgroup>
      <main className={styles.container__main}>
        <span>Released: {localeReleased}</span>
        <span>Rating: {game?.rating}</span>
        <span>Metacritic: {game?.metacritic}</span>
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
