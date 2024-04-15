import {CanActivateFn, Router} from '@angular/router';
import {inject}                from '@angular/core';
import {AuthService}           from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
    const authService   = inject(AuthService);
    const routerService = inject(Router);

    if (!authService.isLoggedIn()) {
        authService.logout();
        routerService.navigate(['/auth']);
        return false;
    }

    let roles = route.data['roles'] as Array<string>;

    if (roles == null || roles.length == 0) {
        return true;
    }

    let hasOne = false;

    const hasStatus = authService.hasStatus();

    for (let roleIdx = 0; roleIdx < roles.length; roleIdx++) {
        let role = roles[roleIdx];
        if (
            (hasStatus && authService.hasRead(role)) ||
            (!hasStatus && authService.hadRead(role))
        ) {
            hasOne = true;
        }
    }

    return hasOne;
};
