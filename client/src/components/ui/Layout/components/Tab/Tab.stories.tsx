import { Provider } from "react-redux";
import Tab from "./Tab";
import store from "../../../../../store/createStore";
import WrapperIntl from "../../../../common/WrapperIntl/WrapperIntl";
import "../../../../../styles/index.scss";

export default {
    title: "Tab",
    component: Tab
};

const Template = (arg: any) => {
    return (
        <Provider store={store}>
            <WrapperIntl>
                <Tab {...arg}></Tab>
            </WrapperIntl>
        </Provider>
    );
};
export const Default = Template.bind({});
Default.arg = {
    children: "Click"
};
