import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule}                    from '@angular/platform-browser';

import {AppRoutingModule}        from './app-routing.module';
import {AppComponent}            from './app.component';
import {HttpClientModule}        from '@angular/common/http';
import {DashboardComponent}      from './views/dashboard/dashboard.component';
import {FormsModule}             from '@angular/forms';
import {SidebarItemComponent}    from './components/sidebar-item/sidebar-item.component';
import {SidebarComponent}        from './components/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableComponent}          from './components/table/table.component';
import {MimicTemplate}           from './directives/mimic-template.directive';
import {HeaderComponent}         from './components/header/header.component';
import {BookComponent}           from './components/book/book.component';
import {BookRowComponent} from './components/book-row/book-row.component';
import {MimicButton}      from "./directives/mimic-button.directive";

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
        BookRowComponent
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
