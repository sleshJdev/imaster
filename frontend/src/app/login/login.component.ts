import {Component, Input} from "@angular/core";
import {Router} from '@angular/router'
import {User}      from '../user/models/user.model';
import {LoginService} from "./login.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'login-form',
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})
export class LoginComponent {
    private user = new User(null, '', '');

    constructor(private loginService: LoginService, private router: Router) {
    }

    logIn(user: User) {
        let self = this;
        this.loginService.logIn(user)
            .then(() => self.router.navigate(['home']))
            .catch((error: any) => {
                let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                console.error(errMsg);
                return Observable.throw(errMsg);
            });
    };
}
