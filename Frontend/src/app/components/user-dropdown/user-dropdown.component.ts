import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService}                  from '../../services/auth.service';
import $                                 from 'jquery';
import {AppStateService, ThemeInterface} from '../../services/app-state.service';
import {Subscription} from 'rxjs';

@Component({
               selector   : 'app-user-dropdown',
               templateUrl: './user-dropdown.component.html',
               styleUrl   : './user-dropdown.component.scss'
           })
export class UserDropdownComponent implements OnInit, OnDestroy {

    showDropdown: boolean = false;
    showThemeDropdown: boolean = false;
    themes: ThemeInterface[] = [];

    currentTheme!: ThemeInterface;

    private _windowClickListener: any;
    private _subscriptions: Subscription = new Subscription();

    public constructor (
        private _authService: AuthService,
        private _stateService: AppStateService
    ) {
    }

    ngOnInit (): void {
        this._windowClickListener = $('body').on('click', (event) => {
            if (!this.showDropdown) {
                return;
            }

            if ($(event.target).parents('.user-dropdown').length <= 0) {
                this.showDropdown = false;
                this.showThemeDropdown = false;
            }
        });

        let themeSub = this._stateService.$onThemeChanged
            .subscribe(theme => {
                this.currentTheme = theme;
            })

        this._subscriptions.add(themeSub);
        this.themes = this._stateService.getThemes();
    }

    ngOnDestroy (): void {
        $(window).off(this._windowClickListener);
        this._subscriptions.unsubscribe();
    }

    protected toggleDropdown () {
        this.showDropdown = !this.showDropdown;

        if (!this.showDropdown) {
            this.showThemeDropdown = false;
        }
    }

    protected logout () {
        this._authService.logout().subscribe();
    }

    protected setTheme (theme: ThemeInterface) {
        this._stateService.setTheme(theme.class);
    }
}
