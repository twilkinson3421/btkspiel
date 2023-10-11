'use client';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from 'module';
import styles from '../zugang.module.scss';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ error: false, message: '' });
  const router = useRouter();

  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !email || !password) {
      setError({ error: true, message: 'Please fill in all fields' });
      return;
    }

    const duplicate$res = await fetch(`/api/register/duplicate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (duplicate$res.status === 409) {
      setError({ error: true, message: 'User with this name already exists' });
      return;
    } else if (duplicate$res.status === 201) {
      setError({ error: false, message: '' });
    } else {
      setError({ error: true, message: 'Something went wrong [900 Internal]' });
      return;
    }

    try {
      const register$res = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (register$res.ok) {
        setError({ error: false, message: '' });
        router.replace('/zugang/login');
      } else {
        setError({ error: true, message: 'Something went wrong [901 Internal]' });
        return;
      }
    } catch (error) {
      setError({ error: true, message: 'Something went wrong [902 Internal]' });
      return;
    }
  }

  return (
    <PageWrapper>
      <section className={styles.container}>
        <h1 className={styles.container__title}>Register</h1>
        <form onSubmit={(e) => register(e)} className={styles.container__form}>
          <input
            className={styles.container__form__input}
            name='name'
            type='text'
            placeholder='Username'
            autoComplete='off'
            onChange={(e) => {
              setName(e.target.value);
              setError({ error: false, message: '' });
            }}
          />
          <input
            className={styles.container__form__input}
            name='email'
            type='email'
            placeholder='Email'
            autoComplete='off'
            onChange={(e) => {
              setEmail(e.target.value);
              setError({ error: false, message: '' });
            }}
          />
          <input
            className={styles.container__form__input}
            name='password'
            type='password'
            placeholder='Password'
            autoComplete='off'
            onChange={(e) => {
              setPassword(e.target.value);
              setError({ error: false, message: '' });
            }}
          />
          {error.error && <span className={styles.container__form__error}>{error.message}</span>}
          <button className={styles.container__form__submit} type='submit'>
            Register
          </button>
        </form>
        <aside className={styles.container__aside}>
          <span>Already have an account?</span>
          <button onClick={() => router.replace('/zugang/login')}>Login</button>
        </aside>
      </section>
    </PageWrapper>
  );
}
