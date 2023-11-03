import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    
    if (this.authService.isAuthenticated()) {
      const expectedRole = route.data['expectedRole'];

      if (expectedRole && !this.authService.hasRole(expectedRole)) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    } else {
      // Navigate to the login page if not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }
}

