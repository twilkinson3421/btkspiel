'use client';
import { useEffect, useState } from 'react';
import styles from './filters.module.scss';
import { useRouter } from 'next/navigation';
import { genres } from '@/data/genres';
import { useSearchParams } from 'next/navigation';
import { PiCaretDownBold } from 'react-icons/pi';

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

  const $sorters = [
    {
      id: 0,
      name: 'None',
      slug: 'none',
    },
    {
      id: 1,
      name: 'Name',
      slug: 'name',
    },
    {
      id: 2,
      name: 'Released',
      slug: 'released',
    },
    {
      id: 3,
      name: 'Added',
      slug: 'added',
    },
    {
      id: 4,
      name: 'Created',
      slug: 'created',
    },
    {
      id: 5,
      name: 'Updated',
      slug: 'updated',
    },
    {
      id: 6,
      name: 'Rating',
      slug: 'rating',
    },
    {
      id: 7,
      name: 'Metacritic',
      slug: 'metacritic',
    },
  ];

  const [advancedOpen, setAdvancedOpen] = useState(
    searchParams.size > 1 || (searchParams.size > 0 && typeof searchParams.get('page') !== 'string')
  );

  const [query, setQuery] = useState('');
  const [platforms, setPlatforms] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const genreString = await getGenreValues();
    const sortSlug = await getSortValues();
    const reverseSort = await reverseIsChecked();

    const params = {
      q: query ? `?q=${query}` : '',
      platforms: platforms ? `${query ? '&' : '?'}platforms=${platforms}` : '',
      genres: genreString ? `${query || platforms ? '&' : '?'}genres=${genreString}` : '',
      sort: sortSlug ? `${query || platforms || genreString ? '&' : '?'}sort=${`${reverseSort ? '-' : ''}` + sortSlug}` : '',
    };

    router.push(`/games${params.q}${params.platforms}${params.genres}${params.sort}`);
  }

  async function getGenreValues() {
    const retArr: string[] = [];
    genres.forEach(({ id, slug }: { id: number; slug: string }) => {
      const checkbox = document.getElementById(`${slug}_checkbox_genre`) as HTMLInputElement;
      const checked = checkbox?.checked ?? false;
      if (checked && id > 0) {
        retArr.push(id.toString());
      }
    });
    const retStr = retArr.join(',');
    return retStr;
  }

  async function getSortValues() {
    let retSlug = '';
    $sorters.forEach(({ id, slug }: { id: number; slug: string }) => {
      const radio = document.getElementById(`${slug}_radio_sort`) as HTMLInputElement;
      const checked = radio?.checked ?? false;
      if (checked && id > 0) {
        retSlug = slug;
      }
    });
    return retSlug;
  }

  async function reverseIsChecked() {
    const checkbox = document.getElementById('sort_reverse_checkbox') as HTMLInputElement;
    return checkbox?.checked ?? false;
  }

  useEffect(() => {
    if (advancedOpen) {
      const pc = document.getElementById('pc_checkbox') as HTMLInputElement;
      const playstation = document.getElementById('playstation_checkbox') as HTMLInputElement;
      const xbox = document.getElementById('xbox_checkbox') as HTMLInputElement;

      pc.checked = searchParams.get('platforms')?.includes('1') ?? false;
      playstation.checked = searchParams.get('platforms')?.includes('2') ?? false;
      xbox.checked = searchParams.get('platforms')?.includes('3') ?? false;
      setPlatforms(searchParams.get('platforms') ?? '');

      const genreString = searchParams.get('genres');
      genres.forEach(({ id, slug }: { id: number; slug: string }) => {
        const checkbox = document.getElementById(`${slug}_checkbox_genre`) as HTMLInputElement;
        checkbox.checked = genreString?.includes(id.toString()) ?? false;
      });

      const sortSlug = searchParams.get('sort');
      $sorters.forEach(({ slug }: { slug: string }) => {
        const radio = document.getElementById(`${slug}_radio_sort`) as HTMLInputElement;
        sortSlug?.includes(slug) && radio?.click();
      });

      const reverseSort = searchParams.get('sort')?.includes('-') ?? false;
      const checkbox = document.getElementById('sort_reverse_checkbox') as HTMLInputElement;
      checkbox.checked = reverseSort;
    }
  }, [searchParams, advancedOpen]);

  return (
    <section className={styles.filters}>
      <form className={styles.filters__form} onSubmit={(e) => handleSubmit(e)}>
        <section className={styles.filters__form__normal}>
          <input
            type='text'
            placeholder='Search the Library...'
            autoComplete='off'
            onChange={(e) => setQuery(e.target.value)}
            className={styles.filters__form__search}
            id='search'
          />
          <button type='button' className={styles.filters__form__normal__open} onClick={() => setAdvancedOpen(!advancedOpen)}>
            <PiCaretDownBold style={advancedOpen && { transform: 'rotate(180deg)' }} />
          </button>
        </section>
        {advancedOpen && (
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
            <fieldset className={styles.filters__form__sort__set}>
              <legend>Sort</legend>
              <ul className={styles.filters__form__sort__list}>
                {$sorters.map(({ id, name, slug }: { id: number; name: string; slug: string }) => {
                  return (
                    <li key={id} className={styles.filters__form__sort__list__item}>
                      <input type='radio' value={id} id={`${slug}_radio_sort`} name={'sort'} />
                      <label htmlFor={`${slug}_radio_sort`}>{name}</label>
                    </li>
                  );
                })}
                <li className={styles.filters__form__sort__list__item}>
                  <input type='checkbox' id='sort_reverse_checkbox' name={'sort_reverse'} />
                  <label htmlFor='sort_reverse_checkbox'>Reverse</label>
                </li>
              </ul>
            </fieldset>
          </section>
        )}
        <button type='submit' className={styles.filters__form__submit}>
          Search
        </button>
      </form>
    </section>
  );
}
