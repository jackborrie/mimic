import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';

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
export class SidebarItemComponent implements OnInit, OnDestroy {

    protected display: boolean = false;

    @Input()
    label!: string;
    @Input()
    type!: Type;
    @Input()
    route?: string;
    @Input()
    icon?: string;
    @Input()
    role?: string;

    @Output()
    buttonClick: EventEmitter<any> = new EventEmitter();

    private _subscriptions: Subscription = new Subscription();

    public constructor(
    ) {
    }

    protected handleButtonClick () {
        this.buttonClick.emit();
    }

    ngOnInit (): void {
        if (!this._validSetup()) {
            this.display = false;
            return;
        }

        if (this.role == null || this.role == '') {
            this.display = true;
            return;
        }
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    private _validSetup (): boolean {
        if (this.label == null || this.label === '') {
            return false;
        }

        switch (this.type) {
            case 'link':
                if (this.route == null ||
                    this.icon == null || this.icon == '') {
                    return false;
                }
                break;
            case 'button':
                if (this.icon == null || this.icon == '') {
                    return false;
                }
                break;
        }

        return true;
    }
}
