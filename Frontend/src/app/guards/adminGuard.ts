import {CanActivateChildFn, Router} from '@angular/router';
import {inject}                     from '@angular/core';
import {AuthService}                from '../services/auth.service';

export const AdminGuard: CanActivateChildFn = (childRoute, state) => {
    const authService   = inject(AuthService);
    const routerService = inject(Router);

    let route = false;
    let logout = false;

    if (!authService.isLoggedIn()) {
        logout = true;
        return false;
    }

    if (authService.hasStatus()) {
        if (!authService.hasRead('admin')) {
            route = true;
        }
    } else {
        if (!authService.wasAdmin()) {
            route = true;
        }
    }

    if (logout) {
        authService.logout();
        routerService.navigate(['auth']);
        return false;
    }

    if (route) {
        routerService.navigate(['']);
        return false;
    }

    return true;
};
