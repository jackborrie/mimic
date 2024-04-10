import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Observable} from 'rxjs';
import {Role}       from '../models/role';
import {HttpHeaders} from '@angular/common/http';
import {FilteredData} from '../models/filtered-data';

@Injectable({
                providedIn: 'root'
            })
export class RoleService {

    constructor (
        private _request: RequestService
    ) {
    }

    public getAllRoles (searchTerm: string, sortDirection: string, page: number, pageSize: number): Observable<FilteredData<Role>> {
        let headers = new HttpHeaders();
        headers = headers.set('search_term', searchTerm);
        headers = headers.set('sort_dir', sortDirection);
        headers = headers.set('page_size', pageSize.toString());
        headers = headers.set('page', page.toString());

        return this._request.getAll('auth/roles', headers);
    }
}
