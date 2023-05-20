import React, { FC, useState } from "react";
import { IToggleMovie } from "./models/IToggleMovie";
import styles from "./ToggleMovie.module.scss";

const ToggleMovie: FC<IToggleMovie> = ({
    children,
    heigth,
    nameStart,
    nameEnd
}) => {
    const [bol, setBol] = useState<boolean>(false);

    return (
        <div>
            <div
                style={{
                    overflow: "hidden",
                    height: bol ? "100%" : heigth || "150px"
                }}
            >
                {children}
            </div>
            <p className={styles.ToggleMovie} onClick={() => setBol((p) => !p)}>
                {bol ? <>{nameStart}</> : <>{nameEnd}</>}
            </p>
        </div>
    );
};

export default ToggleMovie;
