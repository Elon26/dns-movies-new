import axios from "axios";
import { IPerson, IPersonData, IRows } from "../models/IPerson";
import { domen } from "../../../constats";

export const getOnePerson = async (id: string) => {
    const res: IPersonData<IPerson> = await axios.get(
        `${domen}persons/about/${id}`
    );
    return res.data;
};

export const getAllPerson = async () => {
    const res: IPersonData<IRows> = await axios.get(`${domen}persons`);
    return res.data.rows;
};
