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
}

declare module '*.toml' {
    const value: Config
    export default value
}