import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AppDispatch, RootState } from "./createStore";
import catchError from "../utils/catchError";
import { IActor } from "../models";
import getActors from "../services/getActors";

interface IActorsState {
    entities: IActor[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IActorsState = {
    entities: [],
    isLoading: true,
    error: null
};

const actorsSlice = createSlice({
    name: "actors",
    initialState,
    reducers: {
        actorsRequested: (state: IActorsState): void => {
            state.isLoading = true;
        },
        actorsReceived: (
            state: IActorsState,
            action: PayloadAction<IActor[]>
        ): void => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        actorsRequestFailed: (
            state: IActorsState,
            action: PayloadAction<string>
        ): void => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: actorsReducer, actions } = actorsSlice;
const { actorsRequested, actorsReceived, actorsRequestFailed } = actions;

/** Функция выполняет загрузку базы данных актёров и сохраняет полученный результат в Redux, либо отображает ошибку. */
export const loadActorsList =
    () =>
    async (dispatch: AppDispatch): Promise<void> => {
        dispatch(actorsRequested());
        try {
            const actors = await getActors();
            if (actors) {
                dispatch(actorsReceived(Object.values(actors)));
            } else {
                dispatch(actorsReceived([]));
            }
        } catch (e: unknown) {
            const error = e as AxiosError;
            dispatch(actorsRequestFailed(error.message));
            catchError(error);
        }
    };

/** Функция возвращает всех актёров из базы данных. */
export const getActorsList =
    () =>
    (state: RootState): IActor[] =>
        state.actors.entities;

/** Функция возвращает актёра из базы данных по его id. */
export const getActor =
    (id: string) =>
    (state: RootState): IActor | null =>
        state.actors.entities.find((actor) => actor.id === id) || null;

/** Функция возвращает статус загрузки данных. */
export const getActorsLoadingStatus =
    () =>
    (state: RootState): boolean =>
        state.actors.isLoading;

export default actorsReducer;
