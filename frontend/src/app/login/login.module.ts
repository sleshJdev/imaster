import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from "@angular/http";

import { LoginComponent } from './login.component';
import {LoginService} from "./login.service";

@NgModule({
    imports: [FormsModule, HttpModule, JsonpModule],
    declarations: [LoginComponent],
    providers: [LoginService]
})
export class LoginModule {

}