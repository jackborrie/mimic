import { Component, OnDestroy, OnInit } from '@angular/core';
import {Book}        from "../../models/book";
import { Subscription } from 'rxjs';
import {BookService}                    from "../../services/book.service";
import {FilteredData}                   from "../../models/filtered-data";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

    protected books!: FilteredData<Book>;

    private _subscriptions: Subscription = new Subscription();

    public constructor(
        private _books: BookService
    ) {
        for (let i = 0; i < 100; i++) {
            const newBook = new Book();

            newBook.title = 'Title: ' + i;
        }
    }

    ngOnInit () {
        const allBooksSub = this._books.getAllBooks (null)
            .subscribe(books => {
                this.books = books;
            });
    }

    ngOnDestroy () {
        this._subscriptions.unsubscribe();
    }

}
