import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {User} from "./models/user.model";
import {Observable} from 'rxjs/Observable'

@Injectable()
export class UserService {
    private url = '/users';

    constructor(private http: Http) {
    }

    save(user: User) {
        return this.http.post(this.url, JSON.stringify(user), new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'})
        })).toPromise();
    }

}