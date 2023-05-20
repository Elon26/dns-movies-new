import axios from "axios";
import { domen } from "../../../constats";
import { IData } from "../models/IApi";
import { IReviews } from "../../../models";

export const createReview = async (
    text: string,
    name: string,
    id: number,
    parentId: number | null
) => {
    let res;
    if (parentId) {
        res = await axios.post(
            `${domen}reviews`,
            { text, title: "", parentId: parentId || null, filmId: id },
            {
                headers: {
                    Authorization: `Bearer ${
                        localStorage.getItem("FAKEIVI_ACCESS_TOKEN") || ""
                    }`
                }
            }
        );
    } else {
        res = await axios.post(
            `${domen}reviews`,
            { text, title: "", filmId: id },
            {
                headers: {
                    Authorization: `Bearer ${
                        localStorage.getItem("FAKEIVI_ACCESS_TOKEN") || ""
                    }`
                }
            }
        );
    }

    return res;
};

export const getReviews = async (id: number, limit?: number) => {
    const res: IData<IReviews> = await axios.get(
        `${domen}reviews/film/top/${id}?size=${limit || 10}&page=0`
    );
    return res.data;
};
