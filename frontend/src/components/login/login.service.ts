import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {isNullOrUndefined} from "util";
import {RequestOptions} from "@angular/http";

@Injectable()
export class LoginService {
    private requestOptions = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    private userDetails: any;

    constructor(private http: Http) {
    }

    getUserDetails() {
        return this.userDetails;
    }

    isLoggedIn() {
        return !isNullOrUndefined(this.userDetails);
    }

    authenticate(username: string, password: string) {
        let body = {name: username, password: password};
        let promise = this.http.post('/api/login', body, this.requestOptions)
            .map((response: any) => response.json()).toPromise();
        promise.then((userDetails: any) => this.userDetails = userDetails);
        return promise;
    }

    logout() {
        this.userDetails = null;
    }
}