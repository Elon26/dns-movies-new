import axios from "axios";
import { domen } from "../../../constats";
import { IData } from "../models/IApi";
import { IPerson, IStaff } from "../../../models";

export const getActor = async (id: string) => {
    const res: IData<IStaff[]> = await axios.get(
        `${domen}movies/about/${id}/staff`
    );
    return res.data;
};
