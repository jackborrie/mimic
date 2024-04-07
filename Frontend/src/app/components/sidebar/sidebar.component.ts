import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStateService}              from '../../services/app-state.service';
import {Subscription}                 from 'rxjs';
import {SidebarItem}                  from '../sidebar-item/sidebar-item.component';

@Component({
               selector   : 'app-sidebar',
               templateUrl: './sidebar.component.html',
               styleUrl   : './sidebar.component.scss'
           })
export class SidebarComponent implements OnInit, OnDestroy {

    private _subscription: Subscription = new Subscription();

    protected isExpanded: boolean = false;

    public constructor (
        private _state: AppStateService
    ) {
    }


    ngOnInit (): void {
        let sidebarToggleSub = this._state.$isSidebarExpandedChanged
                                   .subscribe(isExpanded => {
                                       this.isExpanded = isExpanded;
                                   })

        this._subscription.add(sidebarToggleSub);
    }
    ngOnDestroy (): void {
        this._subscription.unsubscribe();
    }

    protected toggleSidebar () {
        this._state.toggleSidebar();
    }
}
