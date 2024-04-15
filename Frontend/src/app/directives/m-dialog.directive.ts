import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
               selector: '[mDialog]'
           })
export class MimicDialog {

    constructor (public template: TemplateRef<any>) {
    }

}
