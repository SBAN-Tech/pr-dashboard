import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({locals, platform}) => {
    const session = await locals.auth();
    let data = false;
    let users = platform?.env.AUTH_DISCORD_USERS;
    if (session) {
        data = (session.user?.id && users) ? users.includes(session.user?.id) : false;
    }
    return json(data);
}
