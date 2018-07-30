export class CustomError {
    field: string;
    errorMessage: string;

    constructor(field: string, errorMessage: string) {
        this.field = field;
        this.errorMessage = errorMessage;
    }
}

export class CustomResponseError {
    responseMessage: string;
    customErrors: CustomError[];

    constructor(responseMessage: string, customErrors: CustomError[]) {
        this.responseMessage = responseMessage;
        this.customErrors = customErrors;
    }
}