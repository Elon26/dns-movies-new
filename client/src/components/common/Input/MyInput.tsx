import React, { CSSProperties, FC, Ref, forwardRef } from "react";
import styles from "./MyInput.module.scss";

interface IMyInput {
    callback?: (e?: any) => void;
    placeholder?: string | React.ReactNode;
    ref?: Ref<HTMLInputElement> | undefined;
    styler?: CSSProperties;
    testId?: string;
}

const MyInput: FC<IMyInput> = forwardRef(
    ({ callback, placeholder, styler, testId }, ref) => {
        const fn = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (callback) {
                callback(e.target.value);
            }
        };

        return (
            <div className={styles.MyInput}>
                <input
                    data-testid={testId}
                    style={styler}
                    ref={ref}
                    onChange={(e) => {
                        fn(e);
                    }}
                    placeholder={String(placeholder) || "Поиск..."}
                />
            </div>
        );
    }
);

export default MyInput;
