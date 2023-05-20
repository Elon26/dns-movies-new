/** Функция ограничивает размер текста указанным числом символов */
function limitText(text: string, limit: number) {
    return text.length < limit + 1 ? text : text.slice(0, limit) + "...";
}

export default limitText;
