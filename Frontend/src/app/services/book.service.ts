import {Injectable} from '@angular/core';
import {RequestService} from "./request.service";
import {Book} from "../models/book";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(
        private _request: RequestService
    ) {
    }

    public getAllBooks (headers: HttpHeaders | null = null) {
        return this._request.getAll<Book>('api/books', Book, headers);
    }

    public getBookById (bookId: string, headers: HttpHeaders | null = null) {
        return this._request.get<Book>('api/books/' + bookId, Book, headers);
    }
}
