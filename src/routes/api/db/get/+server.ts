import db from "$lib/db";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({platform}) => {
    return json(await db.get(platform?.env?.DB));
};
