import useCarousel from "./hooks/useCarousel";
import React from "react";
import styles from "./Carousel.module.scss";
import ButtonControl from "./ButtonControl/ButtonControl";
import CarouselGallery from "./CarouselGallery/CarouselGallery";
import CarouselItem from "./CarouselItem/CarouselItem";
import ShowMoreItem from "./ShowMoreItem/ShowMoreItem";
import PageSectionContainerInner from "../../common/PageContainers/PageSectionContainerInner/PageSectionContainerInner";
import { IMovieFromMoviesList } from "../../../models";
import FilmCard from "../../../pages/movies/components/FilmCardsField/FilmCard";

interface CarouselProps {
    mode: "list" | "slider";
    carouselId: string;
    data: IMovieFromMoviesList[] | { id: number }[];
    count: number;
    sizes: { resol: number; items: number }[];
    href?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any;
    callback?: () => void;
}

export default function Carousel({
    callback,
    data,
    count,
    mode,
    carouselId,
    sizes,
    href,
    component: Component
}: CarouselProps) {
    const {
        checkNext,
        checkPrev,
        handleClickNextSlide,
        handleClickPrevSlide,
        valueDirection
    } = useCarousel({
        dataLength: data.length,
        idSlider: carouselId,
        sizes,
        count
    });

    return (
        <PageSectionContainerInner>
            <div className={styles.container}>
                <div className={styles.test}>
                    {mode === "slider" && (
                        <>
                            {checkPrev && (
                                <ButtonControl
                                    direction={"left"}
                                    onClick={handleClickPrevSlide}
                                />
                            )}
                            {checkNext && (
                                <ButtonControl
                                    direction={"right"}
                                    onClick={handleClickNextSlide}
                                />
                            )}
                        </>
                    )}
                    <div style={{ overflow: "hidden", paddingInline: "12px" }}>
                        <CarouselGallery carouselId={carouselId} mode={mode}>
                            {data.map((elem) => (
                                <CarouselItem
                                    callback={callback}
                                    key={elem.id}
                                    style={{
                                        transform: `translate(${valueDirection}%, 0)`
                                    }}
                                >
                                    {carouselId === "top10" ? (
                                        <div data-testid="unitComponent">
                                            <Component elem={elem} />
                                        </div>
                                    ) : carouselId === "reviews" ? (
                                        <div data-testid="unitComponent">
                                            <Component elem={elem} />
                                        </div>
                                    ) : (
                                        <div
                                            className={styles.filemCardWrapper}
                                        >
                                            <FilmCard
                                                filmData={
                                                    elem as IMovieFromMoviesList
                                                }
                                            />
                                        </div>
                                    )}
                                </CarouselItem>
                            ))}
                            {count > data.length && (
                                <ShowMoreItem
                                    href={href}
                                    valueDirection={valueDirection}
                                    mode={mode}
                                />
                            )}
                        </CarouselGallery>
                    </div>
                </div>
            </div>
        </PageSectionContainerInner>
    );
}
