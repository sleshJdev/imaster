import {Component} from '@angular/core';
import {LoginService} from "./login.service";
import {Location} from '@angular/common';
import {Router} from "@angular/router";

@Component({
    selector: 'login',
    styleUrls: ['login.component.less'],
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    private username: string;
    private password: string;

    constructor(private loginService: LoginService,
                private router: Router,
                private location: Location) {
    }

    private gotoHome() {
        return this.router.navigateByUrl('/');
    }

    login() {
        return this.loginService
            .authenticate(this.username, this.password)
            .then(() => this.gotoHome());
    }
}