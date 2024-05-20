import {Injectable}               from '@angular/core';
import {Tag}                      from "../models/tag";
import {BehaviorSubject, Subject} from "rxjs";
import {RequestService}           from "./request.service";
import {FilteredData}             from "../models/filtered-data";

@Injectable({
    providedIn: 'root'
})
export class TagService {

    private _tags: FilteredData<Tag> = new FilteredData();
    public $onTagsChanged: Subject<FilteredData<Tag>> = new BehaviorSubject(this._tags);

    constructor(
        private _request: RequestService
    ) {
    }

    public getAllTags() {
        this._request.getAll<Tag>('api/tags', Tag, null)
            .subscribe(tags => {
                this._tags = tags;
                this.$onTagsChanged.next(tags);
            });
    }
}
