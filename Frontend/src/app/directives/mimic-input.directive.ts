import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[mInput]'
})
export class MimicInput implements OnInit{

    constructor(
        private _el: ElementRef,
        private _renderer: Renderer2
    ) {
    }

    public ngOnInit() {
        this._renderer.addClass(this._el.nativeElement, 'mimic-input');
    }
}
