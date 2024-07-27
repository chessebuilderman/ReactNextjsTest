'use client';
import * as React from 'react';
import { Button } from '@mui/material';
import { LogoutRounded } from '@mui/icons-material';
import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return <Button onClick={() => signOut()} color="inherit" aria-label="sign-in"> <LogoutRounded /> </Button>;
}
