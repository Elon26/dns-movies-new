import { Provider } from "react-redux";
import store from "../../../../store/createStore";
import WrapperIntl from "../../../../components/common/WrapperIntl/WrapperIntl";
import RangeFilter from "./RangeFilter";

export default {
    title: "RangeFilter",
    component: RangeFilter
};

const Template = (arg: any) => (
    <Provider store={store}>
        <WrapperIntl>
            <RangeFilter {...arg} />
        </WrapperIntl>
    </Provider>
);

export const Default: any = Template.bind({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Default.args = {
    name: "rate",
    min: 0,
    max: 10,
    step: 0.1,
    value: 1,
    handleChangeFilter: () => null,
    handleChangeRange: () => null
};
