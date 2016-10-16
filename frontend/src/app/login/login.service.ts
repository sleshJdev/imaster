import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {User} from '../user/models/user.model';

@Injectable()
export class LoginService {
    private static url = 'api/login';
    private user?: User;

    constructor(private http: Http) {
    }

    logIn(user: User) {
        let body = JSON.stringify(user);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        console.log('user log in: ', JSON.stringify(user));
        return this.http.post(LoginService.url, body, options).toPromise()
            .then((data) => this.user = <User>data.json());
    }

    logOut() {
        this.user = null;
    }

    isLogIn() {
        return this.user !== null;
    }

    getCurrentUser() {
        if (this.user) return this.user;
        throw new Error("User is not log in");
    }
}