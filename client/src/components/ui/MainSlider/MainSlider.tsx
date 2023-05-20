import React from "react";
import mainSliderData from "../../../mockData/mainSlider.json";
import { IClassNames } from "../../../models";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Arrows from "./Arrows";
import Slide from "./Slide";

interface MainSliderProps {
    styles: IClassNames;
}

/** Компонент, содержащий слайдер, отображаемый на главной странице. */
const MainSlider = ({ styles }: MainSliderProps): React.ReactElement => {
    return (
        <div className={styles.slider__sliderCont}>
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                navigation={false}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: true
                }}
            >
                {mainSliderData.map((filmData) => (
                    <SwiperSlide key={filmData.id}>
                        <Slide styles={styles} filmData={filmData} />
                    </SwiperSlide>
                ))}
                <Arrows styles={styles} />
            </Swiper>
        </div>
    );
};

export default MainSlider;
