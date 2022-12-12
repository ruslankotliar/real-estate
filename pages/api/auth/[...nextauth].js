import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';
import User from '../../../models/User';
import dbConnect from '../../../lib/dbConnect';

const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      // credentials: {},
      async authorize(credentials) {
        try {
          await dbConnect();
          const { email, password } = credentials;
          const validUser = await User.findOne({ email: email });
          const validPassword = await bcrypt.compare(
            password,
            validUser.password
          );
          if (validUser && validPassword) {
            const { fileURL } = validUser;
            return { email, fileURL };
          } else {
            return null;
          }
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
    // error: '/auth/sign-in',
    signOut: '/',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: 'admin',
};

export default NextAuth(authOptions);
