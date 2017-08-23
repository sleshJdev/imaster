import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from "./user.service";
import {Location} from '@angular/common';
import {noop} from "rxjs/util/noop";
import {RoleService} from "../common/role.service";
import {isUndefined} from "util";

@Component({
    selector: 'user-edit',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.less']
})
export class UserEditComponent implements OnInit {
    private formTitle = 'Edit User';
    private user: any = {};
    private roles: any[] = [];

    constructor(private userService: UserService,
                private roleService: RoleService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) =>
                this.userService
                    .getById(+params['id'])
                    .subscribe(response => {
                        this.user = response.json();
                        this.roleService.getAll().subscribe(response => {
                            this.roles = response.json();
                            this.roles.forEach((role: any) => {
                                let userRole = this.user.roles.find((userRole: any) => userRole.id === role.id);
                                role.checked = !isUndefined(userRole);
                            });
                        }, noop, noop);
                    }, noop, noop));
    }
}
