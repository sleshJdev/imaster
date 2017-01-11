import {Component, OnInit} from "@angular/core";
import {UserService} from "./user.service";
import {noop} from "rxjs/util/noop";
import {Router} from "@angular/router";

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
    private users: any[];

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.userService.getAll()
            .subscribe(response => this.users = response.json(), noop, noop);
    }

    edit(user: any) {
        this.router.navigate(['/users', user.id]);
    }

}