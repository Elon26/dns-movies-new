import Image from "next/image";
import styles from "../Actors/Actors.module.scss";
import { useSelector } from "react-redux";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { getFilm } from "../../../../store/film";
import TrailerMain from "../../../../components/ui/TrailerMain/TrailerMain";

const TrailerModal: FC<{ callback: () => void }> = ({ callback }) => {
    const film = useSelector(getFilm());

    if (!film?.film?.trailers?.length) {
        return <></>;
    }

    return (
        <div className={styles.Actors__all}>
            <h1 onClick={() => callback()}>
                <FormattedMessage id="TrailerAndMaterial" />
            </h1>
            {film?.film?.trailers?.map((trailer) => (
                <TrailerMain
                    trailer={trailer.url}
                    key={trailer.id + 4}
                    content={
                        <div className={styles.Actors__trariler}>
                            <Image
                                src={
                                    film?.film?.logoUrl || film?.film.posterUrl
                                }
                                width={288}
                                height={166}
                                alt=""
                            />
                            <p>{trailer?.name}</p>
                        </div>
                    }
                />
            ))}
        </div>
    );
};

export default TrailerModal;
