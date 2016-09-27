import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { routing, appRoutingProvides } from "./app.routing";
import {HomeComponent} from "./home/home.component";

@NgModule({
    imports: [BrowserModule, LoginModule, FormsModule, routing],
    declarations: [AppComponent, HomeComponent],
    bootstrap: [AppComponent],
    providers: [appRoutingProvides]
})
export class AppModule {

}