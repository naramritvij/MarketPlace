import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SharedModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'INFO-6150-final-project';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.setupSessionClearOnUnload();
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // User is logged in if authToken exists
  }

  // Check if the admin is logged in
  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('adminLoggedIn'); // Admin is logged in if adminLoggedIn exists
  }

  // Show guest buttons when neither user nor admin is logged in
  showGuestButtons(): boolean {
    return !this.isLoggedIn() && !this.isAdminLoggedIn();
  }

  // Show user-specific buttons
  showUserButtons(): boolean {
    return this.isLoggedIn() && !this.isAdminLoggedIn();
  }

  // Show admin-specific buttons
  showAdminButtons(): boolean {
    return this.isAdminLoggedIn();
  }

  // Logout function
  onLogout(): void {
    if (this.isLoggedIn()) {
      this.authService.logout(); // Clear user session via AuthService
    }
    if (this.isAdminLoggedIn()) {
      localStorage.removeItem('adminLoggedIn'); // Clear admin session
      localStorage.removeItem('adminName'); // Clear admin name
    }

    // Redirect to home page after logout
    this.router.navigate(['/']).then(() => {
      console.log('User or Admin logged out and navigated to the home page.');
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }

  // Automatically check session state on page load
  ngOnInit(): void {
    const userLoggedIn = this.isLoggedIn();
    const adminLoggedIn = this.isAdminLoggedIn();

    // Redirect to login page if no session is active
    if (!userLoggedIn && !adminLoggedIn) {
      console.log('No session token found. Redirecting to home page.');
      this.router.navigate(['/']);
    }
  }
}
