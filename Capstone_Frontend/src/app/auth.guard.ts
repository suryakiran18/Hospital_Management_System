import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    if (!loggedInUser || !loggedInUser.role) {
      this.router.navigate(['/login']); 
      return false;
    }

    
    const requiredRoles = route.data?.['roles'] as Array<string>;
    if (requiredRoles && !requiredRoles.includes(loggedInUser.role)) {
      setTimeout(() => {
        alert('You do not have permission to access this page');
      }, 0); 
      this.router.navigate(['']); 
      return false;
    }
    

    return true;
  }
}
