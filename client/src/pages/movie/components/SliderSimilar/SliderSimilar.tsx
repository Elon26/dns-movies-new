import React from "react";
import { ISimiliar } from "../../../../models";
import SliderTitle from "../../../../components/common/MovieSlider/SliderTitle/SliderTitle";
import Carousel from "../../../../components/ui/Carousel/Carousel";
import SimilatItem from "../SimiliarItem/SimilarItem";
import { MOVIE_LIST_SIZES } from "../../../../components/common/MovieList/constants/constants";

interface MovieSliderProps {
    carouselId: string;
    data: ISimiliar[];
    count: number;
    href: string;
    headingTitle: string;
}

export default function SliderSimilar({
    carouselId,
    data,
    count,
    href,
    headingTitle
}: MovieSliderProps) {
    if (data?.length) {
        return (
            <>
                <SliderTitle title={headingTitle} href={href} />
                <Carousel
                    mode={"slider"}
                    carouselId={carouselId}
                    data={data}
                    count={count}
                    sizes={MOVIE_LIST_SIZES}
                    href={href}
                    component={SimilatItem}
                />
            </>
        );
    }

    return <></>;
}
