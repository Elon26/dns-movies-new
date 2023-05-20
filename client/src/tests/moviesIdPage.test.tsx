import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { Provider } from "react-redux";
import store from "../store/createStore";
import Share from "../pages/movie/components/Share/Share";
import WrapperIntl from "../components/common/WrapperIntl/WrapperIntl";
import Rating from "../pages/movie/components/Rating/Rating";
import { actorsListMock, semiliarMock } from "../tests/mockConsts/movieData";
import SliderSimilar from "../pages/movie/components/SliderSimilar/SliderSimilar";
import ListCreaters from "../pages/movie/components/ListCreaters/ListCreaters";
import { filmAction } from "../store/film";
import Actors from "../pages/movie/components/Actors/Actors";
import { filmData } from "../tests/mockConsts/filmData";

jest.mock("next/router", () => ({
    useRouter: () => ({
        asPath: "/535341?type=null"
    })
}));

const mock = function () {
    return {
        observe: jest.fn(),
        disconnect: jest.fn()
    };
};

window.IntersectionObserver = mock;

jest.mock("axios");

describe("MovieIdPage", () => {
    test("ShareButton", async () => {
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <Share />
                </WrapperIntl>
            </Provider>
        );
        const btn = await screen.findByTestId("share-btn");
        fireEvent.click(btn);
        const modal = screen.queryByTestId("modalShared");
        expect(modal).toBeInTheDocument();
    });
    test("RatingButton", async () => {
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <Rating />
                </WrapperIntl>
            </Provider>
        );
        const btn = await screen.findByTestId("buttonRating");
        fireEvent.click(btn);
        const modal = screen.queryByTestId("modalRating");
        expect(modal).toBeInTheDocument();
    });
    test("Slider", async () => {
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <SliderSimilar
                        carouselId={"top10"}
                        data={semiliarMock || []}
                        count={semiliarMock.length || 0}
                        href={"/movies/all"}
                        headingTitle={"С этим фильмом смотрят"}
                    />
                </WrapperIntl>
            </Provider>
        );
        const items = await screen.findAllByTestId("unitComponent");
        expect(items).toHaveLength(semiliarMock.length);
    });
    test("ListCreaters", async () => {
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <ListCreaters actors={actorsListMock} name="Актер" />
                </WrapperIntl>
            </Provider>
        );
        const items = await screen.findAllByTestId("unitComponent");
        expect(items).toHaveLength(actorsListMock.length);
    });
    test("Actors", async () => {
        store.dispatch(filmAction(filmData));
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <Actors callback={() => console.log("d")} />
                </WrapperIntl>
            </Provider>
        );
        const items = await screen.findAllByTestId("actorUnitTest");
        expect(items).toHaveLength(9);
    });
    test("SliderSemiliar", async () => {
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <SliderSimilar
                        carouselId={"top10"}
                        data={filmData?.film?.similar || []}
                        count={filmData?.film?.similar?.length || 0}
                        href={"/movies/all"}
                        headingTitle={"С этим фильмом смотрят"}
                    />
                </WrapperIntl>
            </Provider>
        );
        const items = await screen.findAllByTestId("similarItemId");
        expect(items).toHaveLength(18);
    });
});
