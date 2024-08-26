import conf from "~/src/config.toml";
import db from "$lib/db";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({platform, request}) => {
    if (new Date() <= conf.limit) {
        let data: ContentDBTable = await request.json();
        data.id = data.id ? data.id : null;
        data.approved = false;
        let time = data.time.split(/-|T|\s|:|\+/);
        if (platform?.env.DISCORD_WEBHOOK_URL) {
            await fetch(platform?.env.DISCORD_WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "content": `#${conf.title}\n${time[1]}/${time[2]} ${time[3]}:${time[4]}より${data.auther}さんによる「${data.title}」のプレミアが5分後に始まります!${data.id ? `\nhttps://youtu.be/${data.id}` : ""}`,
                })
            });
        }
        return json(await db.insert(platform?.env?.DB, data));
    } else {
        return json(await db.get(platform?.env?.DB));
    }
};
