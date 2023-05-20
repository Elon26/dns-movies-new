import React, { FC } from "react";
import styles from "./Actors.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import MyButton from "../../../../components/common/MyButton/MyButton";
import Link from "next/link";
import { getFilm } from "../../../../store/film";

const Actors: FC<{ callback: () => void }> = ({ callback }) => {
    const film = useSelector(getFilm());

    if (!film?.staff?.length) {
        return <></>;
    }

    return (
        <div className={styles.Actors}>
            <div className={styles.Actors__all}>
                <h1 onClick={() => callback()}>
                    <FormattedMessage id="CreatersAndActors" />
                </h1>
                <div className={styles.Actors__container}>
                    {film?.staff?.slice(0, 9).map((actor, i) => (
                        <Link
                            key={actor.id}
                            href={"/person/" + String(actor?.personId)}
                        >
                            <div
                                data-testid="actorUnitTest"
                                key={String(actor.personId) + String(i)}
                                className={styles.Actors__unit}
                            >
                                <div>
                                    <Image
                                        src={actor?.posterUrl || ""}
                                        alt=""
                                        width={88}
                                        height={88}
                                    />
                                </div>
                                <p className={styles.Name}>{actor?.nameRu}</p>
                                <p className={styles.Prof}>
                                    {actor?.profession?.split(",")[0]}
                                </p>
                            </div>
                        </Link>
                    ))}
                    <div className={styles.Actors__visible}>
                        <MyButton
                            onClick={() => callback()}
                            type="footer"
                            figure="circle"
                            size="large"
                        >
                            <FormattedMessage id="More" />
                        </MyButton>
                    </div>
                    {Number(film?.staff?.length) > 8 ? (
                        <div className={styles.Actors__unitMy}>
                            <MyButton
                                onClick={() => callback()}
                                type="footer"
                                figure="circle"
                                size="large"
                            >
                                <FormattedMessage id="More" />
                            </MyButton>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default Actors;
