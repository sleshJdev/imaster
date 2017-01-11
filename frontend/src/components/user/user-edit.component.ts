import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from "./user.service";
import {Location} from '@angular/common';
import {noop} from "rxjs/util/noop";

@Component({
    selector: 'user-edit',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.less']
})
export class UserEditComponent implements OnInit {
    private formTitle = 'Edit User';
    private user: any = {};

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) =>
            this.userService
                .getById(+params['id'])
                .subscribe(response => this.user = response.json(), noop, noop)
        );
    }
}
