import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { UserAvatar } from './UserAvatar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function User({ session }: any) {
    return (
        <Button color="inherit" href="/profile" size="small">{session.data.user.name}
        <Typography variant="h6" color="inherit" noWrap>
            &nbsp;
            &nbsp;
        </Typography> <UserAvatar session={session} />
        </Button>


    );
}
