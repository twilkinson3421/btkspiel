'use client';
import Link from 'next/link';
import styles from './header.module.scss';
import { useSession } from 'next-auth/react';
import { MdOutlineAccountCircle } from 'react-icons/md';

export const Account = () => {
  const { data: session } = useSession();

  const HasAccount = () => {
    return (
      <Link href='/features/my-account'>
        {session?.user?.name}
        <MdOutlineAccountCircle />
      </Link>
    );
  };

  const NoAccount = () => {
    return (
      <Link href='/zugang/login'>
        Log In
        <MdOutlineAccountCircle />
      </Link>
    );
  };

  return (
    <section className={styles.header__account}>
      <hgroup className={styles.header__account__group}>{session ? <HasAccount /> : <NoAccount />}</hgroup>
    </section>
  );
};
