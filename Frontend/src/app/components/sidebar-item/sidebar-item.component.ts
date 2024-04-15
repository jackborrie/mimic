import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export type Position = 'top' | 'bottom';
export type Type = 'link' | 'button' | 'header' | 'info';

export interface SidebarItem {
    position?: Position,
    type: Type,
    text: string,
    icon: string,
    tooltop?: string,
    callback?: () => void,
    route?: string
    children?: SidebarItem[]
}

@Component({
               selector   : 'app-sidebar-item[type][label]',
               templateUrl: './sidebar-item.component.html',
               styleUrl   : './sidebar-item.component.scss'
           })
export class SidebarItemComponent implements OnInit {

    protected display: boolean = true;

    @Input()
    label!: string;
    @Input()
    type!: Type;
    @Input()
    route?: string;
    @Input()
    icon?: string;
    @Output()
    buttonClick: EventEmitter<any> = new EventEmitter();

    protected handleButtonClick () {
        this.buttonClick.emit();
    }

    ngOnInit (): void {
        if (this.label == null || this.label === '') {
            this.display = false;
            return;
        }

        switch (this.type) {
            case 'link':
                if (this.route == null ||
                    this.icon == null || this.icon == '') {
                    this.display = false;
                }
                break;
            case 'button':
                if (this.icon == null || this.icon == '') {
                    this.display = false;
                }
                break;
        }
    }
}
