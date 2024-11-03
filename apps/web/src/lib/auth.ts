
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { account, sessions, user } from "@fileown/shared";
import {db} from './drizzle';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  cookies: {
    sessionToken: {
      options: {
        httpOnly: false,
      }
    }
  },
  adapter: DrizzleAdapter(db,{
    usersTable: user,
    accountsTable: account,
    sessionsTable: sessions,
  }),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  }

  // callbacks: {
  //   async jwt({ token, account }) {
  //     if (account?.access_token) {
  //       token.accessToken = account.id_token;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     return {
  //       ...session,
  //       accessToken: token?.accessToken,
  //     };
  //   },
  //   async signIn({ account, user, profile }) {
  //     // try {
  //     const token = account?.id_token;

  //     if (!token) {
  //       console.error("No access token available");
  //       return false;
  //     }

  //     cookies().set("access_token", token);

  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_SERVERSIDE__DOCKER_SERVER_URL}/api/auth/login`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }

  //     return true;
  //   },
  // },
  // events: {
  //   signOut: async () => {
  //     cookies().set("access_token", "");
  //   },
  //   signIn: async (user) => {
  //     console.log("User is:", user);
  //     // return true;
  //   },
  // },
});
