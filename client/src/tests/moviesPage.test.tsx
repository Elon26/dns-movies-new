import { fireEvent, render, screen } from "@testing-library/react";
import Breadcrumbs from "../components/ui/Breadcrumbs/Breadcrumbs";
import { Provider } from "react-redux";
import store from "../store/createStore";
import WrapperIntl from "../components/common/WrapperIntl/WrapperIntl";
import TitleField from "../pages/movies/components/TitleField/TitleField";
import { defaultGenre } from "../constats";
import FilmCardsField from "../pages/movies/components/FilmCardsField/FilmCardsField";
import { movieFromMoviesPageData } from "./mockConsts/moviesData";
import FilmCard from "../pages/movies/components/FilmCardsField/FilmCard";
import SortField from "../pages/movies/components/SortField/SortField";
import Dropdown from "../pages/movies/components/Dropdown/Dropdown";

jest.mock("next/router", () => ({
    useRouter: () => ({
        asPath: "/movies/all"
    })
}));

describe("MoviesPage", () => {
    test("Breadcrumbs", () => {
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <Breadcrumbs />
                </WrapperIntl>
            </Provider>
        );

        const firstLink = screen.getByTestId("firstLinkNameFromBreadcrumbs");
        const secondLink = screen.getByTestId("secondLinkNameFromBreadcrumbs");
        const thirdLink = screen.getByTestId("thirdLinkNameFromBreadcrumbs");

        expect(firstLink.textContent).toEqual("Главная");
        expect(secondLink.textContent).toEqual("Фильмы");
        thirdLink && expect(thirdLink.textContent).toEqual("Все фильмы");
    });

    test("TitleField", () => {
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <TitleField
                        pageTitle={defaultGenre.rusTitle}
                        pageDescription={defaultGenre.rusDescription}
                    />
                </WrapperIntl>
            </Provider>
        );

        const title = screen.getByTestId("pageTitleFromMoviesPage");
        const description = screen.getByTestId("pageDescriptionFromMoviesPage");

        expect(title.textContent).toEqual("Все фильмы");
        expect(description.textContent).toEqual(
            "Вы любите смотреть фильмы онлайн и проводите много времени, прочесывая сайты в поисках чего-нибудь интересного? Тогда вас стоит задержаться – фильмов, которые собраны у нас, вам хватит надолго. Коллекция постоянно пополняется как новыми фильмами, так и признанными шедеврами прошлых лет! Независимо от того, кто вы – любитель энергичных боевиков или поклонница молодежных сериалов, изобилие нашего каталога заставит вас забыть обо всех других способах проведения досуга, и вы будете пересматривать любимые фильмы онлайн снова и снова!"
        );
    });

    test("OpenCloseFilterDropdown", () => {
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <Dropdown
                        label=""
                        selectedFilter=""
                        currentGenreObj={null}
                        arrayRu={[]}
                        arrayEn={[]}
                        name=""
                        handleChangeFilter={() => null}
                        first={true}
                    />
                </WrapperIntl>
            </Provider>
        );

        const button = screen.getByTestId("FilterDropdownOpenButton");

        expect(screen.getByTestId(/FilterDropdownHiddenArea/i)).not.toHaveClass(
            "dropdownOpen"
        );
        fireEvent.click(button);
        expect(screen.getByTestId(/FilterDropdownHiddenArea/i)).toHaveClass(
            "dropdownOpen"
        );
    });

    test("OpenCloseSortDropdown", () => {
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <SortField sortParam="rate" changeSortParam={() => null} />
                </WrapperIntl>
            </Provider>
        );

        const button = screen.getByTestId("SortDropdownOpenButton");

        expect(screen.getByTestId(/SortDropdownHiddenArea/i)).not.toHaveClass(
            "dropdownOpen"
        );
        fireEvent.click(button);
        expect(screen.getByTestId(/SortDropdownHiddenArea/i)).toHaveClass(
            "dropdownOpen"
        );
    });

    test("FilmCard", () => {
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <FilmCard filmData={movieFromMoviesPageData} />
                </WrapperIntl>
            </Provider>
        );

        const filmName = screen.getByTestId("filmNameFromMoviesPageCard");
        const filmRate = screen.getByTestId("filmRateFromMoviesPageCard");
        const filmInfo = screen.getByTestId("filmInfoFromMoviesPageCard");

        expect(filmName.textContent).toEqual("1+1");
        expect(filmRate.textContent).toEqual("8,8");
        expect(filmInfo.textContent).toEqual("2011, Франция, комедия");
    });

    test("ShowMoreButton", () => {
        render(
            <Provider store={store}>
                <WrapperIntl>
                    <FilmCardsField
                        filmCards={[]}
                        getMoreFilmcards={() => null}
                        isLastPage={false}
                    />
                </WrapperIntl>
            </Provider>
        );

        const showMoreButton = screen.getByTestId(
            "showMoreButtonFromMoviesPage"
        );
        expect(showMoreButton).toBeInTheDocument();
    });
});
