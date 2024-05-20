import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router}                                                       from '@angular/router';
import {BookService}                  from "../../../services/book.service";
import {Subscription}                 from 'rxjs/internal/Subscription';
import {Book}                         from "../../../models/book";
import {RequestService}               from "../../../services/request.service";
import {saveAs}                       from 'file-saver';
import {Toast, ToastService}                 from "../../../services/toast.service";
import {MimicDialog}                             from "../../../directives/mimic-dialog.directive";
import {DialogComponent}                                                              from "../../../components/dialog/dialog.component";
import {Tag}                                                                          from "../../../models/tag";

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit, OnDestroy {

    @ViewChild('editTagsDialog')
    editTagsDialog!: DialogComponent;

    private _bookId!: string;
    protected book: Book | null = null;
    protected deletionConfirmation: boolean = false;

    protected tags: Tag[] = [];

    private _subscriptions: Subscription = new Subscription();

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _books: BookService,
        private _request: RequestService,
        private _toast: ToastService
    ) {
    }

    public ngOnInit() {
        const bookId = this._route.snapshot.paramMap.get('id');
        if (bookId == null || bookId === '') {
            this._noBookFound();
            return;
        }

        this._bookId = bookId;

        const bookFetchSub = this._books.getBookById(this._bookId)
            .subscribe(
                (book) => {
                    if (book == null) {
                        this._noBookFound();
                        return;
                    }

                    this.book = book;
                },
                error => {
                    this._noBookFound();
                    return;
                });

        this._subscriptions.add(bookFetchSub);

    }

    public ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }

    protected downloadBook() {
        if (this.book == null) {
            return;
        }

        this._request.download(`api/books/${this._bookId}/download`)
            .subscribe(data => {
                saveAs(data, this.book?.getFileName());
            })
    }

    protected deleteBook () {
        if (!this.deletionConfirmation) {
            this.deletionConfirmation = true;
            return;
        }

        // TODO add an "Are you sure"
        this._books.deleteBook(this._bookId)
            .subscribe(result => {
                this.deletionConfirmation = false;
                this._toast.showToast(new Toast(`Book [${this.book?.title}] has been deleted`, 'success'));
                this._router.navigate(['/']);
            }, error => {
                this.deletionConfirmation = false;
                this._toast.showToast(new Toast(`Book [${this.book?.title}] failed to delete`, 'error'));
            });
    }

    protected handleDropdownClosed () {
        this.deletionConfirmation = false;
    }

    private _noBookFound() {
        this._router.navigate(['']);
        // TODO add a toast that says the book with the id is invalid.
    }

    protected showTags () {
        this.tags = this.book?.tags ?? [];

        this.editTagsDialog.show()
    }
}
