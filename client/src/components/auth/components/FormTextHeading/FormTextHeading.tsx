import React from "react";
import styles from "./FormTextHeading.module.scss";

export default function FormTextHeading() {
    return (
        <div className={styles.heading}>
            <h3>Войдите или зарегистрируйтесь</h3>
            <p>чтобы пользоваться сервисом на любом устройстве</p>
        </div>
    );
}
