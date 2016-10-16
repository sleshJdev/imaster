import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login/login.service';
import {User} from "../user/models/user.model";


@Component({
    selector: 'i-home',
    templateUrl: './home.html'
})
export class HomeComponent {
    private user: User;

    constructor(private loginService: LoginService, private router: Router) {
        this.user = loginService.getCurrentUser();
    }

    logOut() {
        this.loginService.logOut();
        this.router.navigate(['login']);
    }

}