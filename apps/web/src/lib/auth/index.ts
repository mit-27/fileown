import Google from "next-auth/providers/google";
import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { users, accounts, sessions, verificationTokens } from "@fileown/db/src/schema"
import { db } from "@fileown/db";


const GoogleProvider = Google({
    allowDangerousEmailAccountLinking: true,
    authorization: {
        params: {
            // See https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
            prompt: "select_account",
            // scope:
            //   "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
    },
});



export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    providers: [GoogleProvider],
    pages: {
        signIn: "/app/login"
    }
})




