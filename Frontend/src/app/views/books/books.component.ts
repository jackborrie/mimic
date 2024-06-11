import {Component, HostListener} from '@angular/core';
import {FilteredData}            from "../../models/filtered-data";
import {Book}         from "../../models/book";
import {Subscription} from "rxjs";
import {BookService}         from "../../services/book.service";
import {Toast, ToastService} from "../../services/toast.service";

export interface FileUploadStatus {
    file: File,
    complete: boolean
}

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrl: './books.component.scss'
})
export class BooksComponent {

    protected books!: FilteredData<Book>;

    private _subscriptions: Subscription = new Subscription();

    public constructor(
        private _books: BookService,
        private _toast: ToastService
    ) {
    }

    ngOnInit() {
        this._fetchBooks();
    }

    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }

    private _fetchBooks () {
        const allBooksSub = this._books.$OnBooksChanged
            .subscribe(books => {
                this.books = books;
            });

        this._books.getAllBooks(null);

        this._subscriptions.add(allBooksSub);
    }
}
