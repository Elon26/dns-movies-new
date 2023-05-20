import { Provider } from "react-redux";
import store from "../../../../store/createStore";
import WrapperIntl from "../../../../components/common/WrapperIntl/WrapperIntl";
import Rating from "./Rating";

export default {
    title: "Rating",
    component: Rating
};

const Template = (arg: any) => {
    return (
        <Provider store={store}>
            <WrapperIntl>
                <Rating {...arg}></Rating>
            </WrapperIntl>
        </Provider>
    );
};

export const Default: any = Template.bind({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Default.args = {
    type: true
};
