'use client';
import { useEffect, useState } from 'react';
import styles from './interactive.module.scss';

export default function Interactive({ username, id, name, slug }: { username: string; id: number; name: string; slug: string }) {
  const [hasGame, setHasGame] = useState(false);
  const [checkedHas, setCheckedHas] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });

  useEffect(() => {
    checkHasGame();
  }, []);

  async function checkHasGame() {
    try {
      setCheckedHas(false);
      const response = await fetch('/api/games/owned/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
        }),
      });

      const { owned } = await response.json();

      owned &&
        owned.forEach(({ id: $id, name: $name, slug: $slug }: { id: number; name: string; slug: string }) => {
          if ($id === id && $name === name && $slug === slug) {
            setHasGame(true);
            setCheckedHas(true);
            return;
          } else {
            setHasGame(false);
            setCheckedHas(true);
          }
        });

      !owned && setHasGame(false);
      setCheckedHas(true);
    } catch (error) {
      console.log(error);
      setError({ error: true, message: 'Something went wrong [910 Internal]' });
    }
  }

  async function addGameToOwned() {
    try {
      await fetch('/api/games/owned/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          game: {
            id,
            name,
            slug,
          },
        }),
      });

      checkHasGame();
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [912 Internal]' });
    }
  }

  async function removeGameFromOwned() {
    [];
  }

  return (
    <section className={styles.interactive}>
      <button
        disabled={!checkedHas}
        className={styles.interactive__button}
        onClick={() => (hasGame ? removeGameFromOwned() : addGameToOwned())}
      >
        {hasGame ? 'Remove from Owned' : 'Add to Owned'}
      </button>
      {error.error && <span>{error.message}</span>}
    </section>
  );
}
