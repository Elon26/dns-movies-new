import { genres } from "../constats";

/** Функция переводит жанр с английского языка на русский и наоборот. */
function translateGenre(genre: string): string {
    const lowerCaseGenre = genre?.trim()?.toLocaleLowerCase();
    const firstLetterCode = lowerCaseGenre?.charCodeAt(0);
    const genreObj = genres?.find(
        (coupleOfGenres) =>
            coupleOfGenres.eng === lowerCaseGenre ||
            coupleOfGenres.rus === lowerCaseGenre
    );

    if (genreObj) {
        if (firstLetterCode >= 97 && firstLetterCode <= 122) {
            return genreObj?.rus;
        } else {
            return genreObj?.eng;
        }
    } else {
        return "undefined";
    }
}

export default translateGenre;
