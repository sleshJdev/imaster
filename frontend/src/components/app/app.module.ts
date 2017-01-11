import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {CommonModule, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "../login/login.component";
import {HomeComponent} from "../home/home.component";
import {LoginService} from "../login/login.service";
import {UsersComponent} from "../user/users.component";
import {UserService} from "../user/user.service";
import {UserEditComponent} from "../user/user-edit.component";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, CommonModule, AppRoutingModule],
    declarations: [AppComponent, LoginComponent, HomeComponent, UsersComponent, UserEditComponent],
    providers: [LoginService, UserService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
