import {Directive} from '@angular/core';
import { AfterViewInit, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[swiper]'
})
export class SwiperDirective implements AfterViewInit {


    constructor(
    ) {
    }

    public ngAfterViewInit () {
    }
}
