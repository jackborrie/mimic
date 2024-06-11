import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {debounceTime, fromEvent, Subscription}                                                       from 'rxjs';
import {AppStateService, ThemeInterface}                                                  from './services/app-state.service';
import {Toast, ToastService}                                                              from "./services/toast.service";
import {MimicDialog}                                                                      from "./directives/mimic-dialog.directive";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChildren(MimicDialog) dialogs!: QueryList<MimicDialog>;

    theme: ThemeInterface | null = null;
    protected toasts: Toast[] = [];

    protected isMobile: boolean = false;


    private _subscription: Subscription = new Subscription();

    @ViewChild('dialog')
    dialog!: ElementRef;

    public constructor(
        private _state: AppStateService,
        private _toast: ToastService
    ) {
    }

    ngOnInit(): void {
        const isMobileSubscription = this._state.$onIsMobileChanged
            .subscribe(isMobile => {
                this.isMobile = isMobile;
            });

        this._subscription.add(isMobileSubscription);
        this._state.checkIfMobile();

        const themeChangeSubscription = this._state.$onThemeChanged
            .subscribe(theme => {
                this.theme = theme;
            })

        this._subscription.add(themeChangeSubscription);

        const toastSubscription = this._toast.$toastChanged
            .subscribe(toasts => {
                this.toasts = toasts;
            })

        this._subscription.add(toastSubscription);

        const windowResizeSubscription = fromEvent(window, 'resize')
            .pipe(
                debounceTime(500)
            )
            .subscribe(() => {
                this._state.checkIfMobile();
            })

        this._subscription.add(windowResizeSubscription);

    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    ngAfterViewInit(): void {
    }

    protected clearToast(toast: Toast) {
        this._toast.hideToast(toast);
    }
}
