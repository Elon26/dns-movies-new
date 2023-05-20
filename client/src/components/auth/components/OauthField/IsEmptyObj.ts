import { IMixedObject } from "../../../../models";

export const isEmptyObj = (obj: IMixedObject): boolean => {
    return Object.keys(obj).length === 0;
};
