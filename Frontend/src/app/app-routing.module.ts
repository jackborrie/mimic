import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {BookComponent} from "./components/book/book.component";
import {BookDetailsComponent} from "./views/books/book-details/book-details.component";
import {BooksComponent} from "./views/books/books.component";
import {TagsComponent} from "./views/tags/tags.component";

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'book'},
    {path: 'book', component: BooksComponent},
    {path: 'book/:id', component: BookDetailsComponent},
    {path: 'tag', component: TagsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
