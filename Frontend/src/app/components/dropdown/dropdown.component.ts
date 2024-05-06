import {Component, Input, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {fromEvent, Observable, Subscription}                        from "rxjs";

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
    public buttonType: 'normal' | 'icon' = 'normal';

    @Input()
    public classes: string | null = null;

    protected showDropdown: boolean = false;

    private _subscription: Subscription = new Subscription();

    ngOnInit() {
        let windowClickEvent = fromEvent(window, 'click')
            .subscribe ((data) => {
                if (!this.dropdown.nativeElement.contains(data.target)) {
                    this.showDropdown = false;
                }
            })

        this._subscription.add(windowClickEvent);
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    toggle (event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.showDropdown = !this.showDropdown;
        console.log(this.showDropdown)
    }
}
