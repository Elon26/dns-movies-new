import declensionString from "../../../../utils/declensionString";
import { MovieItemTest } from "../interfaces/interfaces";

export default function useMovieData(movieItem: MovieItemTest) {
    const yearRelease = movieItem.year;
    const country = movieItem.countries
        .map((country) => country.countryNameRu)
        .join(",");
    const genre = movieItem.genres.map((genre) => genre.genreNameRu).join(",");

    const infoString = `${yearRelease},${country},${genre}`;

    const getDurationMovie = (movieItem: MovieItemTest) => {
        if (movieItem.filmLength) {
            return declensionString(+movieItem.filmLength, [
                "минута",
                "минуты",
                "минут"
            ]);
        }
        return declensionString(150, ["минута", "минуты", "минут"]);
    };
    const durationString = getDurationMovie(movieItem);

    const getRating = (movieItem: MovieItemTest) => {
        if (movieItem.ratingKinopoisk) {
            const rating = movieItem?.ratingKinopoisk.split(".");
            if (rating.length === 1) {
                return [...rating, ",0"];
            }
            rating[1] = "," + rating[1];
            return rating;
        }
    };
    const rating = getRating(movieItem) ?? ["5", ",0"];

    return { infoString, durationString, rating };
}
