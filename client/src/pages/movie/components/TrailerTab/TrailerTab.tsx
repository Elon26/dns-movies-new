import { useSelector } from "react-redux";
import React from "react";
import { getFilm } from "../../../../store/film";
import Trailer from "../../../../components/ui/TrailerMain/TrailerMain";
import Image from "next/image";
import styles from "./TrailerTab.module.scss";

const TrailerTab = () => {
    const films = useSelector(getFilm());

    if (!films?.film?.trailers?.length) {
        return <></>;
    }

    return (
        <>
            {films?.film?.trailers?.map((trailer) => (
                <Trailer
                    key={trailer.id}
                    trailer={trailer?.url}
                    content={
                        <div className={styles.TrailerTab}>
                            <Image
                                src={
                                    films?.film?.logoUrl ||
                                    films?.film.posterUrl
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
        </>
    );
};

export default TrailerTab;
