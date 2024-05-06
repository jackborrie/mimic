import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BookService} from "../../../services/book.service";
import { Subscription } from 'rxjs/internal/Subscription';
import {Book} from "../../../models/book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit, OnDestroy{

    private _bookId!: string;
    protected book?: Book;

    private _subscriptions: Subscription = new Subscription();

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _books: BookService
    ) {
    }

    public ngOnInit () {
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
                })

    }

    public ngOnDestroy () {
        this._subscriptions.unsubscribe();
    }

    private _noBookFound () {
        this._router.navigate(['']);
        // TODO add a toast that says the book with the id is invalid.
    }
}
