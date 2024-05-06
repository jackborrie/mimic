import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {BookComponent} from "./components/book/book.component";
import {BookDetailsComponent} from "./views/books/book-details/book-details.component";

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'book/:id', component: BookDetailsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
