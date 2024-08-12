import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const user = {
  id: '114954095746889212744',
  name: 'keval anand das',
  email: 'kevalananddas@gmail.com',
  image: 'https://lh3.googleusercontent.com/a/ACg8ocJW8b6qgdvNuyXI9-4vPngU68XVPCqdbygjgSo1u5X8zYaJ3Q=s96-c'
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('inside_sign_in',user)
      return true;
    },
    async session({ session, token, user }) {
      console.log('inside_sign_in_session',user,session)
      const sessionUser = { ...session.user, ...user };

      return Promise.resolve({
        ...session,
        user: sessionUser,
      });
    },
  },
});
