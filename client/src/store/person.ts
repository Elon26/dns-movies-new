import { IPerson } from "../pages/person/models/IPerson";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./createStore";

interface IInit {
    person: IPerson | null;
}

const initialState: IInit = {
    person: null
};

const personSlice = createSlice({
    name: "person",
    initialState,
    reducers: {
        personRequest(state: IInit, action: PayloadAction<IPerson>) {
            state.person = action.payload;
        }
    }
});

const { reducer: personReducer, actions } = personSlice;
export const getPerson =
    () =>
    (state: RootState): IPerson | null =>
        state.person.person;
export const { personRequest } = actions;
export default personReducer;
