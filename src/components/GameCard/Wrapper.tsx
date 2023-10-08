'use client';
import { motion } from 'framer-motion';
import styles from './wrapper.module.scss';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      tabIndex={-1}
      className={styles.wrapper}
      whileHover={{ scale: 1.1 }}
      whileFocus={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.li>
  );
}
