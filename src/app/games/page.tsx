import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { getServerSession } from 'next-auth';
import { config } from '@/helpers/auth';
import type { Game } from '@/components/GameCard/GameCard';
import GameCard from '@/components/GameCard/GameCard';
import styles from './games.module.scss';
import Wrapper from '@/components/GameCard/Wrapper';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';

export default async function Games({ searchParams: { page } }: { searchParams: { page: number } }) {
  const session = await getServerSession(config);

  const options = {
    key: process.env.NEXT_PUBLIC_RAWG_API_KEY,
    page_size: 40,
    page: page ?? 1,
  };

  const games$res = await fetch(
    `https://api.rawg.io/api/games?key=${options.key}&page_size=${options.page_size}&page=${options.page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const games = await games$res.json();
  const totalPages = Math.ceil(games.count / options.page_size);

  return (
    <PageWrapper>
      <ul className={styles.list}>
        {games.results &&
          games.results.map((game: Game) => (
            <Wrapper key={game.id}>
              <GameCard game={game} />
            </Wrapper>
          ))}
      </ul>
      <Pagination totalPages={totalPages} current={page ?? 1} />
    </PageWrapper>
  );
}
