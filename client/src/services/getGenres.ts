import axios from "axios";
import { domen } from "../constats";
import { IGenreObject } from "../models";

/** Функция запрашивает на сервере и возвращает объект жанров из базы данных. */
async function getGenres(): Promise<IGenreObject[]> {
    const response = await axios.get(`${domen}movies/genres`);
    const data = response.data as IGenreObject[];
    return data;
}

export default getGenres;
