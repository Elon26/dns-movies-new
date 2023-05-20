import axios from "axios";
import { domen } from "../constats";
import { ICountryObject } from "../models";

/** Функция запрашивает на сервере и возвращает объект стран из базы данных. */
async function getCountries(): Promise<ICountryObject[]> {
    const response = await axios.get(`${domen}movies/countries`);
    const data = response.data as ICountryObject[];

    return data;
}

export default getCountries;
