import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService, LoginInterface}             from '../../services/auth.service';
import {Subscription}                            from 'rxjs';
import {Router}                                  from '@angular/router';

@Component({
               selector   : 'app-auth',
               templateUrl: './auth.component.html',
               styleUrl   : './auth.component.scss'
           })
export class AuthComponent implements OnInit, OnDestroy {

    private _subscriptions: Subscription = new Subscription();

    protected refreshFailed: boolean = false;

    protected refreshing: boolean = false;

    protected doingSomething: boolean = false;

    protected email: string    = 'jb';
    protected password: string = 'mimicTe@r123';

    public constructor (private _authService: AuthService
        , private _router: Router) {
    }

    ngOnInit (): void {

        let onRefreshSubscription = this._authService.$onRefreshResult.subscribe(refreshed => {
            this.refreshing = false;
            if (!refreshed) {
                this.refreshFailed = true;
                return;
            }

            let previousUrl = localStorage.getItem('previousUrl');

            if (previousUrl == null || previousUrl === '') {
                this._router.navigate(['']);
            }

            this._router.navigate([previousUrl]);
        });

        this._subscriptions.add(onRefreshSubscription);

        if (this._authService.isLoggedIn()) {
            this._router.navigate([''])
        }
    }

    ngOnDestroy (): void {
        this._subscriptions.unsubscribe();
    }

    login () {
        let errored = false;
        if (this.email == null || this.email === '') {
            errored = true;
        }

        if (this.password == null || this.password === '') {
            errored = true;
        }

        if (errored) {
            return;
        }

        let details: LoginInterface = {
            email   : this.email,
            password: this.password
        }

        this._authService.login(details)
            .subscribe({
                           next : () => {
                                this._router.navigate(['']);
                           },
                           error: (e) => {
                                console.log(e);
                           }
                       })

    }

}
