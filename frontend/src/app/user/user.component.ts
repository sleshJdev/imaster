import {Component} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./models/user.model";
import {Response} from "@angular/http";

@Component({
    selector: 'i-user',
    templateUrl: './user.html'
})
export class UserComponent {

    constructor(private userService: UserService) {
    }

    save(user: User) {
        this.userService.save(user)
            .then(UserComponent.goToHomePage)
            .catch(UserComponent.showError);
    }

    private static goToHomePage(response: Response) {

    }

    private static showError(reason: any) {

    }

}