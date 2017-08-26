import {Component, OnInit} from "@angular/core";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'users',
    templateUrl: 'users.component.html',
    styles: [String(require('./users.component.less'))]
})
export class UsersComponent implements OnInit {
    private users: any[];
    private text: string;
    private sortFields = {
        field: <any>null,
        fields: {
            id: {field: 'id', asc: true, enabled: true},
            name: {field: 'name', asc: true, enabled: true}
        }
    };

    constructor(private userService: UserService,
                private router: Router) {
        this.sortFields.field = this.sortFields.fields.id;
    }

    ngOnInit(): void {
        this.search();
    }

    edit(user: any) {
        this.router.navigate(['/users', user.id]);
    }

    sort(field: any) {
        Object.keys(this.sortFields.fields)
            .forEach(fieldName => {
                let field = this.sortFields.fields[fieldName];
                field.enabled = false;
            });
        field.asc = !field.asc;
        field.enabled = true;
        this.sortFields.field = field;
        this.search();
    }

    search() {
        this.userService.search({
            sort: this.sortFields.field
        }).subscribe((response: any) => this.users = response.json());
    }
}