import db from "$lib/server/db";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { isloginable } from "$lib/server/isloginable";
import { ContentDBTable } from "~/src/types/content.d";

type Data = ContentDBTable & { key: string };

export const POST: RequestHandler = async ({locals, platform, request}) => {
    let data_k: Data = await request.json();
    if (isloginable((await locals.auth())?.user?.id, platform?.env?.AUTH_DISCORD_USERS)) {
        let data: ContentDBTable = data_k;
        let key = data_k.key;
        data.id = data.id ? data.id : null;
        return json(await db.update(platform?.env?.DB, key, data));
    } else {
        return json(await db.get(platform?.env?.DB));
    }
};
