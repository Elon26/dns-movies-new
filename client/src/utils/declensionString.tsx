export default function declensionString(value: number, arr: string[]) {
    if (value % 100 > 10 && value % 100 < 20)
        return value.toString() + " " + arr[2];
    if (value % 10 > 1 && value % 10 < 5)
        return value.toString() + " " + arr[1];
    if (value % 10 === 1) return value.toString() + " " + arr[0];
    return value.toString() + " " + arr[2];
}
