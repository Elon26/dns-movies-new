import { AxiosError } from "axios";

/** Функция принимает ошибку и выводит сообщение пользователю с её кодом и содержанием. */
function catchError(error: AxiosError): void {
    console.log(error);
}

export default catchError;
