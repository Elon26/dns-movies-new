import { IMovie, IMovieOne } from "../models";
import { RootState } from "./createStore";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const LOAD_FILM = "LOAD_FILM";

interface IInit {
    film: IMovie | null;
}

const initialState: IInit = {
    film: null
};

const filmSlice = createSlice({
    name: "film",
    initialState,
    reducers: {
        filmAction(state: IInit, action: PayloadAction<IMovie>) {
            state.film = action.payload;
        }
    }
});

const { reducer: filmReducer, actions } = filmSlice;
export const getFilm =
    () =>
    (state: RootState): IMovie | null =>
        state.film.film;

export const { filmAction } = actions;
export default filmReducer;
