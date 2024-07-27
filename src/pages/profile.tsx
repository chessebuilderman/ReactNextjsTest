import * as React from 'react';
import { GetServerSidePropsContext } from 'next';
import { Typography } from '@mui/material';
import { auth } from '@root/lib/common/auth/next-auth';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await auth(ctx);

    return {
        props: {
            session,
        },
    };
}


export default function ProfilePage() {
    const { data: session } = useSession({ 'required': false });
    const router = useRouter();
    React.useEffect(() => {
        if (!session?.user) {
                router.replace('/api/auth/signin');
            return;
    }
});
     /*return (*/
    //     <div>
    //         <Typography variant="h1" textAlign={'center'}>
    //             You are not allowed to access this page
    //             <Button color="inherit" onClick={redirect('/signin')}>Login to access</Button>
    //         </Typography>

    //     </div>
    // );
    return (
        <div>
            <Typography variant="h1" textAlign={'center'}>
                You are allowed to access this page
            </Typography>
        </div>
    );
}
