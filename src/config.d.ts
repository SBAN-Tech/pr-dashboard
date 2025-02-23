interface Config {
    title: string;
    tagline: string;
    description: string;
    hashtag: string;
    list?: string;
    favicon: string;
    logo: string;
    logo_polyfill?: string;
    copyrights: Array<string>;
    theme: string;
    start: Date;
    limit: Date;
    end: Date;
    timezone: string;
    guerrilla?: number;
    unavailable?: Array<Unavailable>;
    category: {
        list: Array<string>;
        event?: string;
        partlist?: Array<{
            name: string;
            start?: Date;
            end?: Date;
        }>;
    };
}

interface Unavailable {
    name: string;
    start: Date;
    end: Date;
    // message?: string;
}

declare module '*.toml' {
    const value: Config
    export default value
}
