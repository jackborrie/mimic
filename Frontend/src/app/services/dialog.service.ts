import {ContentChild, ContentChildren, Injectable, QueryList, TemplateRef} from '@angular/core';
import {MimicDialog}                                                       from '../directives/m-dialog.directive';
import {BehaviorSubject, Subject}                            from 'rxjs';
import {MimicTemplate}                                       from '../directives/mimic-template.directive';

@Injectable({
                providedIn: 'root'
            })
export class DialogService {

    private _currentlyOpenDialog: MimicDialog | null = null;

    public $onDialogChange: Subject<MimicDialog | null> = new BehaviorSubject<MimicDialog | null>(null);

    constructor () {
    }

    public openDialog (template: MimicDialog) {
        this._currentlyOpenDialog = template;
        this.$onDialogChange.next(this._currentlyOpenDialog);
    }

    public closeDialog () {
        this._currentlyOpenDialog = null;
        this.$onDialogChange.next(this._currentlyOpenDialog);
    }
}
