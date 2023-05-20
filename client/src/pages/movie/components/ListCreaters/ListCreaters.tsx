import Link from "next/link";
import React, { FC } from "react";
import { IStaff } from "../../../../models";
import Image from "next/image";
import styles from "../Creaters/Creaters.module.scss";

const ListCreaters: FC<{ actors?: IStaff[]; name: string }> = ({
    actors,
    name
}) => {
    return (
        <>
            {actors
                ?.filter((staff) => staff?.profession?.split(",")[0] === name)
                .map((actor) => (
                    <Link key={actor?.id} href={`/person/${actor?.personId}`}>
                        <div
                            data-testid="unitComponent"
                            className={styles.Actors__unit}
                        >
                            <div className="">
                                <Image
                                    src={actor?.posterUrl || ""}
                                    alt=""
                                    width={1128}
                                    height={1228}
                                />
                            </div>
                            <p>{actor?.nameRu}</p>
                        </div>
                    </Link>
                ))}
        </>
    );
};

export default ListCreaters;
