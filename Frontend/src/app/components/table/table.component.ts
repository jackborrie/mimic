import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    TemplateRef
}                      from '@angular/core';
import {MimicTemplate} from '../../directives/mimic-template.directive';

export interface PaginationChanged {
    pageSize: number,
    page: number
}

@Component({
    selector: 'm-table[rows][columns]',
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent implements AfterContentInit {

    @ContentChildren(MimicTemplate) templates!: QueryList<MimicTemplate>;

    @Input()
    columns!: string[];

    @Input()
    rows!: any[] | null;

    @Input()
    showPagination: boolean = false;

    @Input()
    loading: boolean = false;

    @Output()
    paginationChanged: EventEmitter<PaginationChanged> = new EventEmitter<PaginationChanged>();


    @Input()
    totalPages: number = 1;

    @Input()
    protected allowedPageSizes: number[] = [10];

    protected currentPage: number = 0;
    protected currentPageSize: number = 10;
    protected showPageSizeDropdown: boolean = false;

    ngAfterContentInit(): void {
    }

    protected getTemplate(columnName: string): TemplateRef<any> | null {
        let template = null;
        (this.templates as QueryList<MimicTemplate>).forEach(item => {
            if (item.getType() === columnName) {
                template = item.template;
                return;
            }
        });

        return template;
    }

    protected getHeaderTemplate(columnName: string): TemplateRef<any> | null {
        return this.getTemplate(columnName + 'Header');
    }

    protected togglePageSizeDropdown() {
        this.showPageSizeDropdown = !this.showPageSizeDropdown;
    }


    protected setPage(index: number) {
        this.currentPage = index;
        this._notifyPaginationListeners();
    }

    protected setPageSize(size: number) {
        this.showPageSizeDropdown = false;
        if (this.currentPageSize == size) {
            return;
        }
        this.currentPageSize = size;
        this._notifyPaginationListeners();
    }

    private _notifyPaginationListeners() {
        this.paginationChanged.next({page: this.currentPage, pageSize: this.currentPageSize});
    }

}
