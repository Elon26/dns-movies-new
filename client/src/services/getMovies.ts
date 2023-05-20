import axios from "axios";
import { SERVER_URL, isFirebase } from "../constats";
import { IMovies } from "../models";

/** Функция запрашивает в Firebasе и возвращает объект базы данных фильмов. */
async function getMovies(): Promise<IMovies> {
    const response = await axios.get<IMovies>(
        SERVER_URL + "movies" + (isFirebase ? ".json/" : "")
    );

    return response.data;
}

export default getMovies;
