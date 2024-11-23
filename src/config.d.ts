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

declare module '*.toml' {
    const value: Config
    export default value
}
