import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription}                    from 'rxjs';
import {AppStateService, ThemeInterface} from "../../services/app-state.service";

@Component({
               selector   : 'app-sidebar',
               templateUrl: './sidebar.component.html',
               styleUrl   : './sidebar.component.scss'
           })
export class SidebarComponent implements OnInit, OnDestroy {

    private _subscription: Subscription = new Subscription();

    protected themes: ThemeInterface[] = [];

    protected currentTheme!: ThemeInterface;

    public constructor (
        private _state: AppStateService
    ) {
    }

    changeTheme (theme: string) {
        this._state.setTheme(theme);
    }

    ngOnInit (): void {
        this.themes = this._state.getThemes();

        let themeSub = this._state.$onThemeChanged
            .subscribe((theme) => {
                this.currentTheme = theme;
            });

        this._subscription.add(themeSub);
    }

    getColor (theme: ThemeInterface): 'primary' | 'accent' | 'warn' {
        console.log(theme.class, this.currentTheme.class, theme.class == this.currentTheme.class)
        console.log(this.currentTheme.class == theme.class ? 'accent' : 'primary')
        // return this.currentTheme.class == theme.class ? 'accent' : 'primary';
        return 'primary';
    }

    ngOnDestroy (): void {
        this._subscription.unsubscribe();
    }
}
