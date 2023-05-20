import { Provider } from "react-redux";
import store from "../../../../store/createStore";
import WrapperIntl from "../../../../components/common/WrapperIntl/WrapperIntl";
import SortField from "./SortField";

export default {
    title: "SortField",
    component: SortField
};

const Template = (arg: any) => (
    <Provider store={store}>
        <WrapperIntl>
            <SortField {...arg} />
        </WrapperIntl>
    </Provider>
);

export const Default: any = Template.bind({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Default.args = {
    sortParam: "ratingKinopoisk",
    changeSortParam: () => null
};
