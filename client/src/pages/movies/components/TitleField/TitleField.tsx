import React from "react";
import styles from "./titleField.module.scss";

interface TitleFieldProps {
    pageTitle?: string;
    pageDescription: string;
}

/** Компонент c иконкой со всплывающей подсказкой */
const TitleField = ({
    pageTitle,
    pageDescription
}: TitleFieldProps): React.ReactElement => {
    return (
        <>
            <h1 className="pageTitle" data-testid="pageTitleFromMoviesPage">
                {pageTitle}
            </h1>
            <div
                className={styles.pageDescription}
                data-testid="pageDescriptionFromMoviesPage"
            >
                {pageDescription}
            </div>
        </>
    );
};

export default TitleField;
