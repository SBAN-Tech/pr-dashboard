import conf from "~/src/config.toml";
import { DateUtils } from "$lib/date";
import { ulid } from "ulidx";

export class ContentCore {
    title: string = "";
    author: string = "";
    category: string = "";
    description: string = "";
    duration: number = 0;
    countdown: number = 2;
}

export class ContentDraft extends ContentCore {
    url: string = "";
    time: string = DateUtils.toISO(DateUtils.defaultDate(conf.start, conf.end));
    build_table() {
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
        } as ContentDBTable;
    }
}

export class ContentDBTable extends ContentCore {
    key: string = "";
    id: string | null = null;
    time: string = DateUtils.toISO(DateUtils.defaultDate(conf.start, conf.end));
    approved: boolean = false;
    constructor(data: Content) {
        super();
        this.title = data.title;
        this.author = data.author;
        this.category = data.category;
        this.description = data.description;
        this.duration = data.duration;
        this.countdown = data.countdown;
        this.key = data.key;
        this.id = data.id;
        this.time = DateUtils.toISO(data.time);
        this.approved = data.approved;
    }
}

export class Content extends ContentCore {
    key: string = "";
    id: string | null = null;
    time: Date = DateUtils.defaultDate(conf.start, conf.end);
    approved: boolean = false;
    constructor(data: ContentDBTable) {
        super();
        this.title = data.title;
        this.author = data.author;
        this.category = data.category;
        this.description = data.description;
        this.duration = data.duration;
        this.countdown = data.countdown;
        this.key = data.key;
        this.id = data.id;
        this.time = new Date(data.time);
        this.approved = data.approved;
    }
}

interface ContentDividedbyDate {
    date: string;
    contents: Array<Content>;
}
