import conf from "~/src/config.toml";
import { DateUtils } from "./date";

class Available {
    time: boolean = false;
}

export namespace ContentUtils {
    export const isAvailable = (content: ContentDBTable) => {
        // check time
        let result = new Available();
        if (conf.category.partlist && conf.category.partlist?.map((c) => c.name).includes(content.category)) {
            let index = conf.category.partlist?.map((c) => c.name).indexOf(content.category);
            let category = conf.category.partlist[index];
            let start = category.start ?? conf.start;
            let end = category.end ?? conf.end;
            result.time = DateUtils.isAvailable(new Date(content.time), start, end);
        } else {
            result.time = DateUtils.isAvailable(new Date(content.time), conf.start, conf.end);
        }

        return result;
    }
}