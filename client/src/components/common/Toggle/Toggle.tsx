import React, { FC, useState } from "react";
import styles from "./Toggle.module.scss";
import polygonBottom from "../../../assets/SVG/Polygon/PolygonBottom.svg";
import polygonTop from "../../../assets/SVG/Polygon/PolygonTop.svg";
import Image from "next/image";

interface IToggle {
    children: React.ReactNode;
    nameBtn: string | React.ReactNode;
    stylesBol?: boolean;
    className?: string;
    onClick?: () => void;
}

const Toggle: FC<IToggle> = ({
    children,
    nameBtn,
    stylesBol = true,
    className,
    onClick
}) => {
    const [bol, setBol] = useState<boolean>(false);

    if (bol) {
        return (
            <div className={stylesBol ? styles.Toggle : ""}>
                <button
                    data-testid="toggleBtn"
                    onClick={() => setBol((p) => !p)}
                    className={className}
                >
                    {nameBtn}{" "}
                    <Image width={9} height={9} src={polygonTop} alt="" />
                </button>
                <div data-testid="textTest">{children}</div>
            </div>
        );
    }

    return (
        <div onClick={onClick} className={stylesBol ? styles.Toggle : ""}>
            <button
                data-testid="toggleBtn"
                onClick={() => setBol((p) => !p)}
                className={className}
            >
                {nameBtn}{" "}
                <Image width={9} height={9} src={polygonBottom} alt="" />
            </button>
        </div>
    );
};

export default Toggle;
