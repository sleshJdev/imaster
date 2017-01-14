import {HttpService} from "./http.service";
import {Injectable} from "@angular/core";

@Injectable()
export class RoleService extends HttpService {
    getAll() {
        return this.get('/api/roles');
    }
}