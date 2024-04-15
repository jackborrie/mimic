import {Injectable}               from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

export interface ThemeInterface {
    name: string,
    class: string
}

@Injectable({
                providedIn: 'root'
            })
export class AppStateService {

    private themes: ThemeInterface[] = [
        {
            name: 'Catppuccin Mocha',
            class: 'catppuccin-mocha'
        },
        {
            name: 'Catppuccin Latte',
            class: 'catppuccin-latte'
        },
        {
            name: 'Solarized Dark',
            class: 'solarized-dark'
        },
        {
            name: 'Solarized Light',
            class: 'solarized-light'
        },
    ]

    private _theme: ThemeInterface = this.themes[0];

    public $onThemeChanged: Subject<ThemeInterface> = new BehaviorSubject(this._theme);

    constructor () {
        let localTheme = localStorage.getItem('theme');

        if (localTheme == null) {
            return;
        }

        let t = JSON.parse(localTheme);

        let theme = this.themes.find(the => t.name === the.name && t.class === the.class);

        if (!theme) {
            localStorage.removeItem('theme');
        } else {
            this._theme = theme;
            this.$onThemeChanged.next(this._theme);
        }
    }

    public setTheme (theme: string) {
        let t = this.themes.find(t => t.class === theme);

        if (t == null) {
            return;
        }

        this._theme = t;
        this.$onThemeChanged.next(this._theme);

        localStorage.setItem('theme', JSON.stringify(this._theme));
    }

    public getThemes (): ThemeInterface[] {
        return this.themes;
    }
}
