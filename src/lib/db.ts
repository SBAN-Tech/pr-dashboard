import { contents } from "~/src/db/schema";
import type { D1Database } from "@cloudflare/workers-types";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { DateTime } from "luxon";
import { ulid } from "ulidx";

const get = async (db: D1Database | undefined) => {
    if (!db) {
        throw Error("Cannot find database.");
    }
    const d1database = drizzle(db);
    return (await d1database.select().from(contents).all() as Array<{key: string} & ContentDBTable>).map((c) => ({
        key: c.key,
        id: c.id,
        url: c.url,
        title: c.title,
        author: c.author,
        category: c.category,
        description: c.description,
        time: new Date(c.time),
        duration: c.duration,
        countdown: c.countdown,
        approved: c.approved
    })) as Array<Content>;
};

const insert = async (db: D1Database | undefined, table: ContentDBTable) => {
    if (!db) {
        throw Error("Cannot find database.");
    }
    const d1database = drizzle(db);
    let key = ulid();
    await d1database.insert(contents).values(Object.assign({key}, table)).execute();
    return await get(db);
}

const update = async (db: D1Database | undefined, key: string, patch: Partial<ContentDBTable>) => {
    if (!db) {
        throw Error("Cannot find database.");
    }
    const d1database = drizzle(db);
    await d1database.update(contents).set(patch).where(eq(contents.key, key)).execute();
    return await get(db);
}

const remove = async (db: D1Database | undefined, key: string) => {
    if (!db) {
        throw Error("Cannot find database.");
    }
    const d1database = drizzle(db);
    await d1database.delete(contents).where(eq(contents.key, key)).execute();
    return await get(db);
}

export default {
    get: get,
    insert: insert,
    update: update,
    remove: remove
};
