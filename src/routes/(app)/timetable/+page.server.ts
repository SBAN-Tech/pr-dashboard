import conf from "~/src/config.toml";
import type { Actions } from "./$types";
import db from "$lib/db";
import { fail } from "@sveltejs/kit";

export const actions: Actions = {
    insert: async ({platform, request}) => {
        if (new Date() <= conf.limit) {
            const data = await request.formData();
            if (!data.get("time")) {
                return fail(400);
            }
            let content: ContentDBTable = {
                id: data.get("id")?.toString() ?? null,
                title: data.get("title")?.toString() ?? "",
                auther: data.get("auther")?.toString() ?? "",
                category: data.get("category")?.toString() ?? "",
                description: data.get("description")?.toString() ?? "",
                time: data.get("time")?.toString() ?? conf.start.toISOString(),
                duration: parseInt(data.get("duration")?.toString() ?? "0"),
                countdown: parseInt(data.get("countdown")?.toString() ?? "2"),
                approved: data.get("approved")?.toString().toLowerCase() === "true"
            };
            let time = content.time.split(/-|T|\s|:|\+/);
            if (platform?.env.DISCORD_WEBHOOK_URL) {
                await fetch(platform?.env.DISCORD_WEBHOOK_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "content": `#${conf.title}\n${time[1]}/${time[2]} ${time[3]}:${time[4]}より${content.auther}さんによる「${content.title}」のプレミアが5分後に始まります!${content.id ? `\nhttps://youtu.be/${content.id}` : ""}`,
                    })
                });
            }
            return {
                success: true,
                contents: await db.insert(platform?.env?.DB, content)
            };
        } else {
            return {
                success: true,
                contents: await db.get(platform?.env?.DB)
            };
        }
    }
};
