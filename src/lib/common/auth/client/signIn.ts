'use client';
import { SignInOptions, signIn } from 'next-auth/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clientSignIn(provider: string, options?: SignInOptions, authorizationParams?: any) {

  return () => signIn(provider, options, authorizationParams);
}
