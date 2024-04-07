import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService}                                 from './services/auth.service';
import {Subscription}                    from 'rxjs';
import {AppStateService, ThemeInterface} from './services/app-state.service';

@Component({
               selector   : 'app-root',
               templateUrl: './app.component.html',
               styleUrl   : './app.component.scss'
           })
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
    loggedIn = false;

    theme: ThemeInterface | null = null;

    protected isExpanded = false;

    private _subscription: Subscription = new Subscription();

    public constructor (
        private _authService: AuthService,
        private _state: AppStateService) {
    }

    ngOnInit (): void {
        this.loggedIn = this._authService.isLoggedIn();

        const loggedInSubscription = this._authService.$onLoggedInChanged.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
            this._authService.getStatus();
        });
        this._subscription.add(loggedInSubscription);
        this._authService.getStatus();

        const sidebarToggleSub = this._state.$isSidebarExpandedChanged
                                   .subscribe(isExpanded => {
                                       this.isExpanded = isExpanded;
                                   });
        this._subscription.add(sidebarToggleSub);

        const themeChangeSubscription = this._state.$onThemeChanged
            .subscribe(theme => {
                this.theme = theme;
            })

        this._subscription.add(themeChangeSubscription);
    }

    ngOnDestroy (): void {
        this._subscription.unsubscribe();
    }

    ngAfterViewInit (): void {
        if (this._authService.isLoggedIn() && this._authService.hasLoginExpired()) {
            if (this._authService.hasRefreshToken()) {
                this._authService.attemptRefresh();
            } else {
                this._authService.logout();
            }
            return;
        }
    }

}
