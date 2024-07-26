import { type AdapterUser } from 'next-auth/adapters';
import { type JWT } from 'next-auth/jwt';
import { OAuthConfig } from 'next-auth/providers';
import { Session } from 'next-auth';
import axios from 'axios';

/* -------------------------------------------------------------------------- */

type ValidScopes =
    | 'openid'
    | 'profile'
    | 'email'
    | 'verification'
    | 'credentials'
    | 'age'
    | 'premium'
    | 'roles'
    | 'group:read';

type ValidChecks = 'pkce' | 'state';

export interface RobloxProviderOptions {
    clientId?: string;
    clientSecret?: string;
    redirectUri?: string;
    scopes: ValidScopes[];
    checks: ValidChecks[]
}

export interface RobloxProfile {
    sub: string;
    name: string;
    nickname: string;
    preferred_username: string;
    created_at: Date;
    profile: string;
    picture: string;
    verified: string;
}

export interface getUserData {
    description: string;
    created: string;
    isBanned: boolean;
    externalAppDispalyName: string;
    hasVerifiedBadge: boolean;
    id: number;
    name: string;
    displayName: string;
}

export function sessionCallback({
    session, token, user,
}: {
    session: Session,
    token: JWT,
    user: AdapterUser
}): Session {
    if (!user) {
        return session;
    }

    return {
        ...session,
        user: {
            ...session.user,
            ...user,
            id: user.id,
        },
    };
}

export default function RobloxProvider(
    options: RobloxProviderOptions,
): OAuthConfig<RobloxProfile> {
    return {
        id: 'roblox',
        name: 'Roblox',
        clientId: process.env.AUTH_ROBLOX_ID || options.clientId,
        clientSecret: process.env.AUTH_ROBLOX_SECRET|| options.clientSecret,
        type: 'oidc',
        wellKnown: 'https://apis.roblox.com/oauth/.well-known/openid-configuration',
        issuer: 'https://apis.roblox.com/oauth/',
        style: { logo: 'https://images.rbxcdn.com/7bba321f4d8328683d6e59487ce514eb', brandColor: '#00000' },
        authorization: {
            params: {
                scope: options.scopes.join(' '),
                redirect_uri: options.redirectUri,
                state: 'jYiLe1d6frlEEehKKFn7gw',
            },
        },
        token: true,
        checks: options.checks,
        client: {
            authorization_signed_response_alg: 'ES256',
            id_token_signed_response_alg: 'ES256',
        },
        async profile(profile) {
            return {
                id: profile.sub,
                userId: parseInt(profile.sub, 10),
                name: profile.preferred_username,
                displayName: profile.name,
                nickname: profile.nickname,
                profileLink: profile.profile,
                image: profile.picture,
                robloxVerified: (
                    await (
                        await axios.get<getUserData>(`https://users.roblox.com/v1/users/${profile.sub}`)
                    ).data
                ).hasVerifiedBadge,
            };
        },
    };
}
