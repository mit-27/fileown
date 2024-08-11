import { user, accounts, sessions, verificationTokens } from "@fileown/db/src/schema"
import { db, eq } from "@fileown/db";
import type { AdapterUser } from "next-auth/adapters";



export async function createUser(data: AdapterUser) {

    const { id, ...rest } = data;

    const newUser = await db
        .insert(user)
        .values({ email: rest.email, name: rest.name })
        .returning({
            id: user.id,
            email: user.email,
            emailVerified: user.emailVerified,
        })
        .get();

    return newUser;

}


export async function getUser(id: string) {
    const _user = await db
        .select({
            id: user.id,
            email: user.email,
            firstName: user.name,
        })
        .from(user)
        .where(eq(user.id, id))
        .get();

    return _user || null;
}