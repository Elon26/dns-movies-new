import React, { useState } from "react";
import styles from "./SearchWindow.module.scss";
import MyInput from "../../../../common/Input/MyInput";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { getLang } from "../../../../../store/switchLang";
import { BsSearch } from "react-icons/bs";
import { IMovieOne } from "../../../../../models";
import { trotl } from "../../api/searchApi";
import { IData } from "../../../../../pages/movie/models/IApi";
import DefaultWindow from "../DefaultWindow/DefaultWindow";
import BlockSearch from "../BlockSearch/BlockSearch";
import Modal from "../../../../common/Modal/Modal";

/** Компонент модального окна поиска в Header */

const SearchWindow = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const lang = useSelector(getLang());
    const [search, setSearch] = useState<IMovieOne[]>();
    const searchFn = async (query: string) => {
        const res: IData<IMovieOne[]> | undefined = await trotl(query);
        setSearch(res?.data);
    };

    return (
        <div className={styles.SearchWindow}>
            <div
                className={styles.SearchWindow__div}
                onClick={() => setVisible((p) => !p)}
            >
                <BsSearch />
                <p>
                    {" "}
                    <FormattedMessage id="Search" />
                </p>
            </div>
            <Modal callback={() => setVisible((p) => !p)} visible={visible}>
                <div className={styles.SearchWindow__modal}>
                    <h1>
                        <FormattedMessage id="Search" />
                    </h1>
                    <MyInput
                        callback={(e: string) => searchFn(e)}
                        placeholder={lang === "Ru" ? "Поиск" : "Search"}
                    />
                    {!search?.length ? (
                        <DefaultWindow />
                    ) : (
                        <div className={styles.BlockList}>
                            <div>
                                {search
                                    ?.slice(0, 5)
                                    .map(({ nameRu, year, kinopoiskId }) => (
                                        <BlockSearch
                                            key={kinopoiskId}
                                            id={kinopoiskId}
                                            name={nameRu}
                                            year={year}
                                            callback={() => setVisible(false)}
                                        />
                                    ))}
                            </div>
                            <div>
                                {search
                                    ?.slice(5, 10)
                                    .map(({ nameRu, year, kinopoiskId }) => (
                                        <BlockSearch
                                            id={kinopoiskId}
                                            name={nameRu}
                                            year={year}
                                            callback={() => setVisible(false)}
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default SearchWindow;
