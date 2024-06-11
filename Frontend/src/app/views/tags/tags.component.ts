import {Component, OnDestroy, OnInit} from '@angular/core';
import {TagService}                   from "../../services/tag.service";
import {Tag}         from "../../models/tag";
import {FilteredData}                 from "../../models/filtered-data";
import {Subscription}                 from "rxjs";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent implements OnInit, OnDestroy {

    protected tags: FilteredData<Tag> | null = null;

    private _subscription: Subscription = new Subscription();

    public constructor(
        private _tagService: TagService
    ) {
    }

    public ngOnInit() {
        const tagFetchSubscription = this._tagService.$onTagsChanged
            .subscribe(tags => {
                this.tags = tags;
                console.log(tags);
            });

        this._subscription.add(tagFetchSubscription);
        this._tagService.getAllTags();
    }

    public ngOnDestroy() {
    }

}
