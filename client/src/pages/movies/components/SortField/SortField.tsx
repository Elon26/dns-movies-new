import React, { useState, useEffect } from "react";
import styles from "./sortField.module.scss";
import { BsChevronDown, BsFilterRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getLang } from "../../../../store/switchLang";
import { useClickCatcher } from "../../../../hooks/useClickCatcher";
import { sortParams } from "../../../../constats";

interface SortFieldProps {
    sortParam: string;
    changeSortParam(param: string): void;
}

/** Компонент, предназначенный для выбора параметров сортировки. */
const SortField = ({
    sortParam,
    changeSortParam
}: SortFieldProps): React.ReactElement => {
    const lang = useSelector(getLang());
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { elemInFocus } = useClickCatcher();

    /** Данная настройка закрывает всплывающее окно при клике на область, не относящуюся к данному окну. */
    useEffect(() => {
        if (
            !elemInFocus?.closest(`.${styles.visibleArea}`) &&
            !elemInFocus?.closest(`.${styles.dropdownArea}`)
        ) {
            setIsOpen(false);
        }
    }, [elemInFocus]);

    /** Функция преобразует параметр сортировки из значения, предусмотренного для системного использования, в значение, предусмотренное для отображения пользователю. */
    function convertSortParamToLabel(sortParam: string): string {
        const sortParamsObj = sortParams.find(
            (item) => sortParam === item.name
        );
        if (sortParamsObj) {
            return lang === "Ru"
                ? sortParamsObj.rusLabel
                : sortParamsObj.engLabel;
        } else {
            return "";
        }
    }

    /** Функция преобразует параметр сортировки из значения, предусмотренного для отображения пользователю, в значение, предусмотренное для системного использования. */
    function convertSortParamToName(sortParam: string): string {
        const sortParamsObj = sortParams.find(
            (item) => sortParam === item.engLabel || sortParam === item.rusLabel
        );
        if (sortParamsObj) {
            return sortParamsObj.name;
        } else {
            return "";
        }
    }

    /** Функция устанавливает значение сортировки, выбранное пользователем. */
    function handleCheckItem(e: React.MouseEvent<HTMLElement>): void {
        if (e.target instanceof HTMLElement && e.target.textContent) {
            changeSortParam(convertSortParamToName(e.target.textContent));
            setIsOpen(false);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.visibleArea}
                onClick={() => setIsOpen((prev) => !prev)}
                data-testid="SortDropdownOpenButton"
            >
                <span>
                    <BsFilterRight />
                </span>
                <span>{convertSortParamToLabel(sortParam)}</span>
                <span
                    className={
                        styles.arrowCol +
                        (isOpen ? ` ${styles.arrowColRev}` : "")
                    }
                >
                    <BsChevronDown />
                </span>
            </div>
            <div
                className={
                    styles.dropdownArea +
                    (isOpen ? ` ${styles.dropdownOpen}` : "")
                }
                data-testid="SortDropdownHiddenArea"
            >
                {sortParams.map((item) => (
                    <p
                        key={item.name + " " + Date.now().toString()}
                        className={
                            styles.dropdownItem +
                            (item.name === sortParam
                                ? " " + styles.selectedItem
                                : "")
                        }
                        onClick={handleCheckItem}
                    >
                        {lang === "Ru" ? item.rusLabel : item.engLabel}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default SortField;
