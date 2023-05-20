import { genres } from "../constats";

/** Функция текстовое описание заданного жанра фильмов. */
function getMoviesPageDescription(genre: string, lang: string): string {
    const genreObj = genres.find(
        (coupleOfGenres) => coupleOfGenres.eng === genre
    );

    if (genreObj) {
        return lang === "Ru"
            ? genreObj.rusDescription
            : genreObj.engDescription;
    } else {
        return "";
    }
}

export default getMoviesPageDescription;
