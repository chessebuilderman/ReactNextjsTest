import Discord from 'next-auth/providers/discord';
import NextAuth from 'next-auth';
import PassKey from 'next-auth/providers/passkey';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { Provider } from 'next-auth/providers';
import RobloxProvider from './providers/roblox';


/* -------------------------------------------------------------------------- */

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

const prisma = new PrismaClient();

const providers: Provider[] = [
  Discord({
    'name': 'Discord',
  }),
  /* -------------------------- Credentials will wait ------------------------- */
  // Credentials({
  //   credentials: {
  //     email: {
  //     },
  //     password: {
  //     }
  //   },
  //   authorize: async (credentials) => {
  //     let user;

  //     const { email, password } = await signInSchema.parseAsync(credentials);

  //     const pwHash = btoa(password)

  //     user = await CheckLogin(email, pwHash)

  //     switch (typeof (user)) {
  //       case "boolean": {
  //         throw new Error('Could not sign in')
  //       }
  //       default: {
  //         return user;
  //       }
  //     }

  //   },
  // }),
  /* -------------------------------------------------------------------------- */
  PassKey({
    name: 'PassKey',
  }),
  RobloxProvider({
    checks: ['pkce'],
    scopes: ['profile', 'openid'],
    redirectUri: 'http://localhost:3000/api/auth/callback/roblox',
  }),
];

/* -------------------------------------------------------------------------- */

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: providers,
  cookies: {
    pkceCodeVerifier: {
      name: 'pkce-code-verifier',
      options: {
        httpOnly: false,
        sameSite: 'none',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    state: {
      name: 'auth-state',
      options: {
        httpOnly: false,
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: 'callback_url',
    },
    csrfToken: {
      name: 'CSRF_Token',
    },
    sessionToken: {
      name: 'CC_Token',
    },
  },
  experimental: { enableWebAuthn: true },
  theme: {
    'brandColor': 'blue',
    'buttonText': 'Login',
    'logo': 'https://cdn.iconscout.com/icon/free/png-256/free-react-3-1175109.png?f=webp&w=256',
  },
  trustHost: true,
});

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
