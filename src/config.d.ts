interface Config {
    title: string;
    tagline: string;
    description: string;
    hashtag: string;
    list?: string;
    favicon: string;
    logo: string;
    logo_polyfill?: string;
    copyrights: string[];
    categories: string[];
    theme: string;
    start: Date;
    limit: Date;
    end: Date;
    timezone: string;
    discord?: string;
}

declare module '*.toml' {
    const value: Config
    export default value
}