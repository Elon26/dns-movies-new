import { FormattedMessage } from "react-intl";
import styles from "../../movies.module.scss";
import { useSelector } from "react-redux";
import { getFilm } from "../../../../store/film";
import React from "react";
import styler from "../ToggleMovie/ToggleMovie.module.scss";
import ToggleMovie from "../ToggleMovie/ToggleMovie";

const Description = () => {
    const films = useSelector(getFilm());
    return (
        <div className={styles.Movie__description}>
            {Number(films?.film?.description.length) > 400 ? (
                <ToggleMovie
                    nameEnd={<FormattedMessage id="ToggleMovieHide" />}
                    nameStart={<FormattedMessage id="ToggleMovieShow" />}
                >
                    <p className={styles.text}>{films?.film?.description}</p>
                    <div>
                        {films?.film?.slogan ? (
                            <div className={styler.Description__lang}>
                                <h4>
                                    <FormattedMessage id="Slogan" />
                                </h4>
                                <h4>{films?.film?.slogan}</h4>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </ToggleMovie>
            ) : (
                <div className={styles.ToggleMovie}>
                    <p className={styles.text}>{films?.film?.description}</p>
                    <div>
                        {films?.film?.slogan ? (
                            <div className={styler.Description__lang}>
                                <h4>
                                    <FormattedMessage id="Slogan" />
                                </h4>
                                <h4>{films?.film?.slogan}</h4>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Description;
