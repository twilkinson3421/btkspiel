'use client';
import { useEffect, useState } from 'react';
import styles from './interactive.module.scss';
import classNames from 'classnames';
import { IoMdAddCircleOutline, IoMdTrash } from 'react-icons/io';

export default function Interactive({ username, id, name, slug }: { username: string; id: number; name: string; slug: string }) {
  const [hasGame, setHasGame] = useState(false);
  const [checkedHas, setCheckedHas] = useState(false);

  const [wishesGame, setWishesGame] = useState(false);
  const [checkedWishes, setCheckedWishes] = useState(false);

  const [error, setError] = useState({ error: false, message: '' });

  useEffect(() => {
    checkHasGame();
    checkWishesGame();
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

      let found = false;

      owned &&
        owned.forEach(({ id: $id, name: $name, slug: $slug }: { id: number; name: string; slug: string }) => {
          if ($id === id && $name === name && $slug === slug) {
            found = true;
            return;
          }
        });

      setHasGame(found);
      setCheckedHas(true);
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [910 Internal]' });
    }
  }

  async function addGameToOwned() {
    setCheckedHas(false);
    try {
      const add$res = await fetch('/api/games/owned/add', {
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

      if (add$res.ok) {
        checkHasGame();
      }
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [912 Internal]' });
    }
  }

  async function removeGameFromOwned() {
    setCheckedHas(false);
    try {
      const remove$res = await fetch('/api/games/owned/remove', {
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

      if (remove$res.ok) {
        checkHasGame();
      }
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [913 Internal]' });
    }
  }

  async function checkWishesGame() {
    try {
      setCheckedWishes(false);
      const response = await fetch('/api/games/wishlist/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
        }),
      });

      const { wishlist } = await response.json();

      let found = false;

      wishlist &&
        wishlist.forEach(({ id: $id, name: $name, slug: $slug }: { id: number; name: string; slug: string }) => {
          if ($id === id && $name === name && $slug === slug) {
            found = true;
            return;
          }
        });

      setWishesGame(found);
      setCheckedWishes(true);
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [917 Internal]' });
    }
  }

  async function addGameToWishlist() {
    setCheckedWishes(false);
    try {
      const add$res = await fetch('/api/games/wishlist/add', {
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

      if (add$res.ok) {
        checkWishesGame();
      }
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [918 Internal]' });
    }
  }

  async function removeGameFromWishlist() {
    setCheckedWishes(false);
    try {
      const remove$res = await fetch('/api/games/wishlist/remove', {
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

      if (remove$res.ok) {
        checkWishesGame();
      }
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [919 Internal]' });
    }
  }

  return (
    <section className={styles.interactive}>
      <button
        disabled={!checkedHas || error.error}
        className={classNames(styles.interactive__button, hasGame && styles.interactive__button__remove)}
        onClick={() => (hasGame ? removeGameFromOwned() : addGameToOwned())}
      >
        {hasGame ? (
          <span>
            Remove from Owned
            <IoMdTrash />
          </span>
        ) : (
          <span>
            Add to Owned
            <IoMdAddCircleOutline />
          </span>
        )}
      </button>
      <button
        disabled={!checkedWishes || error.error}
        className={classNames(styles.interactive__button, wishesGame && styles.interactive__button__remove)}
        onClick={() => (wishesGame ? removeGameFromWishlist() : addGameToWishlist())}
      >
        {wishesGame ? (
          <span>
            Remove from Wishlist
            <IoMdTrash />
          </span>
        ) : (
          <span>
            Add to Wishlist
            <IoMdAddCircleOutline />
          </span>
        )}
      </button>
      {error.error && <span className={styles.interactive__error}>{error.message}</span>}
    </section>
  );
}
