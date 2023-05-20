import { ITrailers } from "../models";
import { RootState } from "./createStore";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const LOAD_FILM = "LOAD_FILM";

interface IInit {
    trailer: ITrailers | null;
}

const initialState: IInit = {
    trailer: null
};

const trailerSlice = createSlice({
    name: "trailer",
    initialState,
    reducers: {
        trailerAction(state: IInit, action: PayloadAction<ITrailers>) {
            state.trailer = action.payload;
        }
    }
});

const { reducer: trailerReducer, actions } = trailerSlice;
export const getTrailer =
    () =>
    (state: RootState): ITrailers | null =>
        state.trailer.trailer;

export const { trailerAction } = actions;
export default trailerReducer;
