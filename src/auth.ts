import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { API_HEADER } from './lib/constants/api-header.constant';
import { LoginResponse } from './lib/types/auth';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'rose-SFA',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signin`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { ...API_HEADER },
          }
        );

        const payload: ApiResponse<LoginResponse> = await response.json();
        if ("error" in payload) throw new Error(payload.error);

        return {
          id: payload.user._id,
          ...payload.user,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      console.log(token);

      if (user) {
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      session._id = token._id;
      session.email = token.email || '';
      session.role = token.role;
      session.firstName = token.firstName;
      session.lastName = token.lastName;

      return session;
    },
  },
};
