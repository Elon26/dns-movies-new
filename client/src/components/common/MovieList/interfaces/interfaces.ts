export interface SliderItem {
    ivi_raiting_10: number;
    years: number[];
    country: number;
    genres: number[];
    hru: string;
    release_date: string;
    title: string;
    share_link: string;
    url: string;
    content_paid_types: string[];
    raiting_ready: string[];
    restrict: number;
    duration: number;
    shields: string;
}

export interface RaitingArray {
    [key: string]: number;
}

interface Country {
    id: number;
    countryNameRu: string;
    countryNameEnd: string;
}

interface Genre {
    id: number;
    genreNameRu: string;
    genreNameEng: string;
}

export interface MovieItemTest {
    countries: Country[];
    id: number;
    posterUrlPreview: string;
    ratingKinopoisk: string;
    year: number;
    genres: Genre[];
    filmLength: string;
    nameRu: string;
    kinopoiskId: number;
}
