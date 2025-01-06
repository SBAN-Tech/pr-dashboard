import conf from "~/src/config.toml";
import { DateUtils } from "$lib/date";
import type { ulid } from "ulidx";

declare class ContentCore {
    title: string;
    author: string;
    category: string;
    description: string;
    duration: number;
    countdown: number;
}

export class ContentCore {
    title = "";
    author = "";
    category = "";
    description = "";
    duration = 0;
    countdown = 2;
}

declare class ContentDraft extends ContentCore {
    url: string;
    time: string;
}

export class ContentDraft extends ContentCore {
    url = "";
    time = DateUtils.toISO(DateUtils.defaultDate(conf.start, conf.end));
}

declare class ContentDBTable extends ContentCore {
    id: string | null;
    time: string;
    approved: boolean;
    constructor(data: Content | ContentDraft);
}

export class ContentDBTable extends ContentCore {
    key = null;
    id = null;
    time = DateUtils.toISO(DateUtils.defaultDate(conf.start, conf.end));
    approved = false;
    constructor(data: Content | ContentDraft) {
        if (data instanceof Content) {
            return {
                ...data,
                time: DateUtils.toISO(data.time)
            } satisfies ContentDBTable;
        } else {
            let u = new URL(data.url);
            let id: string | null;
            let firstPath = url.pathname.split("/")[1];
            if (u.hostname == "youtu.be") {
                id = firstPath;
            } else if(u.hostname == "youtube.com" || url.hostname == "www.youtube.com") {
                if (firstPath == "watch") {    
                    let params = u.searchParams;
                    id = params.get("v");
                } else {
                    id = null;
                }
            } else {
                id = null;
            }
            return {
                ...data,
                key: ulid(),
                id,
                approved: false
            } satisfies ContentDBTable;
        }
    }
}

declare class Content extends ContentCore {
    key: string;
    id: string | null;
    time: Date;
    approved: boolean;
    constructor(data: ContentDBTable);
}

export class Content extends ContentCore {
    key = "";
    id = null;
    time = DateUtils.defaultDate(conf.start, conf.end);
    approved = false;
    constructor(data: ContentDBTable) {
        return {
            ...data,
            time: new Date(data.time),
            approved: false
        };
    }
}

interface ContentDividedbyDate {
    date: string;
    contents: Array<Content>;
}
