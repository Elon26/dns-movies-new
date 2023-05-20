import React, { useState } from "react";
import styles from "./inputFilter.module.scss";
import axios, { AxiosError } from "axios";
import {
    IFilterParams,
    ISuggestObject,
    ISuggestResponse
} from "../../../../models";
import catchError from "../../../../utils/catchError";
import { domen } from "../../../../constats";
import { wrapAsyncFunction } from "../../../../utils/wrapAsyncFunction";

interface InputFilterProps {
    name: string;
    label: string;
    value: string;
    handleChangeFilter(filterKey: string, filterValue: string | string[]): void;
    getFirstFilmcards(filterParams: IFilterParams): void;
    filterParams: IFilterParams;
    first: boolean;
}

/** Компонент c полем ввода и автосаджестом. */
const InputFilter = ({
    name,
    label,
    value,
    handleChangeFilter,
    filterParams,
    getFirstFilmcards,
    first
}: InputFilterProps): React.ReactElement => {
    const [suggestions, setSuggestions] = useState<ISuggestObject[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    let suggestionSize = "9";
    if (window.innerWidth <= 480) suggestionSize = "6";

    /** Функция запрашивает набор значений из базы данных, соответствующих набору символов, введённому пользователем. */
    async function getAutosuggest(
        e: React.KeyboardEvent<HTMLInputElement>
    ): Promise<void> {
        if (e.target instanceof HTMLInputElement) {
            if (e.target.value !== "") {
                try {
                    const response = await axios.get(
                        `${domen}persons/search?profession=${
                            name === "director" ? "режиссер" : "актер"
                        }&name=${e.target.value}&size=${suggestionSize}`
                    );
                    const data = response.data as ISuggestResponse;
                    const suggestionsFromDB = data.rows;
                    suggestionsFromDB.length > 0
                        ? setIsOpen(true)
                        : setIsOpen(false);
                    const sortedSuggestionsFromDB = suggestionsFromDB.sort(
                        (a, b) => {
                            if (a.nameRu < b.nameRu) return -1;
                            if (a.nameRu > b.nameRu) return 1;
                            return 0;
                        }
                    );
                    setSuggestions(sortedSuggestionsFromDB);
                } catch (e: unknown) {
                    const error = e as AxiosError;
                    catchError(error);
                }
            } else {
                setIsOpen(false);
                setSuggestions([]);
            }
        }
    }

    /** Функция открывает всплывающее окно с подсказками и фокусе на поле ввода, если оно непустое. */
    function handleFocus(): void {
        if (value !== "" && suggestions.length > 0) {
            setIsOpen(true);
        }
    }

    /** Функция закрывает всплывающее окно с подсказками при снятии фокуса с поля ввода. */
    function handleBlur(): void {
        setIsOpen(false);
    }

    /** Функция запускает поиск по выбранному полю и закрывает всплывающее окно . */
    function handleClick(e: React.MouseEvent<HTMLElement>): void {
        if (
            e.target instanceof HTMLElement &&
            e.target.textContent &&
            e.target.closest(`.${styles.dropdownItem}`)
        ) {
            setSuggestions([]);
            handleBlur();

            const personId = e.target.dataset.personId as string;
            let newFilterParams = filterParams;
            handleChangeFilter(name, [e.target.textContent, personId]);

            if (name === "director") {
                newFilterParams = {
                    ...newFilterParams,
                    director: e.target.textContent,
                    directorId: personId
                };
            }
            if (name === "actor") {
                newFilterParams = {
                    ...newFilterParams,
                    actor: e.target.textContent,
                    actorId: personId
                };
            }

            getFirstFilmcards(newFilterParams);
        }
    }

    return (
        <div className={styles.wrapper}>
            <label htmlFor={name + "FilterInput"}>{label}</label>
            <input
                type="text"
                className={styles.input}
                id={name + "FilterInput"}
                value={value}
                onChange={(e) =>
                    handleChangeFilter(name, [e.target.value, "-1"])
                }
                onInput={wrapAsyncFunction(getAutosuggest)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoComplete="off"
            />
            <div
                className={
                    styles.dropdownArea +
                    (isOpen ? " " + styles.dropdownOpen : "") +
                    (first
                        ? ` ${styles.inputDropdownLeft}`
                        : ` ${styles.inputDropdownRight}`)
                }
                onClick={handleClick}
            >
                {suggestions &&
                    suggestions.map((suggestion) => (
                        <div
                            className={
                                styles.dropdownItem +
                                (suggestions.length === 2
                                    ? " " + styles.dropdownItem_twoItem
                                    : "") +
                                (suggestions.length === 1
                                    ? " " + styles.dropdownItem_oneItem
                                    : "")
                            }
                            key={
                                name +
                                " suggestion " +
                                suggestion.personId.toString()
                            }
                            data-person-id={suggestion.personId}
                        >
                            {suggestion.nameRu}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default InputFilter;
