import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor}                                          from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

    @ViewChild('input')
    private input!: ElementRef;

    @Input()
    label?: string;

    @Input()
    type: string = 'text';

    @Input()
    errorText: string = '';

    @Input()
    infoText: string = '';

    @Input()
    errored: boolean = false;

    /**
     * Holds the current value of the slider
     */
    @Input() value: string = "";

    /**
     * Invoked when the model has been changed
     */
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    focused = false;

    protected handleFocusIn () {
        this.focused = true;
    }

    protected handleFocusOut () {
        if (this.value != null && this.value !== '') {
            this.focused = true;
            return;
        }

        this.focused = false;
    }

    protected handleLabelClick () {
        console.log('test')
        this.input.nativeElement.focus();
    }
}
