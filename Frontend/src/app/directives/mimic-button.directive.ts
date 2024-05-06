import { DOCUMENT } from '@angular/common';
import {Directive, ElementRef, Inject, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[mButton]'
})
export class MimicButton implements OnInit {

    @Input()
    icon?: string;

    @Input()
    buttonType: 'normal' | 'icon' = 'normal';

    @Input()
    iconPos: 'left' | 'right' = 'right';

    @Input()
    color: 'primary' | 'accent' = 'primary';

    @Input()
    text: string | null = null;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
    ) {
    }

    ngOnInit () {
        if (this.buttonType == 'icon') {
            this.el.nativeElement.classList.add('mimic-icon-button');
        } else {
            this.el.nativeElement.classList.add('mimic-button');
        }

        this.el.nativeElement.classList.add(this.color);

        if (this.text != null) {
            const textElement = this.renderer.createText(this.text);
            this.renderer.appendChild(this.el.nativeElement, textElement);
        }

        if (this.icon != null && this.icon !== '') {
            const iconElement = this.document.createElement('i');

            iconElement.classList.add('fa-solid');
            iconElement.classList.add(this.icon);

            if (this.buttonType == 'icon') {
                // this._clearChildren();

                this.renderer.appendChild(this.el.nativeElement, iconElement);
                return;
            }

            if (this.iconPos == "right") {
                this.renderer.appendChild(this.el.nativeElement, iconElement);
            } else {
                this.renderer.insertBefore(this.el.nativeElement, iconElement, this.el.nativeElement.firstChild);
            }
        }
    }

    private _clearChildren () {
        const childElements = this.el.nativeElement.children;
        for (let child of childElements) {
            this.renderer.removeChild(this.el.nativeElement, child);
        }
    }

}
