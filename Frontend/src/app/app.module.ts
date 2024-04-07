import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent}     from './app.component';
import {AuthComponent}    from './views/auth/auth.component';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { InputComponent } from './components/input/input.component';
import {FormsModule} from '@angular/forms';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SettingsComponent } from './views/settings/settings.component';

@NgModule({
              declarations: [
                  AppComponent,
                  AuthComponent,
                  DashboardComponent,
                  UserDropdownComponent,
                  InputComponent,
                  SidebarItemComponent,
                  SidebarComponent,
                  SettingsComponent
              ],
              imports: [
                  BrowserModule,
                  AppRoutingModule,
                  HttpClientModule,
                  FormsModule
              ],
              providers   : [],
              bootstrap   : [AppComponent]
          })
export class AppModule {
}
