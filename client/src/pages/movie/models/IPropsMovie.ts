import { IMovie } from "../../../models";

export interface IPropsMovie {
    movies: IMovie;
}

export interface IProps {
    params: {
        id: string;
    };
}
