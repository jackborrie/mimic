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

    public constructor(
        private _books: BookService
    ) {
    }

    ngOnInit () {
    }

    ngOnDestroy () {
    }

}
