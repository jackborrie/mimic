import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStateService}              from '../../services/app-state.service';
import {Subscription}                 from 'rxjs';
import {SidebarItem}                  from '../sidebar-item/sidebar-item.component';
import {AuthService} from "../../services/auth.service";

@Component({
               selector   : 'app-sidebar',
               templateUrl: './sidebar.component.html',
               styleUrl   : './sidebar.component.scss'
           })
export class SidebarComponent implements OnInit, OnDestroy {

    private _subscription: Subscription = new Subscription();

    public constructor (
        private _state: AppStateService,
        private _authService: AuthService
    ) {
    }


    ngOnInit (): void {
    }
    ngOnDestroy (): void {
        this._subscription.unsubscribe();
    }

    protected logout () {
        this._authService.logout().subscribe();
    }
}
