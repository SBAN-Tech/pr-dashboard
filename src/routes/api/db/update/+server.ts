import db from "$lib/server/db";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { isloginable } from "$lib/server/isloginable";
import { ContentDBTable } from "~/src/types/content.d";

export const POST: RequestHandler = async ({locals, platform, request}) => {
    if (isloginable((await locals.auth())?.user?.id, platform?.env?.AUTH_DISCORD_USERS)) {
        let data = await request.json() satisfies ContentDBTable;
        let key = data.key;
        data.id = data.id ? data.id : null;
        return json(await db.update(platform?.env?.DB, key, data));
    } else {
        return json(await db.get(platform?.env?.DB));
    }
};
