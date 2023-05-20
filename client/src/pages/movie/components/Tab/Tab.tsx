import { ITab } from "../MainModal/models/ITab";
import styles from "./Tab.module.scss";
import React, { FC } from "react";
import { useRouter } from "next/router";

const Tab: FC<ITab> = ({ nameBtn, typ }) => {
    const router = useRouter();
    const { id, type } = router.query;

    const pushQuery = async (type: string) => {
        await router.push({
            pathname: "/movie/" + String(id),
            query: { type }
        });
    };

    return (
        <div
            className={
                styles.Tab + " " + (type === typ ? styles.Tab__active : "")
            }
            onClick={() => pushQuery(typ)}
        >
            <p>{nameBtn}</p>
        </div>
    );
};

export default Tab;
