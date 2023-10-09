'use client';
import { useState } from 'react';
import styles from './filters.module.scss';
import { useRouter } from 'next/navigation';

export default function Filters() {
  const router = useRouter();

  const $parentPlatforms = [
    {
      id: 1,
      name: 'PC',
      slug: 'pc',
    },
    {
      id: 2,
      name: 'PlayStation',
      slug: 'playstation',
    },
    {
      id: 3,
      name: 'Xbox',
      slug: 'xbox',
    },
  ];

  const [query, setQuery] = useState('');
  const [platforms, setPlatforms] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = {
      q: query ? `?q=${query}` : '',
      platforms: platforms ? `${query ? '&' : '?'}platforms=${platforms}` : '',
    };

    router.push(`/games${params.q}${params.platforms}`);
  }

  return (
    <section className={styles.filters}>
      <form className={styles.filters__form} onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          placeholder='Search the Bibliothek...'
          autoComplete='off'
          onChange={(e) => setQuery(e.target.value)}
          className={styles.filters__form__search}
        />
        <ul className={styles.filters__form__platforms}>
          {$parentPlatforms.map(({ id, name, slug }: { id: number; name: string; slug: string }) => {
            return (
              <li key={id} className={styles.filters__form__platforms__item}>
                <input
                  type='checkbox'
                  value={id}
                  id={`${slug}_checkbox`}
                  name={slug}
                  onChange={() => {
                    const pc = document.getElementById('pc_checkbox') as HTMLInputElement;
                    const playstation = document.getElementById('playstation_checkbox') as HTMLInputElement;
                    const xbox = document.getElementById('xbox_checkbox') as HTMLInputElement;

                    setPlatforms(
                      `${pc.checked ? '1' : ''}${playstation.checked ? `${pc.checked ? ',' : ''}2` : ''}${
                        xbox.checked ? `${playstation.checked || pc.checked ? ',' : ''}3` : ''
                      }`
                    );
                  }}
                />
                <label htmlFor={slug}>{name}</label>
              </li>
            );
          })}
        </ul>
        <button type='submit' className={styles.filters__form__submit}>
          Search
        </button>
      </form>
    </section>
  );
}
