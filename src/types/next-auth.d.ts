import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    token?: string;
    _id?: string;
    email?: string;
    role?: string;
    firstName?: string;
    lastName?: string;
  }

  interface User {
    token?: string;
    _id?: string;
    email?: string;
    role?: string;
    firstName?: string;
    lastName?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token?: string;
    _id?: string;
    email?: string;
    role?: string;
    firstName?: string;
    lastName?: string;
  }
}
