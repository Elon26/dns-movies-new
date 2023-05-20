import { Provider } from "react-redux";
import store from "../../../../store/createStore";
import WrapperIntl from "../../../../components/common/WrapperIntl/WrapperIntl";
import Dropdown from "./Dropdown";

export default {
    title: "Dropdown",
    component: Dropdown
};

const Template = (arg: any) => (
    <Provider store={store}>
        <WrapperIntl>
            <Dropdown {...arg} />
        </WrapperIntl>
    </Provider>
);

export const Default: any = Template.bind({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Default.args = {
    label: "Жанр",
    selectedFilter: "",
    currentGenreObj: {},
    arrayRu: ["Боевик", "Комедия", "Драма", "Приключения", "История", "Аниме", "Детский", "Документальный", "Триллер"],
    arrayEn: [],
    name: "genre",
    handleChangeFilter: () => null,
    first: true
};
