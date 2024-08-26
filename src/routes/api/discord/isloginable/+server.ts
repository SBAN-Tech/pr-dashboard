import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { isloginable } from "$lib/isloginable";

export const GET: RequestHandler = async ({locals, platform}) => json(isloginable(await locals.auth(), platform?.env?.AUTH_DISCORD_USERS));
