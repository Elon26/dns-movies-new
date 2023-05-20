export interface IMovieOne {
    id: string;
    nameRu: string;
    nameOriginal: string;
    posterUrl: string;
    filmLength: string;
    year: number;
    ratingKinopoisk: string;
    logoUrl: string;
    kinopoiskVoutes: number;
    description: string;
    kinopoiskId: number;
    slogan: string;
    ratingAgeLimits: string;
    countries: ICountries[];
    trailers: ITrailers[];
    genre: IGenre[];
    similar: ISimiliar[];
    genres: IGenreObject[];
}
export interface IMovie {
    film: {
        id: string | number;
        nameRu: string;
        nameOriginal: string;
        posterUrl: string;
        filmLength: string;
        year: number;
        ratingKinopoisk: string;
        logoUrl: string;
        kinopoiskVoutes: number;
        description: string;
        kinopoiskId: number;
        slogan: string;
        ratingAgeLimits: string;
        countries: ICountries[];
        trailers: ITrailers[];
        genre: IGenre[];
        similar: ISimiliar[];
        genres: IGenreObject[];
    };
    staff: IStaff[];
    reviews: {
        count: number;
        rows: IReviewsOne[];
    };
}

export interface IReviews {
    count: number;
    rows: IReviewsOne[];
}

export interface IReviewsOne {
    id: number;
    filmId: number;
    text: string;
    name: string;
    reviews: IReviewsOne[];
    createdAt: string;
}

export interface ISimiliar {
    id: number;
    rand?: number;
    ratingArr?: {
        a: number;
        b: number;
        c: number;
    };
    rating?: string;
    filmId: number;
    nameRu: string;
    nameEng: string | null;
    nameOriginal: string | null;
    age?: string;
    posterUrl: string;
    posterUrlPreview: string;
}

export interface ITrailers {
    id: number;
    url: string;
    site: string;
    name: string;
}

export interface IGenre {
    id: number;
    genreNameRu: string;
    genreNameEng: string | null;
    CountriesFilms: {
        id: number;
        filmId: number;
        countryId: number;
        createdAt: string;
        updatedAt: string;
    };
}

export interface ICountries {
    id: number;
    countryNameRu: string;
    countryNameEng: string | null;
    CountriesFilms: {
        id: number;
        filmId: number;
        countryId: number;
        createdAt: string;
        updatedAt: string;
    };
}

export interface IStaff {
    nameRu: string;
    id: number;
    nameEng: string | null;
    age: number;
    sex: string;
    posterUrl: string;
    profession: string;
    personId: number;
    person?: IActor;
    birthday: null | string;
    birthPlace: string | null;
    deathPlace: string | null;
    hasAwards: string;
    death: string | null;
}

export interface IPerson {
    nameRu: string;
    id: number;
    nameEng: string | null;
    age: number;
    sex: string;
    posterUrl: string;
    profession: string;
    personId: number;
    person: IActor;
}

export interface IActor {
    id: string;
    name: string;
    originalName: string;
    description: string;
    biography: string;
}

export interface IComment {
    id: string;
    movieId: string;
    commentId: string;
    message: string;
}

export interface IMovies {
    [key: string]: IMovie;
}

export interface IGenres {
    [key: string]: IGenre;
}

export interface IActors {
    [key: string]: IActor;
}

export interface IClassNames {
    [className: string]: string;
}

export interface IStringObject {
    [key: string]: string;
}

export interface IMixedObject {
    [key: string]: string | number;
}

export interface IFilterParams {
    genre: string;
    country: string;
    rate: number;
    votes: number;
    director: string;
    actor: string;
    directorId: string;
    actorId: string;
    sort: string;
}

export interface IMovieFromMoviesList {
    id: number;
    kinopoiskId: number;
    nameRu: string;
    nameOriginal: string;
    countries: ICountryObject[];
    year: number;
    ratingKinopoisk: string;
    ratingKinopoiskVoteCount: string;
    logoUrl: string;
    posterUrl: string;
    description: string;
    shortDescription: string;
    genres: IGenreObject[];
    filmLength: number;
}

export interface IMovieFromMainPage {
    id: number;
    kinopoiskId: number;
    nameRu: string;
    nameOriginal: string;
    countries: ICountryObject[];
    year: number;
    ratingKinopoisk: string;
    ratingKinopoiskVoteCount: string;
    logoUrl: string;
    posterUrl: string;
    description: string;
    shortDescription: string;
    genres: IGenreObject[];
    filmLength: number;
    href: string;
}

export interface IDBResponse {
    count: number;
    rows: IMovieFromMoviesList[];
}

export interface IMovieProps {
    props: IMovieFromMoviesList[];
}

export interface IGenreObject {
    createdAt?: string;
    genreNameEng: string;
    genreNameRu: string;
    id: number;
    updatedAt?: string;
    GenresFilms: {
        id: number;
        filmId: number;
        genreId: number;
        createdAt: string;
        updatedAt: string;
    };
}

export interface ICountryObject {
    createdAt: string;
    countryNameEng: string;
    countryNameRu: string;
    id: number;
    updatedAt: string;
}

export interface ISuggestObject {
    personId: number;
    nameRu: string;
}

export interface ISuggestResponse {
    rows: ISuggestObject[];
}

export interface IAuthResponse {
    data: IAuthData;
}

export interface IAuthData {
    email: string | null;
    token: string;
}

export interface ILSData {
    email: string;
    roles: string[];
}

export interface IProfileResponse {
    data: IProfileData;
}

export interface IProfileData {
    username: string | null;
    name: string | null;
    lastName: string | null;
    favMovie: string | null;
    avatarId: number | null;
}
