import db from "$lib/db";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { isloginable } from "~/src/lib/isloginable";

type Data = ContentDBTable & { key: string };

export const POST: RequestHandler = async ({locals, platform, request}) => {
    let data_k: Data = await request.json();
    if (isloginable((await locals.auth())?.user?.id, platform?.env?.AUTH_DISCORD_USERS)) {
        let data: ContentDBTable = data_k;
        let key = data_k.key;
        data.id = data.id ? data.id : null;
        let url = new URL(data.url);
        let firstPath = url.pathname.split("/")[1];
        if(url.hostname == "youtu.be"){
            data.id = firstPath;
        }else if(url.hostname == "youtube.com" || url.hostname == "www.youtube.com"){
            if(firstPath == "watch"){    
                let params = url.searchParams;
                data.id = params.get("v");
            }else{
                data.id = "";
            }
        }else{
            data.id = "";
        }
        return json(await db.update(platform?.env?.DB, key, data));
    } else {
        return json(await db.get(platform?.env?.DB));
    }
};
