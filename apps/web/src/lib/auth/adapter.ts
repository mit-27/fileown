import { user, accounts, sessions, verificationTokens } from "@fileown/db/src/schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { Adapter } from "next-auth/adapters";
import { db } from "@fileown/db";
import { createUser, getUser } from "./helpers";


export const adapter: Adapter = {
    ...DrizzleAdapter(db, {
        usersTable: user,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    createUser: async (data) => {
        return await createUser(data);
    },
    getUser: async (id) => {
        return await getUser(id);
    },
};