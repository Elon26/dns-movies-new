import axios from "axios";
import { SERVER_URL, isFirebase } from "../constats";
import { IActors } from "../models";

async function getActors(): Promise<IActors> {
    const response = await axios.get<IActors>(
        SERVER_URL + "actors" + (isFirebase ? ".json/" : "")
    );

    return response.data;
}

export default getActors;
