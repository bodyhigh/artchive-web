import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomResponseError } from './CustomResponseError';

@Injectable()
export class ResponseUtilService {

    constructor() { }

    public handleResponseError(err: any) {
        let errorMessage: string;
        let customResponseError: CustomResponseError;
        
        if (err instanceof HttpErrorResponse) {
            errorMessage = `${err.status} - ${err.statusText || ''} ${err.error}`;
            customResponseError = new CustomResponseError(errorMessage, err.error.customErrors)
            return observableThrowError(customResponseError);

        } else if (err instanceof Response) {
            const body = err.json() || '';
            const error = JSON.stringify(body);//body.error || JSON.stringify(body);
            errorMessage = `${err.status} - ${err.statusText || ''} ${error}`;
        }

        return observableThrowError(errorMessage);
    }
}
