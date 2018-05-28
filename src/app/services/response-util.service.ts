import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ResponseUtilService {

    constructor() { }

    public handleResponseError(err: any) {    
        let errorMessage: string;        

        if (err instanceof HttpErrorResponse) {
            errorMessage = `${err.status} - ${err.statusText || ''} ${err.error}`;
        } else if (err instanceof Response) {
            const body = err.json() || '';
            const error = JSON.stringify(body);//body.error || JSON.stringify(body);
            errorMessage = `${err.status} - ${err.statusText || ''} ${error}`;
        }

        return observableThrowError(errorMessage);
    }
}
