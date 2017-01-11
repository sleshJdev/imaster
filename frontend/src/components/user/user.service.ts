import {Injectable} from "@angular/core";
import {HttpService} from '../common/http.service';

@Injectable()
export class UserService extends HttpService {

    getAll() {
        return this.get('/api/users');
    }

    getById(id: number) {
        return this.get(`/api/users/${id}`);
    }
}