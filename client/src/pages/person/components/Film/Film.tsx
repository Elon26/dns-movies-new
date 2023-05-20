import Image from "next/image";
import styles from "./Film.module.scss";
import React, { FC } from "react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { IFilm } from "../../models/IPerson";
import MyButton from "../../../../components/common/MyButton/MyButton";
import Translate from "../../../../components/common/Translate/Translate";

interface IPropsFilm {
    film: IFilm;
}

const Film: FC<IPropsFilm> = ({ film }) => {
    return (
        <div className={styles.Film}>
            <Link href={"/movie/" + film?.kinopoiskId}>
                <div className={styles.Film__mainInfo}>
                    <div>
                        <Image
                            width={80}
                            height={122}
                            src={film?.posterUrl}
                            alt=""
                        />
                    </div>
                    <div>
                        <p className={styles.Year}>{film?.year}</p>
                        <p className={styles.Name}>
                            <Translate
                                rus={film.nameRu}
                                engl={film?.nameOriginal}
                            />
                        </p>
                        <p className={styles.Rating}>
                            <FormattedMessage id="RatingIvi" />:{" "}
                            {film?.ratingKinopoisk}
                        </p>
                    </div>
                </div>
                <div>
                    <MyButton type="footer" size="large">
                        <FormattedMessage id="Detail" />
                    </MyButton>
                </div>
            </Link>
        </div>
    );
};

export default Film;
