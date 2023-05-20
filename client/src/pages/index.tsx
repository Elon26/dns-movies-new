import React from "react";
import styles from "./main.module.scss";
import Head from "next/head";
import { getLang } from "../store/switchLang";
import { useSelector } from "react-redux";
import PromoSection from "../components/common/PromoSection/PromoSection";
import PageSection from "../components/common/PageContainers/PageSection/PageSection";
import PageSectionWrapper from "../components/common/PageContainers/PageSectionContainer/PageSectionContainer";
import MovieSlider from "../components/common/MovieSlider/MovieSlider";
import Link from "next/link";
import MyButton from "../components/common/MyButton/MyButton";
import { FormattedMessage } from "react-intl";
import checkUserRole from "../utils/checkUserRole";
import TopTenSlider from "../components/common/TopTenSlider/TopTenSlider";
import { TOP_10_DATA } from "../components/common/TopTenSlider/data";
import MainSlider from "../components/ui/MainSlider/MainSlider";

/** Компонент главной странцы. */
const Index = (): React.ReactElement => {
    const lang = useSelector(getLang());
    const isAdmin = checkUserRole();

    return (
        <>
            <Head>
                <title>
                    {lang === "Ru" ? "Главная страница" : "Main page"}
                </title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </Head>
            <section data-testid="mainPage">
                {isAdmin && (
                    <div className={styles.adminButtonContainer}>
                        <Link href="admin">
                            <MyButton type="pink" size="large">
                                <FormattedMessage id="GoToAdminPanel" />
                            </MyButton>
                        </Link>
                    </div>
                )}

                <MainSlider styles={styles} />

                <PageSection>
                    <PageSectionWrapper>
                        <PromoSection />
                    </PageSectionWrapper>
                </PageSection>
                <PageSection>
                    <PageSectionWrapper>
                        <TopTenSlider
                            carouselId={"top10"}
                            data={TOP_10_DATA}
                            count={10}
                        />
                    </PageSectionWrapper>
                </PageSection>

                <PageSection>
                    <PageSectionWrapper>
                        <MovieSlider
                            carouselId={"story"}
                            genreId={6}
                            href={"/movies/story"}
                            headingTitle={
                                lang === "Ru" ? "Исторические" : "Historical "
                            }
                        />
                    </PageSectionWrapper>
                </PageSection>

                <PageSection>
                    <PageSectionWrapper>
                        <MovieSlider
                            carouselId={"detective"}
                            genreId={3}
                            href={"/movies/detective"}
                            headingTitle={
                                lang === "Ru" ? "Детективы" : "Detective"
                            }
                        />
                    </PageSectionWrapper>
                </PageSection>
            </section>
        </>
    );
};

export default Index;
