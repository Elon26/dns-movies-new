import { RootState } from "./createStore";

export const SWITCH_LANG = "SWITCH_LANG";

interface IAction {
    type: string;
    lang: string;
}

interface IInit {
    lang: string;
}

const initialState: IInit = {
    lang: "Ru"
};

export const langReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case SWITCH_LANG:
            return { ...state, lang: action.lang };
        default:
            return state;
    }
};

export const langAction = (payload: string) => ({
    type: SWITCH_LANG,
    lang: payload
});

export const getLang =
    () =>
    (state: RootState): string =>
        state.lang.lang;
