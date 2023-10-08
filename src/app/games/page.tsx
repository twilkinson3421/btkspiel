import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { getServerSession } from 'next-auth';
import { config } from '@/helpers/auth';
import type { Game } from '@/components/GameCard/GameCard';
import GameCard from '@/components/GameCard/GameCard';

export default async function Games({ searchParams: { page } }: { searchParams: { page: number } }) {
  const session = await getServerSession(config);

  const games$res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page_size=50&page=${page ?? 1}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const games = await games$res.json();

  return (
    <PageWrapper>
      <ul style={{ flexDirection: 'column' }}>
        {games.results.map((game: Game) => (
          <li key={game.id}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
}
