import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpService {

    private options = new RequestOptions({
        headers: new Headers({'Content-Type': 'application/json'})
    });

    constructor(protected http: Http) {
    }

    get(url: string) {
        return this.http.get(url, this.options);
    }

}