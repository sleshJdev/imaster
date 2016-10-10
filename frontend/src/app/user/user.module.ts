import {NgModule} from '@angular/core'
import {UserComponent} from "./user.component";
import {UserService} from "./user.service";
import {User} from "./models/user.model";

@NgModule({
    declarations: [UserComponent],
    providers: [UserService]
})
export class UserModule {

}