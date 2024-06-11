import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule}                    from '@angular/platform-browser';

import {AppRoutingModule}             from './app-routing.module';
import {AppComponent}                 from './app.component';
import {HttpClientModule}             from '@angular/common/http';
import {DashboardComponent}           from './views/dashboard/dashboard.component';
import {FormsModule}                  from '@angular/forms';
import {SidebarItemComponent}         from './components/sidebar-item/sidebar-item.component';
import {SidebarComponent}             from './components/sidebar/sidebar.component';
import {BrowserAnimationsModule}      from '@angular/platform-browser/animations';
import {TableComponent}               from './components/table/table.component';
import {MimicTemplate}                from './directives/mimic-template.directive';
import {HeaderComponent}              from './components/header/header.component';
import {BookComponent}                from './components/book/book.component';
import {BookRowComponent}             from './components/book-row/book-row.component';
import {MimicButton}                  from "./directives/mimic-button.directive";
import {BookDetailsComponent}         from './views/books/book-details/book-details.component';
import {SpinnerComponent}             from './components/spinner/spinner.component';
import {TagComponent}                 from './components/tag/tag.component';
import {BooksComponent}               from './views/books/books.component';
import {DropdownComponent}            from './components/dropdown/dropdown.component';
import {DragNDropDirective}           from './directives/drag-n-drop.directive';
import {MimicDropdownButtonDirective} from './directives/mimic-dropdown-button.directive';
import {MimicDialog}                  from './directives/mimic-dialog.directive';
import {DialogComponent}              from './components/dialog/dialog.component';
import {MimicInput}                   from './directives/mimic-input.directive';
import { TagsComponent } from './views/tags/tags.component';
import { PanelComponent } from './components/panel/panel.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        SidebarItemComponent,
        SidebarComponent,
        TableComponent,
        MimicTemplate,
        MimicButton,
        HeaderComponent,
        BookComponent,
        BookRowComponent,
        BookDetailsComponent,
        SpinnerComponent,
        TagComponent,
        BooksComponent,
        DropdownComponent,
        DragNDropDirective,
        MimicDropdownButtonDirective,
        MimicDialog,
        DialogComponent,
        MimicInput,
        TagsComponent,
        PanelComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
