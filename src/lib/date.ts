import conf from "~/src/config.toml";
import { DateTime, Interval } from "luxon";

export namespace DateUtils {
    export const eachDays = (start: Date, end: Date) => Interval
        .fromDateTimes(
            DateTime.fromJSDate(start, {zone: conf.zone}).startOf("day"),
            DateTime.fromJSDate(end, {zone: conf.zone}).endOf("day")
        ).splitBy({days: 1}).map(d => d.start);
    export const isAvailable = (time: Date, countdown: number, duration: number, start: Date, end: Date, unavailable?: Array<Unavailable>) => {
        let content_i = Interval.fromDateTimes(
            DateTime.fromJSDate(time, {zone: conf.zone}),
            DateTime.fromJSDate(time, {zone: conf.zone}).plus({minutes: countdown, seconds: duration})
        );
        let term_i = Interval.fromDateTimes((addGuerrilla(new Date()) < start) ? start : (addGuerrilla(new Date()) < end) ? addGuerrilla(new Date()) : end, end);
        let unavailable_i = unavailable ? unavailable.map((c) => Interval.fromDateTimes(c.start, c.end)) : [];
        return (term_i.engulfs(content_i) && !unavailable_i.map((c) => c.overlaps(content_i)).includes(true));
    };
    export const defaultDate = (start: Date, end: Date) => {
        let now = DateTime.now().plus({minutes: (conf.guerrilla ?? 0) + 10}).toJSDate();
        return (now < start) ? start : (end < now) ? end : now;
    }
    export const toISO = (time: Date) => DateTime.fromJSDate(new Date(time)).setZone(conf.timezone).toFormat("yyyy-MM-dd HH:mm:ssZZ");
    export const getDate = (time: Date) => DateTime.fromJSDate(new Date(time)).setZone(conf.timezone).toFormat("yyyy-MM-dd");
    export const getDateSlashed = (time: Date) => DateTime.fromJSDate(new Date(time)).setZone(conf.timezone).toFormat("yyyy/MM/dd");
    export const getCalendarDate = (time: Date) => DateTime.fromJSDate(new Date(time)).setZone(conf.timezone).toFormat("M/d");
    export const getTime = (time: Date) => DateTime.fromJSDate(new Date(time)).setZone(conf.timezone).toFormat("HH:mm");
    const addGuerrilla = (time: Date) => DateTime.fromJSDate(new Date(time)).plus({minutes: conf.guerrilla ?? 0}).toJSDate();
    export const getDuration = (d: number, c: number) => {
        let s = d + c * 60;
        if (s < 3600) {
            return `${Math.floor(s / 60)}:${((s % 60) + "").padStart(2, "0")}`;
        } else {
            return `${Math.floor(s / 3600)}:${(Math.floor(s / 60) % 60 + "").padStart(2, "0")}:${((s % 60) + "").padStart(2, "0")}`;
        }
    };
}
