'use client';
import { useState } from 'react';
import styles from './filters.module.scss';
import { useRouter } from 'next/navigation';

export default function Filters() {
  const router = useRouter();

  const [query, setQuery] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = {
      q: query ? `?q=${query}` : '',
    };

    router.push(`/games${params.q}`);
  }

  return (
    <section className={styles.filters}>
      <form className={styles.filters__form} onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          placeholder='Search...'
          autoComplete='off'
          onChange={(e) => setQuery(e.target.value)}
          className={styles.filters__form__search}
        />
      </form>
    </section>
  );
}
