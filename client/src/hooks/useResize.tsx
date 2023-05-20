import { useState, useEffect } from "react";

export const useResize = () => {
    if (typeof window !== "undefined") {
        const [size, setSize] = useState(window.innerWidth);

        const handleResize = () => {
            const width = window.innerWidth;
            setSize(width);
        };

        useEffect(() => {
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        });

        useEffect(() => {
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, []);
        return size;
    }
};
