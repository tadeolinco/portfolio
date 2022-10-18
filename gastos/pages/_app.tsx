import { User } from '@supabase/supabase-js';
import { fetcher } from 'lib/fetcher';
import { supabase } from 'lib/supabase';
import type { AppProps } from 'next/app';
import { FormEvent, useEffect, useState } from 'react';
import { SWRConfig } from 'swr';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const user = supabase.auth.user();

  const [currUser, setCurrUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setCurrUser(user);
    }
  }, [user]);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    await supabase.auth.signIn(
      {
        // @ts-ignore
        email: event.target.email.value,
        // @ts-ignore
        password: event.target.password.value,
      },
      {
        shouldCreateUser: false,
      },
    );
    window.location.reload();
  };

  if (!currUser)
    return (
      <form
        onSubmit={login}
        className="flex h-screen flex-col items-center justify-center space-y-4"
      >
        <label htmlFor="email">Email</label>
        <input className="w-1/2 border" autoFocus type="email" name="email" />
        <input
          className="w-1/2 border"
          autoFocus
          type="password"
          name="password"
        />
        <button type="submit">Submit</button>
      </form>
    );

  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
