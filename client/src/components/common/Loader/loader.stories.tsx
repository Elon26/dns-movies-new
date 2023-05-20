import { Provider } from "react-redux";
import WrapperIntl from "../WrapperIntl/WrapperIntl";
import store from "../../../store/createStore";
import Loader from "./Loader";

export default {
    title: "Loader",
    component: Loader
};

const Template = (arg: any) => (
    <Provider store={store}>
        <WrapperIntl>
            <Loader {...arg} />
        </WrapperIntl>
    </Provider>
);

export const Default: any = Template.bind({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Default.args = {
    children: "Click"
};
