// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth';
import { Product } from '@prisma/client';

type status = 'authenticated' | 'unauthenticated' | 'loading';

declare module 'next-auth' {

    interface Session {
        user: {
            id: mongoose.ObjectId
            name: string;
            email?: string;
            image?: string;
            emailVerified: Date;
            userId?: string | number;
            displayName?: string;
            nickname?: string;
            profileLink?: string;
            robloxVerified?: string;
            products: Product[];
            createdAt: string;
            updatedAt: string;
        } & DefaultSession['user']
        id: mongoose.ObjectId;
        sessionToken: string;
        userId: mongoose.ObjectId;
        expires: string;
        createdAt: string;
        updatedAt: string;
    }
    type status = status
}
