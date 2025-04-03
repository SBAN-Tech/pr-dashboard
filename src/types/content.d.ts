import conf from "~/src/config.toml";
import { DateUtils } from "$lib/date";
import { ulid } from "ulidx";

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
    to_table(): ContentDBTable;
}

export class ContentDraft extends ContentCore {
    url = "";
    time = DateUtils.toISO(DateUtils.defaultDate(conf.start, conf.end));
    to_table() {
        let id: string | null;
        let match = this.url.match(/(?<=\/|v=|^)([A-Za-z0-9_-]{11})(?=\?|&|$)/);
        if (match) {
            id = match[0];
        } else {
            id = null;
        }
        return {
            ...this,
            key: ulid(),
            id,
            approved: false
        } satisfies ContentDBTable;
    }
}

declare class ContentDBTable extends ContentCore {
    key: string;
    id: string | null;
    time: string;
    approved: boolean;
    constructor();
}

export class ContentDBTable extends ContentCore {
    key = "";
    id = null;
    time = DateUtils.toISO(DateUtils.defaultDate(conf.start, conf.end));
    approved = false;
    constructor() {
        super();
    }
}

declare class Content extends ContentCore {
    key: string;
    id: string | null;
    time: Date;
    approved: boolean;
    constructor(data: ContentDBTable);
    to_table(): ContentDBTable;
}

export class Content extends ContentCore {
    key = "";
    id = null;
    time = DateUtils.defaultDate(conf.start, conf.end);
    approved = false;
    constructor(data: ContentDBTable) {
        super();
        return {
            ...data,
            time: new Date(data.time),
            approved: false
        };
    }
    to_table() {
        return {
            ...this,
            time: DateUtils.toISO(this.time)
        } satisfies ContentDBTable;
    }
}

interface ContentDividedbyDate {
    date: string;
    contents: Array<Content>;
}
