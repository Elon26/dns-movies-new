import { genres } from "../constats";

/** Функция возвращает название страницы со списком фильмов определённого жанра. */
function getMoviesPageTitle(genre: string, lang: string): string {
    const genreObj = genres.find(
        (coupleOfGenres) => coupleOfGenres.eng === genre
    );

    if (genreObj) {
        return lang === "Ru" ? genreObj.rusTitle : genreObj.engTitle;
    } else {
        return "";
    }
}

export default getMoviesPageTitle;
