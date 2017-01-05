import {Component, OnInit} from "@angular/core";
import {UserService} from "./user.service";
import {noop} from "rxjs/util/noop";

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
    private users: any[];

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.getAll()
            .subscribe(response => this.users = response.json(), noop, noop);
    }

}