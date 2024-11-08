import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Check if the user exists in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Verify the password using bcrypt
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          // If successful, return the user data, including isAdmin
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          };
        }

        // If login fails, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach user details, including isAdmin, to the session
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      // Add user data to the JWT token on first login
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
