import { environment } from "../../environments/environment";

export class LogService {
    isProd: boolean = false;

    constructor() {
        this.isProd = environment.production;
    }
    
    public log(message: any) {
        if (!this.isProd) {
            console.log(message);
        }

        // else log somewhere else
    }
}