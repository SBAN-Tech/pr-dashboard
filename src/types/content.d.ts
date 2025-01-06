import conf from "~/src/config.toml";
import { DateUtils } from "$lib/date";

declare class ContentCore {
    title: string;
    author: string;
    category: string;
    description: string;
    duration: number;
    countdown: number;
}

class ContentCore {
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

class ContentDraft extends ContentCore {
    url = "";
    time = DateUtils.toISO(DateUtils.defaultDate(conf.start, conf.end));
}

declare class ContentDBTable extends ContentCore {
    id: string | null;
    time: string;
    constructor(data: ContentDraft | Content);
}

class ContentDBTable extends ContentCore {
    id = null;
    time = DateUtils.toISO(DateUtils.defaultDate(conf.start, conf.end));
    constructor(data: ContentDraft) {
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
        this = {...data, id} satisfies ContentDBTable;
    }
    constructor(data: Content) {
        this = {
            ...data,
            time: DateUtils.toISO(data.time)
        }
    }
}

declare class Content extends ContentCore {
    key: string;
    time: Date;
    constructor(data: ContentDBTable);
}

class Content extends ContentCore {
    constructor(data: ContentDBTable) {
        this = {
            ...data,
            time = new Date(data.time)
        }
    }
}

interface ContentDividedbyDate {
    date: string;
    contents: Array<Content>;
}
