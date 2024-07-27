import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Badge } from '@mui/material';
import { Session } from 'next-auth';

interface UserAvatarComponentProps {
    session: Session
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UserAvatarComponent({ session }: UserAvatarComponentProps) {
    return (
        <div>
            <Badge badgeContent={Date.now()} color="error">
                <Avatar src={session.user.image} />
            </Badge>
        </div>
    );
}
