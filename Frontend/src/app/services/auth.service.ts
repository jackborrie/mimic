import {Injectable}                                           from '@angular/core';
import {map, Observable, Observer, of, Subject, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders}                              from '@angular/common/http';
import {DateTime}                                             from 'luxon';
import {Router} from '@angular/router';
import {Status} from '../models/status';

export interface LoginInterface {
    email: string,
    password: string
}

export interface LoginTokenInterface {
    accessToken: string,
    refreshToken: string,
    expiresIn: number
}

@Injectable({
                providedIn: 'root'
            })
export class AuthService {

    private _accessToken: string | null  = null;
    private _refreshToken: string | null = null;
    private _expiresIn: number | null    = null;
    private _expireDate: DateTime | null        = null;
    private _status: Status | null              = null;

    public refreshing: boolean = false;

    public $onRefreshResult: Subject<boolean>   = new Subject<boolean>();
    public $onLoggedInChanged: Subject<boolean> = new Subject<boolean>();
    public $onStatusChanged: Subject<Status>    = new Subject<Status>();

    constructor (private _http: HttpClient,
                 private _router: Router) {
    }

    public isLoggedIn (): boolean {
        if (this._accessToken !== null && this._accessToken !== '') {
            return true;
        }

        // Load from local storage
        // TODO potentially encrypt this?
        this._accessToken  = localStorage.getItem('accessToken');
        this._refreshToken = localStorage.getItem('refreshToken');

        let expireDateString = localStorage.getItem('expireDate');

        if (expireDateString == null) {
            return false;
        }

        this._expireDate = DateTime.fromISO(expireDateString);

        return this.isLoggedIn();
    }

    public hasLoginExpired (): boolean {
        return this.isLoggedIn() && this._expireDate! < DateTime.now();
    }

    public hasRefreshToken (): boolean {
        return this._refreshToken != null && this._refreshToken !== '';
    }

    public attemptRefresh () {
        localStorage.setItem('previousUrl', this._router.url);
        this.refreshing = true;

        return this._http.post<LoginTokenInterface>('http://localhost:5153/refresh', {refreshToken: this._refreshToken})
                   .subscribe(
                       {
                           next :
                               success => {
                                   localStorage.removeItem('previousUrl')
                                   this._handleLoginResponse(success);
                                   this.$onRefreshResult.next(true);
                                   this.refreshing = false;
                               },
                           error: () => {
                               localStorage.removeItem('previousUrl');
                               this.$onRefreshResult.next(false);
                               this.refreshing = false;
                           }
                       }
                   );
    }

    public addBearer (headers: HttpHeaders): HttpHeaders {
        headers = headers.append('Authorization', `Bearer ${this._accessToken!}`);

        return headers;
    }

    public login (details: LoginInterface) {
        if (this.isLoggedIn()) {
            return of(true);
        }

        return this._http.post<LoginTokenInterface>('http://localhost:5153/login', details)
                   .pipe(map((data: LoginTokenInterface) => {
                             this._handleLoginResponse(data);
                             this.$onLoggedInChanged.next(true);
                             return true;
                         })
                   );
    }

    public register (details: LoginInterface): Observable<any> {
        return this._http.post('http://localhost:5153/register', details);
    }

    public logout () {
        let headers = this.addBearer(new HttpHeaders());

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expireDate');
        localStorage.removeItem('wasAdmin');

        this._accessToken  = null;
        this._refreshToken = null;
        this._expiresIn    = null;
        this._expireDate   = null;

        return this._http.post('http://localhost:5153/logout', null, {headers: headers}).pipe(map(() => {
            this.$onLoggedInChanged.next(false);

            this._router.navigate(['auth'])
        }));
    }

    public wasAdmin (): boolean {
        if (this._status !== null) {
            return false;
        }

        let wasAdminString = localStorage.getItem('wasAdmin');

        if (wasAdminString == null || wasAdminString == '') {
            return false;
        }

        return wasAdminString == 'true';
    }

    public hasStatus (): boolean {
        return this._status != null;
    }

    private _handleLoginResponse (response: LoginTokenInterface) {
        this._accessToken  = response.accessToken;
        this._expiresIn    = response.expiresIn;
        this._refreshToken = response.refreshToken;

        this._expireDate = DateTime.now().plus({second: this._expiresIn});

        localStorage.setItem('accessToken', this._accessToken);
        localStorage.setItem('refreshToken', this._refreshToken);
        localStorage.setItem('expireDate', this._expireDate.toISO()!);
    }

    public getStatus () {
        if (!this.isLoggedIn()) {
            return;
        }
        let headers = this.addBearer(new HttpHeaders());
        this._http.get<Status>('http://localhost:5153/status', {headers: headers}).subscribe((status: Status) => {
            this._status = status

            this.$onStatusChanged.next(status);

            if (this.hasRead('admin')) {
                localStorage.setItem('wasAdmin', 'true');
            } else {
                localStorage.removeItem('wasAdmin');
            }
        });
    }

    public hasWrite (role: string): boolean {
        if (this._status == null || this._status.user == null || this._status.user.roles == null) {
            return false;
        }

        return this._status.user.roles.find(r => r === role + ':write') != null;
    }

    public hasRead (role: string): boolean {
        if (this._status == null || this._status.user == null || this._status.user.roles == null) {
            return false;
        }

        return this.hasWrite(role) || this._status.user.roles.find(r => r === role + ':read') != null;
    }

}
