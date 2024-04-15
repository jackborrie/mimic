import {Injectable}      from '@angular/core';
import {map, Observable} from 'rxjs';
import {FilteredData}    from '../models/filtered-data';
import {HttpHeaders}    from '@angular/common/http';
import {RequestService} from './request.service';
import {User}           from '../models/user';

@Injectable({
                providedIn: 'root'
            })
export class UserService {

    constructor (
        private _request: RequestService
    ) {
    }

    public getAllUsers (searchTerm: string, sortDirection: string, page: number, pageSize: number): Observable<FilteredData<User>> {
        let headers = new HttpHeaders();
        headers     = headers.set('search_term', searchTerm);
        headers     = headers.set('sort_dir', sortDirection);
        headers     = headers.set('page_size', pageSize.toString());
        headers     = headers.set('page', page.toString());

        return this._request.getAll<User>('api/user', headers).pipe(
            map((users) => {
                for (let user of users.data) {
                    user['username'] = user['userName'];
                    delete user['userName'];
                }

                return users;
            })
        );
    }
}
