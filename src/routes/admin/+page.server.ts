import type { Actions } from "./$types";
import db from "$lib/db";
import { fail } from "@sveltejs/kit";

export const actions: Actions = {
    update: async ({platform, request}) => {
        const data = await request.formData();
        if (!data.get("key")) {
            return fail(400);
        }
        let key = data.get("key")?.toString();
        if (!key) {
            return fail(400);
        }
        let duration = data.get("duration")?.toString();
        let countdown = data.get("countdown")?.toString();
        let content: Partial<ContentDBTable> = {
            id: (data.get("id")?.toString() == "") ? data.get("id")?.toString() : undefined,
            title: data.get("title") ? data.get("title")?.toString() : undefined,
            auther: data.get("auther") ? data.get("auther")?.toString() : undefined,
            category: data.get("category") ? data.get("category")?.toString() : undefined,
            description: data.get("description")?.toString(),
            time: data.get("time") ? data.get("time")?.toString() : undefined,
            duration: duration ? parseInt(duration) : undefined,
            countdown: countdown ? parseInt(countdown) : undefined,
            approved: data.get("approved") ? data.get("approved")?.toString() == "true" : undefined
        };
        return {
            contents: await db.update(platform?.env?.DB, key, content)
        };
    },
    remove: async ({platform, request}) => {
        const data = await request.formData();
        if (!data.get("key")) {
            return fail(400);
        }
        let key = data.get("key")?.toString();
        if (!key) {
            return fail(400);
        }
        return {
            success: true,
            contents: await db.remove(platform?.env?.DB, key)
        };
    }
};
