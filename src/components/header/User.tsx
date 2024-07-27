import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { Session } from 'next-auth';
import { UserAvatarComponent } from './UserAvatar';

interface UserComponentProps {
    session: Session
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function User({ session }: UserComponentProps) {
    return (
        <Button color="inherit" href="/profile" size="small">{session.user.name}
        <Typography variant="h6" color="inherit" noWrap>
            &nbsp;
            &nbsp;
        </Typography> <UserAvatarComponent session={session} />
        </Button>


    );
}
