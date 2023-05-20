import React, { useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import RangeFilter from "../RangeFilter/RangeFilter";
import InputFilter from "../InputFilter/InputFilter";
import { BsXLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
    IClassNames,
    ICountryObject,
    IFilterParams,
    IGenreObject
} from "../../../../models";
import { getLang } from "../../../../store/switchLang";
import { wrapAsyncFunction } from "../../../../utils/wrapAsyncFunction";

interface FiltersFieldProps {
    styles: IClassNames;
    genreObjects: IGenreObject[];
    countryObjects: ICountryObject[];
    currentGenre: string;
    currentGenreObj: IGenreObject | null;
    handleChangeFilter(filterKey: string, filterValue: string): Promise<void>;
    handleChangeFilterWhitoutReload(
        filterKey: string,
        filterValue: string
    ): void;
    filterParams: IFilterParams;
    getFirstFilmcards(filterParams: IFilterParams): void;
    clearFilters(): void;
}

/** Компонент c фильтрами */
const FiltersField = ({
    styles,
    genreObjects,
    countryObjects,
    currentGenre,
    currentGenreObj,
    handleChangeFilter,
    handleChangeFilterWhitoutReload,
    filterParams,
    getFirstFilmcards,
    clearFilters
}: FiltersFieldProps): React.ReactElement => {
    const lang = useSelector(getLang());

    /** Функционал формирует массивы с русским и английским наименованием жанров и стран. */
    const genresRuList = genreObjects.map(
        (genreObject) => genreObject.genreNameRu
    );
    const countriesRuList = countryObjects.map(
        (countryObject) => countryObject.countryNameRu
    );
    const genresEnList = genreObjects.map(
        (genreObject) => genreObject.genreNameEng
    );
    const countriesEnList = countryObjects.map(
        (countryObject) => countryObject.countryNameEng
    );

    /** Данный раздел меняет название страны при смене языка. */
    useEffect(() => {
        if (lang === "En") {
            const countryObject = countryObjects.find(
                (item) => item.countryNameRu === filterParams.country
            );
            if (countryObject) {
                handleChangeFilterWhitoutReload(
                    "country",
                    countryObject.countryNameEng
                );
            }
        }
        if (lang === "Ru") {
            const countryObject = countryObjects.find(
                (item) => item.countryNameEng === filterParams.country
            );
            if (countryObject) {
                handleChangeFilterWhitoutReload(
                    "country",
                    countryObject.countryNameRu
                );
            }
        }
    }, [lang]);

    return (
        <div className={styles.filters}>
            <Dropdown
                label={lang === "Ru" ? "Жанр" : "Genre"}
                selectedFilter={currentGenre}
                currentGenreObj={currentGenreObj}
                arrayRu={genresRuList}
                arrayEn={genresEnList}
                name="genre"
                handleChangeFilter={wrapAsyncFunction(handleChangeFilter)}
                first={true}
            />
            <Dropdown
                label={lang === "Ru" ? "Страна" : "Country"}
                selectedFilter={filterParams.country}
                currentGenreObj={null}
                arrayRu={countriesRuList}
                arrayEn={countriesEnList}
                name="country"
                handleChangeFilter={wrapAsyncFunction(handleChangeFilter)}
                first={false}
            />
            <RangeFilter
                name="rate"
                min={0}
                max={10}
                step={0.1}
                value={filterParams.rate}
                handleChangeFilter={wrapAsyncFunction(handleChangeFilter)}
                handleChangeRange={() => getFirstFilmcards(filterParams)}
            />
            <RangeFilter
                name="votes"
                min={100000}
                max={10000000}
                step={100000}
                value={filterParams.votes ? filterParams.votes : 100000}
                handleChangeFilter={wrapAsyncFunction(handleChangeFilter)}
                handleChangeRange={() => getFirstFilmcards(filterParams)}
            />
            <InputFilter
                name="director"
                label={lang === "Ru" ? "Режиссёр" : "Director"}
                value={filterParams.director}
                handleChangeFilter={wrapAsyncFunction(handleChangeFilter)}
                getFirstFilmcards={getFirstFilmcards}
                filterParams={filterParams}
                first={true}
            />
            <InputFilter
                name="actor"
                label={lang === "Ru" ? "Актёр" : "Actor"}
                value={filterParams.actor}
                handleChangeFilter={wrapAsyncFunction(handleChangeFilter)}
                getFirstFilmcards={getFirstFilmcards}
                filterParams={filterParams}
                first={false}
            />
            <div className={styles.clearFilters} onClick={clearFilters}>
                <span>
                    <BsXLg />
                </span>
                <span>
                    <FormattedMessage id="ResetFilters" />
                </span>
            </div>
        </div>
    );
};

export default FiltersField;
