import {Directive, ElementRef, Inject, Renderer2} from '@angular/core';
import {MimicButton}                              from "./mimic-button.directive";
import {DOCUMENT}                                 from "@angular/common";

@Directive({
  selector: '[mDropdownButton]'
})
export class MimicDropdownButtonDirective extends MimicButton {

  constructor(
      protected _el: ElementRef,
      protected _renderer: Renderer2,
      @Inject(DOCUMENT) protected override document: Document
  ) {
      super(_el, _renderer, document);

      this.buttonClass = 'mimic-dropdown-button';
      this.iconButtonClass = 'mimic-dropdown-icon-button';
  }

}
