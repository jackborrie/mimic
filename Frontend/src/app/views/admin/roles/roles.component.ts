import {Component, ContentChild, ContentChildren, OnDestroy, OnInit, QueryList, ViewChild} from '@angular/core';
import {
    RoleService
}                                                                                          from '../../../services/role.service';
import {BehaviorSubject, Observable, Subject, Subscription, throttleTime}                  from 'rxjs';
import {
    PaginationChanged
}                                                                                          from '../../../components/table/table.component';
import {
    AuthService
}                                                                                          from '../../../services/auth.service';
import {Router}                                                                            from '@angular/router';
import {
    MimicTemplate
}                                                                                          from '../../../directives/mimic-template.directive';
import {
    DialogService
}                                                                                          from '../../../services/dialog.service';
import {
    MimicDialog
}                                                                                          from '../../../directives/m-dialog.directive';
import {
    RequestService
}                                                                                          from '../../../services/request.service';

@Component({
               selector   : 'app-roles',
               templateUrl: './roles.component.html',
               styleUrl   : './roles.component.scss'
           })
export class RolesComponent implements OnInit, OnDestroy {

    @ViewChild(MimicDialog) creationDialog!: MimicDialog;

    protected roles: any[]       = [];
    protected totalPages: number = 1;
    protected searchTerm: string = '';

    protected newRoleName = '';

    protected adminRead: boolean  = false;
    protected adminWrite: boolean = false;

    protected loading: boolean = false;

    private _sortDirection: string = 'desc';
    private _pageSize: number      = 10;
    private _page: number          = 0;

    private _subscriptions: Subscription = new Subscription();

    private _keyPressTimeout: any;

    public constructor (
        private _role: RoleService,
        private _authService: AuthService,
        private _router: Router,
        private _dialog: DialogService
    ) {
    }

    public ngOnInit () {
        this.fetchRoles();

        if (this._authService.hasStatus()) {
            this.adminWrite = this._authService.hasWrite('admin');
            this.adminRead  = this.adminWrite || this._authService.hasRead('admin');
        } else {
            this.adminRead = this._authService.hadRead('admin');
        }

        let authStatusSub = this._authService.$onStatusChanged
                                .subscribe(() => {
                                    this.adminWrite = this._authService.hasWrite('admin');
                                    this.adminRead  = this.adminWrite || this._authService.hasRead('admin');

                                    if (!this.adminRead) {
                                        this._router.navigate(['']);
                                    }
                                });

        this._subscriptions.add(authStatusSub);
    }

    protected onPaginationChange (event: PaginationChanged) {
        this._page     = event.page;
        this._pageSize = event.pageSize;

        this.fetchRoles();
    }

    protected fetchRoles () {
        this.loading = true;
        const roleSub = this._role.getAllRoles(this.searchTerm, this._sortDirection, this._page, this._pageSize)
                            .subscribe(r => {
                                this.roles      = r.data;
                                this.totalPages = r.totalPages;
                                this.loading = false;
                            });

        this._subscriptions.add(roleSub);
    }

    public ngOnDestroy () {
        this._subscriptions.unsubscribe();
        clearTimeout(this._keyPressTimeout);
    }

    public handleSearchTermChange () {
        if (this._keyPressTimeout != null) {
            clearTimeout(this._keyPressTimeout);
        }

        this._keyPressTimeout = setTimeout(() => {
            this.search();
        }, 1000);
    }

    public search () {
        this.fetchRoles();
    }

    public create () {
        this._dialog.openDialog(this.creationDialog)
    }

    public onRoleCreate () {
        if (this.newRoleName == null || this.newRoleName == '') {
            return;
        }

        this._role.createRole(this.newRoleName)
            .subscribe(result => {
                this._dialog.closeDialog();
                this.fetchRoles();
            }, error => {
                console.error(error);
            });
    }

}
