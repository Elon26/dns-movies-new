import Carousel from "../../ui/Carousel/Carousel";
import React, { useEffect, useState } from "react";
import SliderTitle from "./SliderTitle/SliderTitle";
import axios from "../../../lib/axios";
import { MOVIE_LIST_SIZES } from "../MovieList/constants/constants";
import MovieListItem from "../MovieList/components/movieListItem/MovieListItem";
import { MovieItemTest } from "../MovieList/interfaces/interfaces";

interface TestData {
    count: number;
    rows: MovieItemTest[];
}

interface MovieSliderProps {
    carouselId: string;
    href: string;
    headingTitle: string;
    genreId: number;
}

export default function MovieSlider({
    carouselId,
    href,
    headingTitle,
    genreId
}: MovieSliderProps) {
    const [data, setData] = useState<TestData>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `http://localhost:5000/api/movies/filters?genreId=${genreId}`
            );
            const data = response.data as TestData;
            setData(data);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = fetchData();
    }, []);

    if (!data) return <></>;

    return (
        <>
            <SliderTitle title={headingTitle} href={href} />
            <Carousel
                mode={"slider"}
                carouselId={carouselId}
                data={data?.rows}
                count={data?.count}
                sizes={MOVIE_LIST_SIZES}
                href={href}
                component={MovieListItem}
            />
        </>
    );
}
