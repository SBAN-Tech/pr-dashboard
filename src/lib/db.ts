import { type Content, ContentDBTable, type ContentDraft } from "../types/content";

export namespace DB {
    export const get = async () => await (await fetch("/api/db/get")).json() satisfies Array<Content>;
    export const insert = async (data: ContentDraft) => await (await fetch("/api/db/insert", {
        method: "POST",
        body: JSON.stringify(new ContentDBTable(data))
    })).json() satisfies Array<Content>;
    export const update = async (data: ContentDBTable) => await (await fetch("/api/db/update", {
        method: "POST",
        body: JSON.stringify(data)
    })).json() satisfies Array<Content>;
    export const remove = async (key: string) => await (await fetch("/api/db/remove", {
        method: "POST",
        body: JSON.stringify({ key })
    })).json() satisfies Array<Content>;
}
