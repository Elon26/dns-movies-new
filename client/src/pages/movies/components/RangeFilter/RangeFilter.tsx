import React from "react";
import { Range } from "react-range";
import styles from "./rangeFilter.module.scss";
import { useSelector } from "react-redux";
import { getLang } from "../../../../store/switchLang";
import divideNumber from "../../../../utils/divideNumber";

interface RangeFilterProps {
    name: string;
    value: number;
    handleChangeFilter(filterKey: string, filterValue: string | number): void;
    handleChangeRange(): void;
    min: number;
    max: number;
    step: number;
}

/** Компонент c бегунком. */
const RangeFilter = ({
    name,
    value,
    handleChangeFilter,
    handleChangeRange,
    min,
    max,
    step
}: RangeFilterProps): React.ReactElement => {
    const lang = useSelector(getLang());

    return (
        <div className={styles.wrapper}>
            <div className="">
                {name === "rate"
                    ? lang === "Ru"
                        ? `Рейтинг от ${value}`
                        : `Rate from ${value}`
                    : lang === "Ru"
                        ? `Кол-во оценок от ${divideNumber(value / 1000000)} млн.`
                        : `Num-r of rat-s from ${divideNumber(
                            value / 1000000
                        )} mill.`}
            </div>
            <div className={styles.rangeContainer}>
                <Range
                    min={min}
                    max={max}
                    step={step}
                    values={[value]}
                    onChange={(values) => handleChangeFilter(name, values[0])}
                    onFinalChange={() => handleChangeRange()}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "6px",
                                width: "100%",
                                backgroundColor: "#ccc",
                                borderRadius: "6px"
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "15px",
                                width: "15px",
                                backgroundColor: "#ffffff",
                                borderRadius: "50%"
                            }}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default RangeFilter;
