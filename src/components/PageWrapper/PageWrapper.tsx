'use client';
import { motion } from 'framer-motion';
import styles from './page-wrapper.module.scss';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.main className={styles.main} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.main>
  );
}
