import axios, { AxiosError } from "axios";
import { IDBResponse } from "../models";
import catchError from "../utils/catchError";

/** Функция запрашивает набор карточек фильмов из базы данных. */
async function getFilmCards(requestUrl: string): Promise<IDBResponse | null> {
    try {
        const response = await axios.get(requestUrl);
        const data = response.data as IDBResponse;
        return data;
    } catch (e: unknown) {
        const error = e as AxiosError;
        catchError(error);
        return null;
    }
}

export default getFilmCards;
