import Link from 'next/link';
import styles from './header.module.scss';
import { PiGameControllerBold } from 'react-icons/pi';
import { Account } from './client';

export default function Header() {
  return (
    <header className={styles.header}>
      <hgroup className={styles.header__group}>
        <Link href='/games'>
          <PiGameControllerBold />
          BTK Spiel
        </Link>
      </hgroup>
      <Account />
    </header>
  );
}
