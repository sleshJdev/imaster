import {Router, Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {HomeComponent} from '../home/home.component';
import {NgModule} from "@angular/core";
import {UsersComponent} from "../user/users.component";
import {UserEditComponent} from "../user/user-edit.component";

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {
        path: 'users',
        component: UsersComponent
    }, {
        path: 'users/:id',
        component: UserEditComponent
    },
    {path: '', component: HomeComponent}
];

const config = {
    enableTracing: true
};


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, config)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}