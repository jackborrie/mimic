import {Component, OnDestroy, OnInit} from '@angular/core';
import {DropdownItem}                 from "../../../components/dropdown/dropdown.component";
import {AppStateService}              from "../../../services/app-state.service";
import {Subscription}                 from 'rxjs';

@Component({
    selector: 'app-appearance',
    templateUrl: './appearance.component.html',
    styleUrl: './appearance.component.scss'
})
export class AppearanceComponent implements OnInit, OnDestroy {

    protected get currentTheme(): DropdownItem {
        return this._currentTheme;
    }

    protected set currentTheme(item: DropdownItem) {
        this._currentTheme = item;
        this._appState.setTheme(item.value);
    }

    protected themes!: DropdownItem[];

    private _currentTheme!: DropdownItem;
    private _subscriptions: Subscription = new Subscription();

    public constructor(
        private _appState: AppStateService
    ) {
    }

    ngOnInit(): void {
        this.themes = this._appState.getThemes().map(theme => {
            return {
                value: theme.class,
                text: theme.name
            }
        });

        const themeSub = this._appState.$onThemeChanged
            .subscribe((theme) => {
                this._currentTheme = {
                    value: theme.class,
                    text: theme.name
                }
            });

        this._subscriptions.add(themeSub);
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

}
