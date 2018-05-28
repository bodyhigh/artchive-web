import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ResponseUtilService } from "./response-util.service";

import { environment } from '../../environments/environment';

import { Observable } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";

interface LoginResponse {
    success: boolean,
    message: string,
    token: string,
    firstName: string,
    lastName: string
}

@Injectable()
export class AuthService {
    authApiLoginEndpoint: string;
    jwtToken: string;
    jwtTokenName: string;

    constructor(private httpClient:HttpClient, 
        private responseUtil: ResponseUtilService,
        private jwtHelper: JwtHelperService 
    ) {
        this.authApiLoginEndpoint = environment.authApiLoginEndpoint;
        this.jwtTokenName = environment.jwtTokenKey;
        this.jwtToken = localStorage.getItem(this.jwtTokenName);
    }

    isLoggedIn() {
        return this.jwtToken && !this.jwtHelper.isTokenExpired();
    }

    login(username: string, password: string) : Observable<{loggedIn: boolean, message: string}> {
        return this.httpClient.post<LoginResponse>(this.authApiLoginEndpoint, { username: username, password: password })
            .pipe(
                tap(res => {
                    if (res.token && res.success === true) {
                        this.jwtToken = res.token;
                        localStorage.setItem(this.jwtTokenName, this.jwtToken);
                        localStorage.setItem(environment.localStorageUserKey, JSON.stringify({ 
                            firstName: res.firstName, 
                            lastName: res.lastName}));
                    } else {
                        this.responseUtil.handleResponseError(res);
                    }
                }),
                map(res => {
                    return { loggedIn: res.success, message: res.message };
                }),
                catchError(this.responseUtil.handleResponseError)
            );
    }

    logout() {
        localStorage.removeItem(this.jwtTokenName);
    }
}