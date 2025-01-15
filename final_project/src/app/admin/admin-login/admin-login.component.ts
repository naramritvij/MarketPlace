// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
// import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

// @Component({
//   selector: 'app-admin-login',
//   standalone: true, // Mark as standalone
//   imports: [FormsModule, CommonModule], // Include FormsModule and CommonModule
//   templateUrl: './admin-login.component.html',
//   styleUrls: ['./admin-login.component.css'], // Professional styling
// })
// export class AdminLoginComponent {
//   email: string = '';
//   password: string = '';
//   errorMessage: string = '';

//   private authKey =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';
//   private loginUrl =
//     'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newadmin';

//   constructor(private router: Router) {}

//   async login() {
//     if (!this.email || !this.password) {
//       this.errorMessage = 'Email and password are required!';
//       return;
//     }

//     try {
//       const response = await fetch(this.loginUrl, {
//         method: 'GET',
//         headers: {
//           Authorization: this.authKey,
//         },
//       });

//       if (response.ok) {
//         const admins = await response.json();
//         const admin = admins.find(
//           (a: any) => a.email === this.email && a.password === this.password
//         );

//         if (admin) {
//           localStorage.setItem('adminLoggedIn', 'true');
//           localStorage.setItem('adminName', admin.name);
//           alert('Login successful!');
//           this.router.navigate(['/admin-dashboard']);
//         } else {
//           this.errorMessage = 'Invalid email or password.';
//         }
//       } else {
//         console.error('Login failed:', response.statusText);
//         this.errorMessage = 'Login failed. Please try again.';
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       this.errorMessage = 'An error occurred. Please try again later.';
//     }
//   }
// }












import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

@Component({
  selector: 'app-admin-login',
  standalone: true, // Mark as standalone
  imports: [FormsModule, CommonModule], // Include FormsModule and CommonModule
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'], // Professional styling
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private authKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';
  private loginUrl =
    'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newadmin';

  constructor(private router: Router) {}

  async login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required!';
      return;
    }

    try {
      const response = await fetch(this.loginUrl, {
        method: 'GET',
        headers: {
          Authorization: this.authKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Debugging API response

        // Extract the `data` array from the response
        const admins = data?.data;

        // Check if `admins` is an array
        if (Array.isArray(admins)) {
          const admin = admins.find(
            (a: any) =>
              a.email === this.email && a.password === this.password
          );

          if (admin) {
            // Successful login
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminName', admin.name || 'Admin');
            alert('Login successful!');
            this.router.navigate(['/admin-dashboard']);
          } else {
            // Invalid credentials
            this.errorMessage = 'Invalid email or password.';
          }
        } else {
          // Handle unexpected response format
          console.error('Unexpected API response format:', data);
          this.errorMessage = 'Unable to process login at this time.';
        }
      } else {
        // Handle non-200 HTTP response
        console.error('Login failed:', response.statusText);
        this.errorMessage = 'Login failed. Please try again.';
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
      this.errorMessage = 'An error occurred. Please try again later.';
    }
  }
}
