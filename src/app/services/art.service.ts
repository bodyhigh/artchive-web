import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { ActivatedRouteSnapshot } from "@angular/router";
import { ResponseUtilService } from "./response-util.service";

import { Observable } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";

interface IArtImageUrl { 
    url: string, 
    isPrimary: boolean
}

interface IArtRecord { 
    title: string; 
    description: string; 
    artist: string; 
    url: IArtImageUrl[] 
}

@Injectable()
export class ArtService {
    private restApiEndpoint: string = `${environment.restApiEndpoint}/art`;

    constructor(private http: HttpClient, private responseUtil: ResponseUtilService) {

    }

    getPlaceholderImage() {
        return {
            thumbnailUrl: 'assets/shared/images/600-400.jpg'
        };
    }
    getAll() : Observable<any[]> {
        const url = `${this.restApiEndpoint}/artist`;
        console.log(url);
        
        return this.http.get<any[]>(url)
            .pipe(
                catchError(this.responseUtil.handleResponseError)
            );
    }

    create(title: string, description: string, uploadFile: File) : Observable<any> {
        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('uploadFile', uploadFile, uploadFile.name);
        // return this.http.post(this.restApiEndpoint, { title, description })
        return this.http.post(this.restApiEndpoint, formData)
            .pipe(
                catchError(this.responseUtil.handleResponseError)
            );
    }
}