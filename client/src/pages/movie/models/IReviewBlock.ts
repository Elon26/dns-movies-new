export interface IReviewBlock {
    name: string;
    text: string;
    date: string;
    title: string;
    id: number;
    createdAt: string;
    profile: {
        name: string;
        userName: string;
    };
}

export interface IReviewChilds {
    name: string;
    text: string;
    date: string;
    title: string;
    id: number;
    childs: IReviewBlock[];
}
