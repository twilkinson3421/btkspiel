'use client';
import Link from 'next/link';
import styles from './header.module.scss';
import { signOut, useSession } from 'next-auth/react';
import { MdOutlineAccountCircle, MdLogout } from 'react-icons/md';
import { Fragment } from 'react';

export const Account = () => {
  const { data: session } = useSession();

  async function Logout() {
    await signOut();
  }

  const HasAccount = () => {
    return (
      <Fragment>
        <button onClick={() => Logout()} className={styles.header__account__logout}>
          Log Out
          <MdLogout />
        </button>
        <Link tabIndex={0} href='/features/my-account'>
          {session?.user?.name}
          <MdOutlineAccountCircle />
        </Link>
      </Fragment>
    );
  };

  const NoAccount = () => {
    return (
      <Link tabIndex={0} href='/zugang/login'>
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
