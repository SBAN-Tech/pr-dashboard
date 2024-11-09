import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { isloginable } from "$lib/isloginable";

interface ReqBody {
    id?: string;
}

export const POST: RequestHandler = async ({request, platform}) => json(isloginable((await request.json() as ReqBody).id, platform?.env?.AUTH_DISCORD_USERS));
