import { NgModule }         from "@angular/core";
import { BrowserModule }    from "@angular/platform-browser";
import { FormsModule }      from "@angular/forms";
import { LoginModule }      from './login/login.module';
import { AppComponent }     from './app.component';

import { routing, appRoutingProvides } from "./app.routing";
import {HomeModule} from "./home/home.module";

@NgModule({
    imports: [BrowserModule, HomeModule, LoginModule, FormsModule, routing],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [appRoutingProvides]
})
export class AppModule {

}