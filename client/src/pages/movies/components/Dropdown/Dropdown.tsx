import React, { useState, useEffect } from "react";
import styles from "./dropdown.module.scss";
import translateGenre from "../../../../utils/translateGenre";
import { BsChevronDown } from "react-icons/bs";
import { useClickCatcher } from "../../../../hooks/useClickCatcher";
import { useSelector } from "react-redux";
import { getLang } from "../../../../store/switchLang";
import { IGenreObject } from "../../../../models";

interface DropdownProps {
    label: string;
    selectedFilter: string;
    currentGenreObj: IGenreObject | null;
    arrayRu: string[];
    arrayEn: string[];
    name: string;
    handleChangeFilter(filterKey: string, filterValue: string): void;
    first: boolean;
}

/** Компонент со всплывающим окном. */
const Dropdown = ({
    label,
    selectedFilter,
    currentGenreObj,
    arrayRu,
    arrayEn,
    name,
    handleChangeFilter,
    first
}: DropdownProps): React.ReactElement => {
    const lang = useSelector(getLang());
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { elemInFocus } = useClickCatcher();
    const sortedArrayRu = arrayRu.sort();
    const sortedArrayEn = arrayEn.sort();

    /** Данная настройка закрывает всплывающее окно при клике на область, не относящуюся к данному окну. */
    useEffect(() => {
        if (
            !elemInFocus?.closest(`.${name}`) ||
            (!elemInFocus?.closest(`.${styles.visibleArea}`) &&
                !elemInFocus?.closest(`.${styles.dropdownArea}`) &&
                !elemInFocus?.closest(`.${styles.dropdownItem}`))
        ) {
            setIsOpen(false);
        }
    }, [elemInFocus]);

    /** Данная функция устанавливает значение фильтра, выбранное пользователем во всплывающем окне. */
    function handleCheckItem(e: React.MouseEvent<HTMLElement>) {
        if (e.target instanceof HTMLElement) {
            setIsOpen(false);
            handleChangeFilter(name, e.target.innerHTML);
        }
    }

    return (
        <div className={styles.wrapper + " " + name}>
            <div
                className={styles.visibleArea}
                onClick={() => setIsOpen((prev) => !prev)}
                data-testid="FilterDropdownOpenButton"
            >
                <div className={styles.selectedFilterCol}>
                    <p>{label}</p>
                    {name === "genre" && currentGenreObj
                        ? selectedFilter !== "all" && (
                            <p>
                                {lang === "Ru"
                                    ? currentGenreObj.genreNameRu
                                    : currentGenreObj.genreNameEng}
                            </p>
                        )
                        : selectedFilter !== "all" && <p>{selectedFilter}</p>}
                </div>
                <div
                    className={
                        styles.arrowCol +
                        (isOpen ? " " + styles.arrowColRev : "")
                    }
                >
                    <BsChevronDown />
                </div>
            </div>
            <div
                className={
                    styles.dropdownArea +
                    (isOpen ? ` ${styles.dropdownOpen}` : "") +
                    (first
                        ? ` ${styles.dropdownLeft}`
                        : ` ${styles.dropdownRight}`)
                }
                data-testid="FilterDropdownHiddenArea"
            >
                {lang === "Ru" &&
                    sortedArrayRu.map((item) =>
                        name === "genre" ? (
                            <p
                                key={item + " " + Date.now().toString()}
                                className={
                                    styles.dropdownItem +
                                    (item.toLowerCase() ===
                                    translateGenre(selectedFilter).toLowerCase()
                                        ? " " + styles.selectedItem
                                        : "")
                                }
                                onClick={handleCheckItem}
                            >
                                {item}
                            </p>
                        ) : (
                            <p
                                key={item + " " + Date.now().toString()}
                                className={
                                    styles.dropdownItem +
                                    (item.toLowerCase() ===
                                    selectedFilter.toLowerCase()
                                        ? " " + styles.selectedItem
                                        : "")
                                }
                                onClick={handleCheckItem}
                            >
                                {item}
                            </p>
                        )
                    )}
                {lang === "En" &&
                    sortedArrayEn.map((item) =>
                        name === "genre" ? (
                            <p
                                key={item + " " + Date.now().toString()}
                                className={
                                    styles.dropdownItem +
                                    (item.toLowerCase() ===
                                    selectedFilter.toLowerCase()
                                        ? " " + styles.selectedItem
                                        : "")
                                }
                                onClick={handleCheckItem}
                            >
                                {item}
                            </p>
                        ) : (
                            <p
                                key={item + " " + Date.now().toString()}
                                className={
                                    styles.dropdownItem +
                                    (item.toLowerCase() ===
                                    selectedFilter.toLowerCase()
                                        ? " " + styles.selectedItem
                                        : "")
                                }
                                onClick={handleCheckItem}
                            >
                                {item}
                            </p>
                        )
                    )}
            </div>
        </div>
    );
};

export default Dropdown;
