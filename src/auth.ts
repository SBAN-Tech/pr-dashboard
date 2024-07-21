import { env } from '$env/dynamic/private';
import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/sveltekit/providers/discord";

declare module "@auth/core/jwt" {
    interface JWT {
        accessToken?: string,
        id: string,
    }
}

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        Discord({
            clientId: env.AUTH_DISCORD_ID,
            clientSecret: env.AUTH_DISCORD_SECRET,
        })
    ],
    callbacks: {
        jwt: async ({ token, account }) => {
            if (account) {
                token.accessToken = account.access_token;
                token.id = account.providerAccountId;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session) {
                session.user.id = token.id;
            }
            return session;
        }
    },
    secret: env.AUTH_SECRET,
    trustHost: true,
});
