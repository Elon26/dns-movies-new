import { Provider } from "react-redux";
import ToggleMovies from "./ToggleMovies";
import store from "../../../../../store/createStore";
import WrapperIntl from "../../../../common/WrapperIntl/WrapperIntl";
import "../../../../../styles/index.scss";

export default {
    title: "ToggleMovies",
    component: ToggleMovies
};

const Template = (arg: any) => {
    return (
        <Provider store={store}>
            <WrapperIntl>
                <ToggleMovies {...arg}></ToggleMovies>
            </WrapperIntl>
        </Provider>
    );
};
export const Default: any = Template.bind({});

Default.arg = {
    name: "Year"
};
