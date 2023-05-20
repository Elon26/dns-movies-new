export interface IData<T> {
    data: T;
}

export interface IDataRows {
    data: {
        rows: IRows[];
    };
}

export interface IRows {
    id: number;
    kinopoiskId: number;
}
