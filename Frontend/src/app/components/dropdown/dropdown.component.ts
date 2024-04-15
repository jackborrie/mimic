import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';

export interface DropdownItem {
    value: any,
    text: string
}

@Component({
    selector: 'm-dropdown[items]',
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: DropdownComponent
        }
    ]
})
export class DropdownComponent {

    @Input()
    items!: DropdownItem[];

    @Input()
    set selectedItem (item: DropdownItem) {
        this.selectedItemChange.emit(item);
        this._selectedItem = item;
    }

    get selectedItem(): DropdownItem | null {
        return this._selectedItem;
    }

    @Output()
    selectedItemChange: EventEmitter<DropdownItem> = new EventEmitter<DropdownItem>();

    protected down: boolean = false;

    protected toggleDropdown () {
        this.down = !this.down;
    }

    private _selectedItem: DropdownItem | null = null;
}
