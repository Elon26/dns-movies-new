import React from "react";
import { useSelector } from "react-redux";
import { getFilm } from "../../../../store/film";
import Link from "next/link";
import MyButton from "../../../../components/common/MyButton/MyButton";
import Image from "next/image";
import { IStaff } from "../../../../models";

const ActorsList = () => {
    const films = useSelector(getFilm());

    return (
        <>
            {films?.staff?.slice(0, 4).map((actors: IStaff) => (
                <Link
                    key={actors?.id}
                    href={"/person/" + String(actors?.personId)}
                >
                    <div key={actors?.person?.id}>
                        <MyButton type="footer" size="large">
                            <Image
                                src={actors?.posterUrl || ""}
                                width={47}
                                height={47}
                                alt=""
                            />
                        </MyButton>
                        <p>{actors?.nameRu}</p>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default ActorsList;
