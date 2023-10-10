import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { getServerSession } from 'next-auth';
import { config } from '@/helpers/auth';
import type { Game } from '@/components/GameCard/GameCard';
import GameCard from '@/components/GameCard/GameCard';
import styles from './games.module.scss';
import Wrapper from '@/components/GameCard/Wrapper';
import Pagination from '@/components/Pagination/Pagination';
import Filters from '@/components/Filters/Filters';
import { genres as $genres } from '@/data/genres';

export default async function Games({
  searchParams: { q, platforms, genres, sort, page },
}: {
  searchParams: { q: string; platforms: string; genres: string; sort: string; page: number };
}) {
  const session = await getServerSession(config);

  if (genres) {
    $genres.forEach(($genre: any) => {
      if (genres.includes($genre.id.toString())) {
        genres = genres.replace($genre.id.toString(), $genre.cor);
      }
    });
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAWG_API_KEY,
    page_size: 40,
    page: page ?? 1,
    SEARCH: q ? `&search=${encodeURIComponent(q)}` : '',
    PLATFORMS: platforms ? `&parent_platforms=${encodeURIComponent(platforms)}` : '',
    GENRES: genres ? `&genres=${encodeURIComponent(genres)}` : '',
    SORT: sort ? `&ordering=${sort}` : '',
  };

  const games$res = await fetch(
    `https://api.rawg.io/api/games?key=${options.key}&page=${options.page}&page_size=${options.page_size}${options.SEARCH}${options.PLATFORMS}${options.GENRES}${options.SORT}`,
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
      <Filters />
      <span className={styles.totalGames}>Games Found: {games.count}</span>
      <ul className={styles.list}>
        {games.results &&
          games.results.map((game: Game) => (
            <Wrapper key={game.id}>
              <GameCard game={game} />
            </Wrapper>
          ))}
      </ul>
      <Pagination totalPages={totalPages} />
    </PageWrapper>
  );
}
