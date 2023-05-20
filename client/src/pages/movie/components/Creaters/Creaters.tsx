import React, { useState, useEffect } from "react";
import styles from "./Creaters.module.scss";
import { useSelector } from "react-redux";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import { getFilm } from "../../../../store/film";
import Link from "next/link";
import { IPerson, IStaff } from "../../../../models";
import { getActor } from "../../api/actors";
import ListCreaters from "../ListCreaters/ListCreaters";

const Creaters = () => {
    const film = useSelector(getFilm());
    const [actors, setActors] = useState<IStaff[]>();

    useEffect(() => {
        getActor(String(film?.film?.id) || "0")
            .then((e) => setActors(e))
            .catch((e) => console.log(e));
    }, []);

    if (!actors) {
        return (
            <h1>
                <FormattedMessage id="Loading" />
            </h1>
        );
    }
    return (
        <div className={styles.Creaters}>
            <h1>
                {actors?.find(
                    (actor) => actor?.profession?.split(",")[0] === "Актер"
                ) ? (
                    <FormattedMessage id="Actors" />
                ) : (
                    ""
                )}
            </h1>
            <div className={styles.Creaters__rez}>
                <ListCreaters actors={actors} name="Актер" />
                <ListCreaters actors={actors} name="Актриса" />
            </div>
            <h1>
                {actors?.find(
                    (actor) => actor?.profession?.split(",")[0] === "Режиссер"
                ) ? (
                    <FormattedMessage id="Director" />
                ) : (
                    ""
                )}
            </h1>
            <div className={styles.Creaters__rez}>
                <ListCreaters actors={actors} name="Режиссер" />
            </div>
            <h1>
                {actors?.find(
                    (actor) => actor?.profession?.split(",")[0] === "Продюсер"
                ) ? (
                    <FormattedMessage id="Producer" />
                ) : (
                    ""
                )}
            </h1>
            <div className={styles.Creaters__rez}>
                <ListCreaters actors={actors} name="Продюсер" />
            </div>
        </div>
    );
};

export default Creaters;
