import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AppDispatch, RootState } from "./createStore";
import catchError from "../utils/catchError";
import { ICountryObject } from "../models";
import getCountries from "../services/getCountries";

interface ICountriesState {
    entities: ICountryObject[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ICountriesState = {
    entities: [],
    isLoading: true,
    error: null
};

const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        countriesRequested: (state: ICountriesState): void => {
            state.isLoading = true;
        },
        countriesReceived: (
            state: ICountriesState,
            action: PayloadAction<ICountryObject[]>
        ): void => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        countriesRequestFailed: (
            state: ICountriesState,
            action: PayloadAction<string>
        ): void => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: countriesReducer, actions } = countriesSlice;
const { countriesRequested, countriesReceived, countriesRequestFailed } =
    actions;

/** Функция выполняет загрузку базы данных жанров и сохраняет полученный результат в Redux, либо отображает ошибку. */
export const loadCountriesList =
    () =>
    async (dispatch: AppDispatch): Promise<void> => {
        dispatch(countriesRequested());
        try {
            const countries = await getCountries();
            if (countries) {
                dispatch(countriesReceived(Object.values(countries)));
            } else {
                dispatch(countriesReceived([]));
            }
        } catch (e: unknown) {
            const error = e as AxiosError;
            dispatch(countriesRequestFailed(error.message));
            catchError(error);
        }
    };

/** Функция возвращает все жанры из базы данных. */
export const getCountriesList =
    () =>
    (state: RootState): ICountryObject[] =>
        state.countries.entities;

/** Функция возвращает статус загрузки данных. */
export const getCountriesLoadingStatus =
    () =>
    (state: RootState): boolean =>
        state.countries.isLoading;

export default countriesReducer;
