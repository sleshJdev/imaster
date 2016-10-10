import {NgModule} from '@angular/core';
import {HomeComponent} from "./home.component";
import {UserModule} from "../user/user.module";

@NgModule({
    imports: [UserModule],
    declarations: [HomeComponent]
})
export class HomeModule {

}