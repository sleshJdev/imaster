import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {User} from '../user/models/user.model';

@Injectable()
export class LoginService {
    private static url = 'api/login';

    constructor(private http: Http) {
    }

    logIn(user: User) {
        let body = JSON.stringify(user);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        console.log('user log in: ', JSON.stringify(user));
        return this.http.post(LoginService.url, body, options).toPromise();
    }
}