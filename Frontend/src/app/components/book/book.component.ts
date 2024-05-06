import { Component, Input } from '@angular/core';
import {Book}               from "../../models/book";
import { Router } from '@angular/router';

@Component({
  selector: 'app-book[book]',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

    @Input()
    book!: Book;

    public constructor(
        private _router: Router
    ) {
    }

    protected bookDoubleClick () {
        this._router.navigate(['/book/' + this.book.id])
    }

    protected options (event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
    }
}
