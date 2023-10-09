'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './pagination.module.scss';
import { useEffect, useState } from 'react';
import { PiCaretDoubleLeftBold, PiCaretLeftBold, PiCaretDoubleRightBold, PiCaretRightBold } from 'react-icons/pi';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const $current: any = searchParams.get('page') ?? 1;

  useEffect(() => {
    setLower($current - 1);
    setUpper(totalPages - $current);
    setCurrent($current);
  }, [$current]);

  const [lower, setLower] = useState($current - 1);
  const [upper, setUpper] = useState(totalPages - $current);
  const [current, setCurrent] = useState($current);

  function back(amount: number) {
    lower >= amount &&
      router.replace(
        `/games?${
          searchParams.toString().includes('page')
            ? searchParams.toString().replace(/page=\d+/, `page=${current - amount}`)
            : `${searchParams.toString()}${searchParams.size > 0 ? '&' : ''}page=${current - amount}`
        }`
      );
  }

  function forward(amount: number) {
    amount <= upper &&
      router.replace(
        `/games?${
          searchParams.toString().includes('page')
            ? searchParams.toString().replace(/page=\d+/, `page=${current - -1 * amount}`)
            : `${searchParams.toString()}${searchParams.size > 0 ? '&' : ''}page=${current - -1 * amount}`
        }`
      );
  }

  return (
    <nav className={styles.pagination}>
      <div className={styles.pagination__buttons}>
        <button disabled={lower < 1000} onClick={() => back(1000)}>
          <PiCaretDoubleLeftBold />
          <PiCaretDoubleLeftBold />
        </button>
        <button disabled={lower < 100} onClick={() => back(100)}>
          <PiCaretDoubleLeftBold />
          <PiCaretLeftBold />
        </button>
        <button disabled={lower < 10} onClick={() => back(10)}>
          <PiCaretDoubleLeftBold />
        </button>
        <button disabled={lower < 1} onClick={() => back(1)}>
          <PiCaretLeftBold />
        </button>
        <span>{current}</span>
        <button disabled={upper < 1} onClick={() => forward(1)}>
          <PiCaretRightBold />
        </button>
        <button disabled={upper < 10} onClick={() => forward(10)}>
          <PiCaretDoubleRightBold />
        </button>
        <button disabled={upper < 100} onClick={() => forward(100)}>
          <PiCaretRightBold />
          <PiCaretDoubleRightBold />
        </button>
        <button disabled={upper < 1000} onClick={() => forward(1000)}>
          <PiCaretDoubleRightBold />
          <PiCaretDoubleRightBold />
        </button>
      </div>
    </nav>
  );
}
