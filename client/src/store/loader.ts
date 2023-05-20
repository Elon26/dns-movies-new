import { IPerson } from "../pages/person/models/IPerson";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./createStore";

interface IInit {
    visible: boolean;
}

const initialState: IInit = {
    visible: false
};

const personSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        loaderSwitch(state: IInit, action: PayloadAction<boolean>) {
            state.visible = action.payload;
        }
    }
});

const { reducer: loaderReducer, actions } = personSlice;
export const getLoader =
    () =>
    (state: RootState): boolean | null =>
        state.loader.visible;
export const { loaderSwitch } = actions;
export default loaderReducer;
