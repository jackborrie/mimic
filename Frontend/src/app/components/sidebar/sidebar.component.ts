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

    private currentThemeIndex: number = 0;
    private themes: ThemeInterface[] = [];

    public constructor (
        private _state: AppStateService
    ) {
    }

    handleThemeClick () {
        this.currentThemeIndex++;
        if (this.currentThemeIndex >= this.themes.length) {
            this.currentThemeIndex = 0;
        }

        this._state.setTheme(this.themes[this.currentThemeIndex].class);
    }

    ngOnInit (): void {
        this.themes = this._state.getThemes();

        let themeSub = this._state.$onThemeChanged
            .subscribe((theme) => {
                this.currentThemeIndex = this.themes.findIndex(t => t == theme);
            });

        this._subscription.add(themeSub);
    }

    ngOnDestroy (): void {
        this._subscription.unsubscribe();
    }
}
