import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";

interface IClickCatcherContextProps {
    elemInFocus: Element | null;
}

const defaultSort = {
    elemInFocus: null
};

const ClickCatcherContext =
    React.createContext<IClickCatcherContextProps>(defaultSort);

/** Кастомный хук, отслеживающий на уровне всего приложения, был ли сделан клик по заданному классу. */
export const useClickCatcher = () => {
    return useContext(ClickCatcherContext);
};

/** Higher-Order Component, предназначенный для отлавливания кликов на уровне всего приложения. */
const ClickCatcherProvider = ({
    children
}: {
    children: React.ReactElement;
}) => {
    const [elemInFocus, setElemInFocus] = useState<Element | null>(null);
    const router = useRouter();

    /** Функция отслеживает клик на всей площади экрана и меняет заранее заготовленный переключатель, по факту клика на заданный HTML-элемент. */
    const clickCatcher = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target instanceof Element) {
            setElemInFocus(e.target);
        }
    };

    /** Функционал снимает блокировку прокрутки экрана при переходе на другую страницу. */
    useEffect(() => {
        document.body.style.overflow = "visible";
    }, [router.pathname]);

    return (
        <ClickCatcherContext.Provider
            value={{
                elemInFocus
            }}
        >
            <div onClick={clickCatcher}>{children}</div>
        </ClickCatcherContext.Provider>
    );
};

export default ClickCatcherProvider;
