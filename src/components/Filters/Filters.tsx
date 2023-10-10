'use client';
import { useEffect, useState } from 'react';
import styles from './filters.module.scss';
import { useRouter } from 'next/navigation';
import { genres } from '@/data/genres';
import { useSearchParams } from 'next/navigation';

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    const genreString = await getGenreValues();

    const params = {
      q: query ? `?q=${query}` : '',
      platforms: platforms ? `${query ? '&' : '?'}platforms=${platforms}` : '',
      genres: genreString ? `${query || platforms ? '&' : '?'}genres=${genreString}` : '',
    };

    router.push(`/games${params.q}${params.platforms}${params.genres}`);
  }

  async function getGenreValues() {
    const retArr: string[] = [];
    genres.forEach(({ id, slug }: { id: number; slug: string }) => {
      const checkbox = document.getElementById(`${slug}_checkbox_genre`) as HTMLInputElement;
      const checked = checkbox?.checked ?? false;
      if (checked) {
        retArr.push(id.toString());
      }
    });
    const retStr = retArr.join(',');
    return retStr;
  }

  useEffect(() => {
    const pc = document.getElementById('pc_checkbox') as HTMLInputElement;
    const playstation = document.getElementById('playstation_checkbox') as HTMLInputElement;
    const xbox = document.getElementById('xbox_checkbox') as HTMLInputElement;

    pc.checked = searchParams.get('platforms')?.includes('1') ?? false;
    playstation.checked = searchParams.get('platforms')?.includes('2') ?? false;
    xbox.checked = searchParams.get('platforms')?.includes('3') ?? false;
  }, [searchParams]);

  return (
    <section className={styles.filters}>
      <form className={styles.filters__form} onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          placeholder='Search the Bibliothek...'
          autoComplete='off'
          onChange={(e) => setQuery(e.target.value)}
          className={styles.filters__form__search}
          id='search'
        />
        <section className={styles.filters__form__advanced}>
          <fieldset className={styles.filters__form__platforms__set}>
            <legend>Platforms</legend>
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
                    <label htmlFor={`${slug}_checkbox`}>{name}</label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <fieldset className={styles.filters__form__genres__set}>
            <legend>Genres</legend>
            <ul className={styles.filters__form__genres__list}>
              {genres.map(({ id, name, slug }: { id: number; name: string; slug: string }) => {
                return (
                  <li key={id} className={styles.filters__form__genres__list__item}>
                    <input type='checkbox' value={id} id={`${slug}_checkbox_genre`} name={slug} />
                    <label htmlFor={`${slug}_checkbox_genre`}>{name}</label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        </section>
        <button type='submit' className={styles.filters__form__submit}>
          Search
        </button>
      </form>
    </section>
  );
}
