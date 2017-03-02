import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {noop} from "rxjs/util/noop";
import {isNullOrUndefined} from "util";

@Injectable()
export class LoginService {
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
        let headers = new Headers({'Content-Type': 'application/json'});
        let promise = this.http.post('/api/login', body, headers).map(response => response.json()).toPromise();
        promise.then(userDetails => this.userDetails = userDetails);
        return promise;
    }

    logout() {
        this.userDetails = null;
    }
}