'use client';
import { useRouter } from 'next/navigation';
import styles from './pagination.module.scss';
import { useState } from 'react';

export default function Pagination({ totalPages, current }: { totalPages: number; current: number }) {
  const router = useRouter();
  const [canBack, setCanBack] = useState(current > 1);
  const [canForward, setCanForward] = useState(current < totalPages);

  function back() {
    canBack && router.replace(`/games?page=${current - 1}`);
  }

  function forward() {
    canForward && router.replace(`/games?page=${current - -1}`);
  }

  return (
    <nav className={styles.pagination}>
      {totalPages}
      <button disabled={!canBack} onClick={() => back()}>
        Back
      </button>
      <span>{current}</span>
      <button disabled={!canForward} onClick={() => forward()}>
        Forward
      </button>
    </nav>
  );
}
