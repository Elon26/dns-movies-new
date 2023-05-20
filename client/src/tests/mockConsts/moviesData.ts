import { IMovieFromMoviesList } from "../../models";

export const movieFromMoviesPageData: IMovieFromMoviesList = {
    id: 11,
    kinopoiskId: 535341,
    nameRu: "1+1",
    nameOriginal: "Intouchables",
    countries: [
        {
            id: 3,
            countryNameRu: "Франция",
            countryNameEng: "France",
            createdAt: "42",
            updatedAt: "42"
        }
    ],
    year: 2011,
    ratingKinopoisk: "8.8",
    ratingKinopoiskVoteCount: "900000",
    logoUrl:
        "https://avatars.mds.yandex.net/get-ott/1531675/2a0000017f0262661cde61dc260cb86f7830/orig",
    posterUrl:
        "https://kinopoiskapiunofficial.tech/images/posters/kp/535341.jpg",
    description:
        "Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы. Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь аристократа дух приключений.",
    shortDescription:
        "Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека.",
    genres: [
        {
            id: 2,
            genreNameRu: "комедия",
            genreNameEng: "comedy",
            GenresFilms: {
                id: 21,
                filmId: 11,
                genreId: 2,
                createdAt: "2023-04-24T17:02:51.589Z",
                updatedAt: "2023-04-24T17:02:51.589Z"
            }
        },
        {
            id: 4,
            genreNameRu: "драма",
            genreNameEng: "drama",
            GenresFilms: {
                id: 19,
                filmId: 11,
                genreId: 4,
                createdAt: "2023-04-24T17:02:51.521Z",
                updatedAt: "2023-04-24T17:02:51.521Z"
            }
        },
        {
            id: 10,
            genreNameRu: "биография",
            genreNameEng: "biography",
            GenresFilms: {
                id: 20,
                filmId: 11,
                genreId: 10,
                createdAt: "2023-04-24T17:02:51.555Z",
                updatedAt: "2023-04-24T17:02:51.555Z"
            }
        }
    ],
    filmLength: 112
};
