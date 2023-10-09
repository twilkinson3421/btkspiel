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

  function back(amount: number | undefined) {
    if (amount) {
      lower >= amount && router.replace(`/games?page=${current - amount}`);
    } else {
      lower > 0 && router.replace(`/games?page=${current - 1}`);
    }
  }

  function forward(amount: number | undefined) {
    if (amount) {
      amount <= upper && router.replace(`/games?page=${current - -1 * amount}`);
    } else {
      upper > 0 && router.replace(`/games?page=${current - -1}`);
    }
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
        <button disabled={lower < 1} onClick={() => back(undefined)}>
          <PiCaretLeftBold />
        </button>
        <span>{current}</span>
        <button disabled={upper < 1} onClick={() => forward(undefined)}>
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
