import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './views/dashboard/dashboard.component';
import {AuthGuard}            from './guards/auth.guard';
import {AuthComponent}        from './views/auth/auth.component';
import {SettingsComponent}    from './views/settings/settings.component';
import {AdminComponent}       from './views/admin/admin.component';
import {UsersComponent}       from './views/admin/users/users.component';
import {RolesComponent}       from './views/admin/roles/roles.component';
import {AppearanceComponent} from "./views/settings/appearance/appearance.component";

const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'auth', component: AuthComponent},
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        children: [
            {path: 'appearance', component: AppearanceComponent}
        ]
    },
    {
        path       : 'admin',
        component  : AdminComponent,
        canActivate: [AuthGuard],
        data       : {roles: ['admin']},
        children   : [
            {path: 'users', component: UsersComponent},
            {path: 'roles', component: RolesComponent}
        ]
    }
];

@NgModule({
              imports: [RouterModule.forRoot(routes)],
              exports: [RouterModule]
          })
export class AppRoutingModule {

}
