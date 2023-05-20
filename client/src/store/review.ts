import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./createStore";
import { IReviews } from "../models";

interface IInit {
    review: IReviews | null;
    limit: number;
}

const initialState: IInit = {
    review: null,
    limit: 10
};

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        reviewRequest(state: IInit, action: PayloadAction<IReviews>) {
            state.review = action.payload;
        },
        limitAction(state: IInit, action: PayloadAction<number>) {
            state.limit = action.payload;
        }
    }
});

const { reducer: reviewReducer, actions } = reviewSlice;
export const getReview =
    () =>
    (state: RootState): IReviews | null =>
        state.review.review;

export const getLimit =
    () =>
    (state: RootState): number =>
        state.review.limit;
export const { reviewRequest, limitAction } = actions;
export default reviewReducer;
