import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'user', component: UserComponent},
    {path: '**', component: LoginComponent},
    {path: '', component: LoginComponent}
];

export const appRoutingProvides: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
