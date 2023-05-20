import { Provider } from "react-redux";
import SearchWindow from "./SearchWindow";
import store from "../../../../../store/createStore";
import WrapperIntl from "../../../../common/WrapperIntl/WrapperIntl";
import "../../../../../styles/index.scss";

export default {
    title: "SearchWindow",
    component: SearchWindow
};

const Template = (arg: any) => {
    return (
        <Provider store={store}>
            <WrapperIntl>
                <SearchWindow {...arg}></SearchWindow>
            </WrapperIntl>
        </Provider>
    );
};
export const Default = Template.bind({});
Default.arg = {
    children: "Click",
    nameBtn: "small",
    elem: { href: "d", rating: "d", raiting: ":" }
};
