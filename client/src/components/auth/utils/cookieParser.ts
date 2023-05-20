export const cookieParser = (cookieName: string): string | undefined => {
    const cookieValue = document.cookie
        .split(";")
        .find((elem) => elem.includes(cookieName))
        ?.split("=")[1];
    if (cookieValue) {
        return cookieValue;
    }
    return undefined;
};
