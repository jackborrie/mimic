import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {fromEvent, Subscription}                  from "rxjs";

@Directive({
    selector: '[mDialog]'
})
export class MimicDialog implements OnInit {

    private _subscriptions: Subscription = new Subscription();

    constructor(
        private _el: ElementRef,
        private _renderer: Renderer2
    ) {
    }


    public ngOnInit() {
        this._renderer.addClass(this._el.nativeElement, 'dialog');


        const windowClick = fromEvent(window, 'click')
            .subscribe((event) => {
                const e = event as PointerEvent;
                const target = e.target as HTMLElement;

                if (target == null) {
                    return;
                }

                if (!target.classList.contains('dialog')) {
                    return;
                }

                this.hide();
            })

        this._subscriptions.add(windowClick);
    }

    public isSameDialog (elementRef: ElementRef) {
        return this._el.nativeElement == elementRef.nativeElement;
    }

    public show () {
        this._renderer.addClass(this._el.nativeElement, 'show');
        console.log('test')
    }

    public hide() {
        this._renderer.removeClass(this._el.nativeElement, 'show');
    }
}
