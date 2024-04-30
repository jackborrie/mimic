import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Subscription, debounceTime, fromEvent}                                                                    from 'rxjs';
import {AppStateService, ThemeInterface}                                                 from './services/app-state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('content')
    private _content!: ElementRef;
    @ViewChild('contentWrapper')
    private _contentWrapper!: ElementRef;

    protected resizing: boolean = false;

    theme: ThemeInterface | null = null;

    private _subscription: Subscription = new Subscription();
    private _existingTimer: any;

    @ViewChild('dialog')
    dialog!: ElementRef;

    public constructor(
        private _state: AppStateService,
        private _renderer: Renderer2
    ) {
    }

    ngOnInit(): void {
        const themeChangeSubscription = this._state.$onThemeChanged
            .subscribe(theme => {
                this.theme = theme;
                if (this._contentWrapper != null) {
                    this._renderer.setStyle(this._contentWrapper.nativeElement, "height", 0 + 'px');
                    this._renderer.setStyle(this._contentWrapper.nativeElement, "width", 0 + 'px');

                    this.calculateContentSize();
                }
            })

        this._subscription.add(themeChangeSubscription);
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    ngAfterViewInit (): void {
        this.calculateContentSize();

        let sub = fromEvent(window, 'resize')
            .subscribe(() => {
                this.resizing = true;

                this._renderer.setStyle(this._contentWrapper.nativeElement, "height", 0 + 'px');
                this._renderer.setStyle(this._contentWrapper.nativeElement, "width", 0 + 'px');

                if (this._existingTimer) {
                    clearInterval(this._existingTimer);
                }

                this._existingTimer = setInterval(() => {
                    this.calculateContentSize();
                    clearInterval(this._existingTimer);
                }, 200)
            });

        this._subscription.add(sub);
    }

    private calculateContentSize () {
        let height = this._content.nativeElement.offsetHeight;
        let width = this._content.nativeElement.offsetWidth;

        this._renderer.setStyle(this._contentWrapper.nativeElement, "height", height + 'px');
        this._renderer.setStyle(this._contentWrapper.nativeElement, "width", width + 'px');
        this.resizing = false;
    }
}
