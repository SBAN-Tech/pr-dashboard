import type { Session } from "@auth/sveltekit";

export const isloginable = (session: Session | null, users?: Array<string>) => (session ? (session.user?.id && users) ? users.includes(session.user?.id) : false : false);
