'use client';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import styles from './not-found.module.scss';
import { usePathname, useRouter } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <PageWrapper>
      <section className={styles.container}>
        <hgroup className={styles.container__header}>
          <h1 className={styles.container__header__title}>
            <span>404</span>
            <div />
            <span>Page Not Found</span>
          </h1>
          <h2>The page you are looking for does not exist, has been removed, or is temporarily unavailable.</h2>
        </hgroup>
        <span className={styles.container__requested}>{pathname}</span>
        <nav>
          <button className={styles.container__button} onClick={() => router.back()}>
            Go Back
          </button>
          <button className={styles.container__button} onClick={() => router.push('/games')}>
            Go Home
          </button>
        </nav>
      </section>
    </PageWrapper>
  );
}
