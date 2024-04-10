import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
               selector: '[mDialog]'
           })
export class MimicDialog {

    @Input()
    mDialog: string = '';

    constructor (public template: TemplateRef<any>) {
    }

}
