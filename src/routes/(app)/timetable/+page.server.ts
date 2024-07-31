import conf from "~/src/config.toml";
import type { PageServerLoad, Actions } from "./$types";
import db from "$lib/db";
import { fail } from "@sveltejs/kit";
import { format as date_tz_format } from "date-fns-tz";

export const load: PageServerLoad = async ({platform}) => {
    return {
        contents: db.get(platform?.env?.DB)
    };
}

export const actions: Actions = {
    insert: async ({platform, request}) => {
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
        if (platform?.env.DISCORD_WEBHOOK_URL) {
            await fetch(platform?.env.DISCORD_WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "content": `#${conf.title}\n${date_tz_format(content.time, "MM/dd HH:mm", {timeZone: conf.timezone})}より${content.auther}さんによる「${content.title}」のプレミアが5分後に始まります!${content.id ? `\nhttps://youtu.be/${content.id}` : ""}`,
                })
            });
        }
        return {
            success: true,
            contents: await db.insert(platform?.env?.DB, content)
        };
    }
};
