import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription}                                                       from 'rxjs';
import {AppStateService, ThemeInterface}                                    from './services/app-state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

    theme: ThemeInterface | null = null;

    private _subscription: Subscription = new Subscription();

    @ViewChild('dialog')
    dialog!: ElementRef;

    public constructor(
        private _state: AppStateService
    ) {
    }

    ngOnInit(): void {
        const themeChangeSubscription = this._state.$onThemeChanged
            .subscribe(theme => {
                this.theme = theme;
            })

        this._subscription.add(themeChangeSubscription);
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    ngAfterViewInit(): void {
    }
}
