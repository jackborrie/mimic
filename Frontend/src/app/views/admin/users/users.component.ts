import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService}                  from '../../../services/user.service';
import {User}                         from '../../../models/user';
import {Subscription}                 from 'rxjs';
import {AuthService}                  from '../../../services/auth.service';

@Component({
               selector   : 'app-users',
               templateUrl: './users.component.html',
               styleUrl   : './users.component.scss'
           })
export class UsersComponent implements OnInit, OnDestroy {

    protected users: User[] = [];
    protected isLoading     = false;

    protected totalPages = 0;
    protected searchTerm = '';

    protected adminRead: boolean  = false;
    protected adminWrite: boolean = false;

    private _subscriptions: Subscription = new Subscription();

    private _sortDirection: string = '';
    private _sortBy: string        = '';
    private _page: number          = 0;
    private _pageSize: number      = 10;

    public constructor (
        private _userService: UserService,
        private _authService: AuthService
    ) {
    }

    ngOnDestroy (): void {
        this._subscriptions.unsubscribe();
    }

    ngOnInit (): void {
        this.filterUsers();

        this.adminWrite = this._authService.hadWrite('admin');
        this.adminRead  = this.adminWrite || this._authService.hadRead('admin');

        let statusSub = this._authService.$onStatusChanged
                            .subscribe(() => {
                                this.adminWrite = this._authService.hasWrite('admin');
                                this.adminRead  = this.adminWrite || this._authService.hasRead('admin');
                            });

        this._subscriptions.add(statusSub);
    }

    private filterUsers () {
        let userSub = this._userService.getAllUsers(this.searchTerm, this._sortDirection, this._page, this._pageSize)
                          .subscribe(users => {
                              this.users      = users.data;
                              this.totalPages = users.totalPages;
                          });

        this._subscriptions.add(userSub);
    }
}
