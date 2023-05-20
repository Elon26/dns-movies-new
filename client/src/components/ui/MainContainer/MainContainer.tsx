import React from "react";
import Head from "next/head";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

interface MainContainerProps {
    children: React.ReactNode;
    title: string;
}

/** HOC-обёртка для страниц приложения. */
const MainContainer = ({
    children,
    title
}: MainContainerProps): React.ReactElement => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </Head>
            <div className="wrapper">
                <Breadcrumbs />
                <main>{children}</main>
            </div>
        </>
    );
};

export default MainContainer;
