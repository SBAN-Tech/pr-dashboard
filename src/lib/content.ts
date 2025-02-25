import conf from "~/src/config.toml";
import { DateUtils } from "./date";
import { Content, ContentDraft, ContentDBTable, type ContentDividedbyDate } from "~/src/types/content.d";

class Available {
    time: boolean = false;
}

export namespace ContentUtils {
    export const devideByDate = (cs_p: Array<Content>) => {
        let cs = cs_p.sort((a, b) => (a.time > b.time) ? 1 : -1);
        let result: Array<ContentDividedbyDate> = [];
        for (let i = 0; i < cs.length; i++) {
            if (i == 0) {
                result.push({
                    date: DateUtils.getDateSlashed(cs[i].time),
                    contents: [cs[i]]
                });
            } else if (DateUtils.getDate(cs[i].time) != DateUtils.getDate(cs[i-1].time)) {
                result.push({
                    date: DateUtils.getDateSlashed(cs[i].time),
                    contents: [cs[i]]
                });
            } else {
                result[result.length - 1].contents.push(cs[i]);
            }
        }
        return result;
    };
    export const isAvailable = (content: ContentDraft | ContentDBTable) => {
        // check time
        let result = new Available();
        if (conf.category.partlist && conf.category.partlist?.map((c) => c.name).includes(content.category)) {
            let index = conf.category.partlist?.map((c) => c.name).indexOf(content.category);
            let category = conf.category.partlist[index];
            let start = category.start ?? conf.start;
            let end = category.end ?? conf.end;
            result.time = DateUtils.isAvailable(new Date(content.time), content.countdown, content.duration, start, end, conf.unavailable);
        } else {
            result.time = DateUtils.isAvailable(new Date(content.time), content.countdown, content.duration, conf.start, conf.end, conf.unavalable);
        }

        return result;
    }
}