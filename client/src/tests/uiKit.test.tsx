import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import fireEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../store/createStore";
import WrapperIntl from "../components/common/WrapperIntl/WrapperIntl";
import Toggle from "../components/common/Toggle/Toggle";

jest.mock("next/router", () => ({
    useRouter: () => ({
        asPath: "/535341?type=null"
    })
}));

describe("UiKitTest", () => {
    test("Toggle", async () => {
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <Toggle nameBtn="test">TestText</Toggle>
                </WrapperIntl>
            </Provider>
        );
        const btn = await screen.findByTestId("toggleBtn");
        fireEvent.click(btn);
        const items = await screen.findByText(/TestText/i);
        expect(items).toBeInTheDocument();
    });
});
