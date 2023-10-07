'use client';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ error: false, message: '' });
  const router = useRouter();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !password) {
      setError({ error: true, message: 'Please fill in all fields' });
      return;
    }

    const login$res = await signIn('credentials', { name, password, redirect: false });

    if (login$res?.error) {
      setError({ error: true, message: 'Incorrect username or password' });
      return;
    }

    if (login$res?.ok) {
      setError({ error: false, message: '' });
      router.replace('/features/my-account');
    }
  }

  return (
    <PageWrapper>
      <h1>Login Page</h1>
      <form onSubmit={(e) => login(e)}>
        <input name='name' type='text' placeholder='Username...' autoComplete='off' onChange={(e) => setName(e.target.value)} />
        <input
          name='password'
          type='password'
          placeholder='Password...'
          autoComplete='off'
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.error && <p>{error.message}</p>}
        <button type='submit'>Login</button>
      </form>
      <aside>
        <span>No account?</span>
        <button onClick={() => router.replace('/zugang/register')}>Create account</button>
      </aside>
    </PageWrapper>
  );
}
