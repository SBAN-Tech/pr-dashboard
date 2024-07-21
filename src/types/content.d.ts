interface Content {
    key: string;
    id: string | null;
    title: string;
    auther: string;
    category: string;
    description: string;
    time: Date;
    duration: number;
    countdown: number;
    approved: boolean;
}

interface ContentDBTable {
    id: string | null;
    title: string;
    auther: string;
    category: string;
    description: string;
    time: string;
    duration: number;
    countdown: number;
    approved: boolean;
}

interface ContentDividedbyDate {
    date: string;
    contents: Array<Content>;
}
