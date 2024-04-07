import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './views/dashboard/dashboard.component';
import {AuthGuard}            from './guards/auth.guard';
import {AuthComponent}        from './views/auth/auth.component';
import {SettingsComponent}    from './views/settings/settings.component';

const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
    {path: 'auth', component: AuthComponent},
];

@NgModule({
              imports: [RouterModule.forRoot(routes)],
              exports: [RouterModule]
          })
export class AppRoutingModule {

}
