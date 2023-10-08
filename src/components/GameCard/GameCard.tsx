export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  esrb_rating: {
    name: string;
  };
}

export default function GameCard({ game }: { game: Game }) {
  return (
    <div style={{ gap: '1rem' }}>
      <h1>{game.name}</h1>
      <span>Released: {game.released}</span>
      <span>Rating: {game.rating}</span>
      <span>Metacritic: {game.metacritic}</span>
      <span>ESRB: {game.esrb_rating?.name}</span>
    </div>
  );
}
