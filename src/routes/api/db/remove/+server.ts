import db from "$lib/server/db";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { isloginable } from "$lib/server/isloginable";

interface Data {
    key: string,
    secret: string;
};

export const POST: RequestHandler = async ({locals, platform, request}) => {
    let data: Data = await request.json();
    if (isloginable((await locals.auth())?.user?.id, platform?.env?.AUTH_DISCORD_USERS)) {
        return json(await db.remove(platform?.env?.DB, data.key));
    } else {
        return json(await db.get(platform?.env?.DB));
    }
};
