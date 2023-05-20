import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AppDispatch, RootState } from "./createStore";
import catchError from "../utils/catchError";
import { IGenreObject } from "../models";
import getGenres from "../services/getGenres";

interface IGenresState {
    entities: IGenreObject[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IGenresState = {
    entities: [],
    isLoading: true,
    error: null
};

const genresSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {
        genresRequested: (state: IGenresState): void => {
            state.isLoading = true;
        },
        genresReceived: (
            state: IGenresState,
            action: PayloadAction<IGenreObject[]>
        ): void => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        genresChanged: (
            state: IGenresState,
            action: PayloadAction<IGenreObject>
        ): void => {
            const currentState = state.entities;
            const changedObj = action.payload;
            const changedState = currentState.map((item) => {
                if (item.id === changedObj.id) return changedObj;
                return item;
            });
            state.entities = changedState;
        },
        genresRequestFailed: (
            state: IGenresState,
            action: PayloadAction<string>
        ): void => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: genresReducer, actions } = genresSlice;
const { genresRequested, genresReceived, genresChanged, genresRequestFailed } =
    actions;

/** Функция выполняет загрузку базы данных жанров и сохраняет полученный результат в Redux, либо отображает ошибку. */
export const loadGenresList =
    () =>
    async (dispatch: AppDispatch): Promise<void> => {
        dispatch(genresRequested());
        try {
            const genres = await getGenres();
            if (genres) {
                dispatch(genresReceived(Object.values(genres)));
            } else {
                dispatch(genresReceived([]));
            }
        } catch (e: unknown) {
            const error = e as AxiosError;
            dispatch(genresRequestFailed(error.message));
            catchError(error);
        }
    };

/** Функция изменяет state жанра по id. */
export const changeGenre =
    (payload: IGenreObject) =>
    (dispatch: AppDispatch): void => {
        dispatch(genresChanged(payload));
    };

/** Функция возвращает все жанры из базы данных. */
export const getGenresList =
    () =>
    (state: RootState): IGenreObject[] =>
        state.genres.entities;

/** Функция возвращает статус загрузки данных. */
export const getGenresLoadingStatus =
    () =>
    (state: RootState): boolean =>
        state.genres.isLoading;

export default genresReducer;
