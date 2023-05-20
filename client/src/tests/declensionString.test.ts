import declensionString from "../utils/declensionString";

/** Тест проверяет корректность склонения слов. */
describe("declensionString", () => {
    test("1", () => {
        expect(declensionString(1, ["минута", "минуты", "минут"])).toEqual(
            "1 минута"
        );
    });
    test("С 2 до 4", () => {
        expect(declensionString(3, ["минута", "минуты", "минут"])).toEqual(
            "3 минуты"
        );
    });
    test("С 5 до 20", () => {
        expect(declensionString(15, ["минута", "минуты", "минут"])).toEqual(
            "15 минут"
        );
    });
    test("С 21 с окончанием на 1", () => {
        expect(declensionString(41, ["минута", "минуты", "минут"])).toEqual(
            "41 минута"
        );
    });
    test("С 21 с окончанием на 2-4", () => {
        expect(declensionString(64, ["минута", "минуты", "минут"])).toEqual(
            "64 минуты"
        );
    });
    test("С 21 с окончанием на 5-9", () => {
        expect(declensionString(78, ["минута", "минуты", "минут"])).toEqual(
            "78 минут"
        );
    });
    test("С 21 с окончанием на 0", () => {
        expect(declensionString(90, ["минута", "минуты", "минут"])).toEqual(
            "90 минут"
        );
    });
});
