import {EventEmitter, Injectable} from '@angular/core';
import {RequestService}           from "./request.service";
import {Book} from "../models/book";
import { HttpHeaders } from '@angular/common/http';
import {FilteredData}             from "../models/filtered-data";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    private _allBooks: FilteredData<Book> = new FilteredData();
    public $OnBooksChanged: Subject<FilteredData<Book>> = new BehaviorSubject(this._allBooks);

    constructor(
        private _request: RequestService
    ) {
    }

    public getAllBooks (headers: HttpHeaders | null = null) {
        this._request.getAll<Book>('api/books', Book, headers)
            .subscribe(books => {
                this._allBooks = books;
                this.$OnBooksChanged.next(this._allBooks);
            });
    }

    public getBookById (bookId: string, headers: HttpHeaders | null = null) {
        return this._request.get<Book>('api/books/' + bookId, Book, headers);
    }

    public uploadBook (file: File) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this._request.post('api/books/upload', formData);
    }

    public deleteBook (bookId: string) {
        return this._request.delete('api/books/' + bookId);
    }
}
