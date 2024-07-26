import * as React from 'react';
import type { AppProps } from 'next/app';
import Header from '@components/Header';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <div>
          <Header />
        </div>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}
