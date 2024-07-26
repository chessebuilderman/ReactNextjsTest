'use client';

import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { LoginRounded } from '@mui/icons-material';
import { signIn } from 'next-auth/react';

export function SignInButton() {

  return <Button onClick={() => signIn()} color="inherit" aria-label="sign-in">Sign in
                      <Typography variant="h6" color="inherit" noWrap>
                        &nbsp;
                    </Typography>
                    <LoginRounded /> </Button>;
}
