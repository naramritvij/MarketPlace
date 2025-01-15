//// auth.guard.ts





// import { inject } from '@angular/core';
// import { CanActivateFn } from '@angular/router';
// import { AuthService } from './auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);

//   if (authService.isLoggedIn()) {
//     return true;
//   } else {
//     return false;
//   }
// };


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Allow access if the user is logged in
    }

    // Redirect to login if not authenticated
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }, // Optional: Save the return URL for post-login redirection
    });
    return false;
  }
}
