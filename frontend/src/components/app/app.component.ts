import {Component} from '@angular/core';
import {LoginService} from "../login/login.service";

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styles: [String(require('./app.component.less'))]
})
export class AppComponent {
    constructor(private loginService: LoginService) {
    }

    isLoggedIn() {
        return this.loginService.isLoggedIn();
    }

    logout() {
        this.loginService.logout();
    }

    getUserDetails() {
        return this.isLoggedIn() ?
            this.loginService.getUserDetails() :
            {id: '', name: ''};
    }
}