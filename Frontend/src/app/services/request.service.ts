import {Injectable}              from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService}     from './auth.service';
import {map, Observable} from 'rxjs';

@Injectable({
                providedIn: 'root'
            })
export class RequestService {

    private _baseUrl: string = 'http://localhost:5153'

    constructor (private _authService: AuthService,
                 private _httpClient: HttpClient) {
    }

    public get (route: string, headers?: HttpHeaders): Observable<any> {
        if (headers == null) {
            headers = new HttpHeaders();
        }

        headers = this._authService.addBearer(headers);

        return this._httpClient.get(this._baseUrl + '/' + route, {headers: headers});
    }

    public getAll(route: string, headers?: HttpHeaders): Observable<any> {
        if (headers == null) {
            headers = new HttpHeaders();
        }

        headers = this._authService.addBearer(headers);

        return this._httpClient.get(this._baseUrl + '/' + route, {headers: headers});
    }

    public post (route: string, body: {[key: string]: any} | null, headers?: HttpHeaders) {
        if (headers == null) {
            headers = new HttpHeaders();
        }

        headers = this._authService.addBearer(headers);

        return this._httpClient.post(this._baseUrl + '/' + route, body, {headers: headers});
    }

    public put (route: string, body: {[key: string]: any} | null, headers?: HttpHeaders) {
        return this._httpClient.put(this._baseUrl + '/' + route, body, {headers: headers});
    }

    public delete (route: string, headers?: HttpHeaders) {
        if (headers == null) {
            headers = new HttpHeaders();
        }

        headers = this._authService.addBearer(headers);

        return this._httpClient.delete(this._baseUrl + '/' + route, {headers: headers});
    }
}
