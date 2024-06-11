import {Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output, HostListener} from '@angular/core';
import {fromEvent, Observable, Subscription}                                                            from "rxjs";
import * as $ from 'jquery';

@Component({
  selector: 'm-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements OnInit, OnDestroy {

    @ViewChild('dropdown')
    dropdown!: ElementRef;

    @Input()
    public text: string | null = null;

    @Input()
    public icon: string | null = null;

    @Input()
    public iconPos: 'left' | 'right' = 'right';

    @Input()
    public buttonType: 'normal' | 'icon' | null = null;

    @Input()
    public position: 'down-left' | 'right-up' | 'right-down' = 'down-left';

    @Input()
    public classes: string | null = null;

    @Output()
    public closed: EventEmitter<null> = new EventEmitter<null>()

    protected showDropdown: boolean = false;

    private _subscription: Subscription = new Subscription();

    ngOnInit() {
    }

    @HostListener('window:click', ['$event.target'])
    public onClick(target: EventTarget) {
        if (this.dropdown.nativeElement.contains(target)) {
            return;
        }

        this.showDropdown = false;
        this.closed.emit();
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    toggle (event: MouseEvent) {
        event.preventDefault();
        this.showDropdown = !this.showDropdown;
    }
}
