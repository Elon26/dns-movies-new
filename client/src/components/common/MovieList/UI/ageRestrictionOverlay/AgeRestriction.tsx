import React from "react";
import styles from "./AgeRestriction.module.scss";
import { IAgeProps } from "./models/IAge";

export default function AgeRestriction({ age }: IAgeProps) {
    return <div className={styles.age}>{age || 12}+</div>;
}
