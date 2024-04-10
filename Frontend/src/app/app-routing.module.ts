import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';
import {AuthComponent} from './views/auth/auth.component';
import {SettingsComponent} from './views/settings/settings.component';
import {AdminComponent} from "./views/admin/admin.component";
import {UsersComponent} from "./views/admin/users/users.component";
import {RolesComponent} from "./views/admin/roles/roles.component";
import {AdminGuard}     from './guards/adminGuard';

const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
    {path: 'auth', component: AuthComponent},
    {
        path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
            {path: 'users', component: UsersComponent},
            {path: 'roles', component: RolesComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
