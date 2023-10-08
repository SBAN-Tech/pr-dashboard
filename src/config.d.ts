interface Config {
    title: string;
    tagline: string;
    description: string;
    hashtag: string;
    favicon: string;
    logo: string;
    copyrights: string[];
    categories: string[];
    theme: string;
    start: Date;
    limit: Date;
    end: Date;
    timezone: string;
}

declare module '*.toml' {
    const value: Config
    export default value
}