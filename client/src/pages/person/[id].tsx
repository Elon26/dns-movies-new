import React, { useEffect, FC } from "react";
import styles from "./person.module.scss";
import { getAllPerson, getOnePerson } from "./api/personApi";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getPerson, personRequest } from "../../store/person";
import { IPerson, IPropsPerson } from "./models/IPerson";
import { GetStaticProps } from "next";
import { IProps } from "../movie/models/IPropsMovie";
import HeadPerson from "./components/HeadPerson/HeadPerson";
import FilmList from "./components/FilmList/FilmList";
import FilmTitle from "./components/FilmTitle/FilmTitle";
import { FormattedMessage } from "react-intl";
import Translate from "../../components/common/Translate/Translate";

const Person: FC<IPropsPerson> = ({ persons }): React.ReactElement => {
    const person = useSelector(getPerson());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(personRequest(persons));
    }, [persons]);

    if (!person) {
        return <></>;
    }

    return (
        <>
            <HeadPerson />
            <div className={styles.Person}>
                <div className={styles.Person__container}>
                    <div className={styles.Person__img}>
                        <Image
                            src={person?.person?.posterUrl || ""}
                            width={120}
                            height={144}
                            loading="eager"
                            alt=""
                        />
                    </div>
                    <h1>
                        <Translate
                            rus={person?.person?.nameRu}
                            engl={person?.person?.nameEng}
                        />
                    </h1>
                    {person.person.birthday ? (
                        <h2>
                            <FormattedMessage id="Birthday" />:{" "}
                            {person?.person?.birthday?.split("-").join(".")}
                        </h2>
                    ) : (
                        ""
                    )}
                    {person.person.death ? (
                        <h2>
                            <FormattedMessage id="Death" />
                            {person?.person?.death?.replace("-", ".")}
                        </h2>
                    ) : (
                        ""
                    )}
                    <FilmTitle />
                    <FilmList />
                </div>
            </div>
        </>
    );
};

export default Person;

export async function getStaticPaths() {
    const persons: IPerson[] = await getAllPerson();
    let paths: IProps[];
    if (persons.length) {
        paths = persons?.map((person: IPerson) => ({
            params: { id: String(person?.person?.id) }
        }));

        return {
            paths,
            fallback: true
        };
    }
    return {
        paths: [],
        fallback: true
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    let data: null | IPerson = null;
    try {
        data = await getOnePerson(String(context?.params?.id || 0));
    } catch (err) {}

    if (!data) {
        return {
            notFound: true
        };
    } else if (!data.person) {
        return {
            notFound: true
        };
    }

    return {
        props: { persons: data }
    };
};
