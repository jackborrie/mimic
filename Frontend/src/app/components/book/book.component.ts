import { Component, Input } from '@angular/core';
import {Book}               from "../../models/book";

@Component({
  selector: 'app-book[book]',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

    @Input()
    book!: Book;

}
