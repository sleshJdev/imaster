import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {LoginComponent} from "./login/login.component.ts";
import {HomeComponent} from "./home/home.component.ts";

const appRoutes:Routes = [
    {path: 'login', component: LoginComponent},
    {path: '**', component: HomeComponent},
    {path: '', component: HomeComponent}
];

export const appRoutingProvides:any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
