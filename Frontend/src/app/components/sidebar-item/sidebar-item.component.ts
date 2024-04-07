import {Component, Input, OnInit} from '@angular/core';

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
               selector   : 'app-sidebar-item[type][text]',
               templateUrl: './sidebar-item.component.html',
               styleUrl   : './sidebar-item.component.scss'
           })
export class SidebarItemComponent implements OnInit {

    protected display: boolean = true;

    @Input()
    isExpanded: boolean = false;

    @Input()
    text!: string;
    @Input()
    type!: Type;
    @Input()
    route?: string;
    @Input()
    icon?: string;
    @Input()
    callback?: () => void;

    protected handleButtonClick () {
        if (this.callback != null) {
            this.callback();
        }
    }

    ngOnInit (): void {
        if (this.text == null || this.text === '') {
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
                if (this.callback == null ||
                    this.icon == null || this.icon == '') {
                    this.display = false;
                }
                break;
        }
    }
}
