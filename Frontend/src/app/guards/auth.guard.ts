import {CanActivateFn, Router} from '@angular/router';
import {inject}                from '@angular/core';
import {AuthService}   from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const routerService = inject(Router);

    if (!authService.isLoggedIn()) {
        authService.logout();
        routerService.navigate(['/auth']);
        return false;
    }

    return true;
};
