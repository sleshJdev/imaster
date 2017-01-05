import {Router, Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from '../login/login.component';
import {HomeComponent} from '../home/home.component';
import {NgModule} from "@angular/core";
import {UsersComponent} from "../user/users.component";

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'users', component: UsersComponent},
    {path: '', component: HomeComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}