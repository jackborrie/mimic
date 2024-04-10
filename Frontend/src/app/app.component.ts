import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService}                                                                     from './services/auth.service';
import {Subscription}                    from 'rxjs';
import {AppStateService, ThemeInterface} from './services/app-state.service';
import ClickEvent = JQuery.ClickEvent;
import {DialogService}                                                      from './services/dialog.service';
import {
    MimicTemplate
}                                                                           from './directives/mimic-template.directive';
import {MimicDialog}                                                        from './directives/m-dialog.directive';

@Component({
               selector   : 'app-root',
               templateUrl: './app.component.html',
               styleUrl   : './app.component.scss'
           })
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
    loggedIn = false;

    theme: ThemeInterface | null = null;

    protected isExpanded = false;

    protected dialogOpen = false;

    private _subscription: Subscription = new Subscription();

    private mimicDialog: MimicDialog | null = null;

    @ViewChild('dialog')
    dialog!: ElementRef;

    public constructor (
        private _authService: AuthService,
        private _state: AppStateService,
        private _dialog: DialogService
    ) {
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

        let dialogSub = this._dialog.$onDialogChange
                            .subscribe((dialog) => {
                                this.mimicDialog = dialog;
                                this.dialogOpen = dialog != null;
                            })

        this._subscription.add(dialogSub);
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

    handleDialogBackgroundClick (event: MouseEvent) {
        if (!this.dialog.nativeElement.contains(event.target)) {
            this._dialog.closeDialog();
        }
    }

    getDialog (): TemplateRef<any> | null {
        if (this.mimicDialog == null) {
            return null;
        }

        return this.mimicDialog.template;
    }

}
