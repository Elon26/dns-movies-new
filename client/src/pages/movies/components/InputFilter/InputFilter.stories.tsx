import { Provider } from "react-redux";
import store from "../../../../store/createStore";
import WrapperIntl from "../../../../components/common/WrapperIntl/WrapperIntl";
import InputFilter from "./InputFilter";

export default {
    title: "InputFilter",
    component: InputFilter
};

const Template = (arg: any) => (
    <Provider store={store}>
        <WrapperIntl>
            <InputFilter {...arg} />
        </WrapperIntl>
    </Provider>
);

export const Default: any = Template.bind({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Default.args = {
    name: "director",
    label: "Режиссёр",
    value: "",
    handleChangeFilter: () => null,
    getFirstFilmcards: () => null,
    filterParams: {},
    first: true
};
