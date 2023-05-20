import React from "react";
import ButtonShowMore from "../ButtonShowMore/ButtonShowMore";
import LinkShowMore from "../LinkShowMore/LinkShowMore";

interface ShowMoreItemProps {
    valueDirection?: number;
    mode: "list" | "slider";
    href?: string;
}

export default function ShowMoreItem({
    valueDirection = 0,
    mode,
    href
}: ShowMoreItemProps) {
    return (
        <>
            {mode === "slider" ? (
                <LinkShowMore href={href} valueDirection={valueDirection} />
            ) : (
                <ButtonShowMore />
            )}
        </>
    );
}
