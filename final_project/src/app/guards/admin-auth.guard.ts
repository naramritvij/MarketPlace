import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn'); // Check admin authentication state
    if (isAdminLoggedIn) {
      return true; // Allow access if admin is logged in
    } else {
      this.router.navigate(['/admin-login']); // Redirect to admin login page if not logged in
      return false; // Deny access
    }
  }
}
