import {Component, HostListener} from '@angular/core';
import {FilteredData}            from "../../models/filtered-data";
import {Book}         from "../../models/book";
import {Subscription} from "rxjs";
import {BookService}  from "../../services/book.service";

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

    protected uploading: boolean = false;

    private _subscriptions: Subscription = new Subscription();

    private _files: {[key: string]: FileUploadStatus} = {};

    public constructor(
        private _books: BookService
    ) {
        for (let i = 0; i < 100; i++) {
            const newBook = new Book();

            newBook.title = 'Title: ' + i;
        }
    }

    ngOnInit() {
        this._fetchBooks();
    }

    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }

    private _fetchBooks () {
        const allBooksSub = this._books.getAllBooks(null)
            .subscribe(books => {
                this.books = books;
            });

        this._subscriptions.add(allBooksSub);
    }

    handleFileUpload (event: any) {
        const files = event.target.files;

        if (files.length <= 0) {
            return;
        }

        this._doUpload(files)
    }

    handleFileDropped (files: FileList) {
        this._doUpload(files)
    }

    private _doUpload(files: FileList) {
        this._files = {};
        this.uploading = true;
        for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
            const file = files[fileIdx];

            this._files[file.name] = {
                file: file,
                complete: false
            }

            this._books.uploadBook(file)
                .subscribe(result => {
                    this._files[file.name].complete = true;

                    this._checkAllFilesUploaded();
                }, error => {
                    this._files[file.name].complete = true;

                    console.error(error);
                })
        }
    }

    private _checkAllFilesUploaded () {
        let anyWaiting = false;
        for (let fileNames of Object.keys(this._files)) {
            if (!this._files[fileNames].complete) {
                anyWaiting = true;
                break;
            }
        }

        if (anyWaiting) {
            return;
        }

        this._fetchBooks()
        this.uploading = false;
    }
}
