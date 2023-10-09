import styles from './filters.module.scss';

export default function Filters() {
  return (
    <section className={styles.filters}>
      <form className={styles.filters__form}>
        <input type='text' placeholder='Search...' autoComplete='off' className={styles.filters__form__search} />
      </form>
    </section>
  );
}
