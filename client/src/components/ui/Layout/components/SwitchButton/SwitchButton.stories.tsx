import { Provider } from "react-redux";
import SwitchButton from "./SwitchButton";
import store from "../../../../../store/createStore";
import WrapperIntl from "../../../../common/WrapperIntl/WrapperIntl";
import "../../../../../styles/index.scss";

export default {
    title: "SwitchButton",
    component: SwitchButton
};

const Template = (arg: any) => {
    return (
        <Provider store={store}>
            <WrapperIntl>
                <SwitchButton {...arg}></SwitchButton>
            </WrapperIntl>
        </Provider>
    );
};
export const Default = Template.bind({});

Default.arg = {
    name: "All"
};
