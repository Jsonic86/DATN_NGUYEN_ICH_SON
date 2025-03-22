import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { getCookie } from '../core/utils';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const expectedRole = route.data['role'];
        // this.authService.myInfo().subscribe();
        const userRole: string[] = getCookie('roles')?.split(', ') || [];

        if (userRole.includes(expectedRole) && this.authService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['auth/login']);
        return false;
    }
}