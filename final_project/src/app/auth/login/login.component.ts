






// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RouterModule } from '@angular/router';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     RouterModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatCardModule,
//     MatIconModule,
//   ],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   errorMessage: string = '';

//   // API endpoint for fetching users
//   private userApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers';

//   // Authorization token
//   private authToken =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//     });
//   }

//   async onLogin(): Promise<void> {
//     if (this.loginForm.valid) {
//       const { email, password } = this.loginForm.value;

//       try {
//         console.log('Sending API Request:', {
//           url: this.userApiUrl,
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `${this.authToken}`,
//           },
//         });

//         // Fetch all users from the API
//         const response = await fetch(this.userApiUrl, {
//           method: 'GET',
//           headers: {
//             //'Content-Type': 'application/json',
//             Authorization: `${this.authToken}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch users: ${response.statusText}`);
//         }

//         const jsonResponse = await response.json();
//         console.log('Fetched response:', jsonResponse);

//         // Extract the data field (user array) from the response
//         const users = jsonResponse.data;
//         if (!Array.isArray(users)) {
//           console.error('API response data is not an array:', users);
//           throw new Error('Unexpected API response format.');
//         }

//         // Check if the user exists and credentials match
//         const user = users.find((u: any) => u.email === email && u.password === password);

//         if (user) {
//           // Successful login
//           sessionStorage.setItem('token', 'mock-token'); // Use sessionStorage for session-based login
//           sessionStorage.setItem('user', JSON.stringify(user)); // Store user details
//           localStorage.setItem('authToken', this.authToken); // Store auth token in local storage
//           localStorage.setItem('userId', user._id); // Store user ID in local storage
//           localStorage.setItem('userName', user.name); // Store user name in local storage
//           alert(`Welcome, ${user.name}!`);
//           this.router.navigate(['/dashboard']);
//         } else {
//           // User not found or incorrect credentials
//           this.errorMessage = "You don't have any account. Please Register first.";
//           alert(this.errorMessage);
//           this.router.navigate(['/register']);
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         this.errorMessage = 'Login failed. Please try again later.';
//       }
//     } else {
//       this.errorMessage = 'Please fill in all required fields.';
//     }
//   }
// }
























// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RouterModule } from '@angular/router';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     RouterModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatCardModule,
//     MatIconModule,
//   ],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   errorMessage: string = '';

//   // API endpoint for fetching users
//   private userApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers';

//   // Authorization token
//   private authToken =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//     });
//   }

//   async onLogin(): Promise<void> {
//     if (this.loginForm.valid) {
//       const { email, password } = this.loginForm.value;

//       try {
//         console.log('Sending API Request:', {
//           url: this.userApiUrl,
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `${this.authToken}`,
//           },
//         });

//         // Fetch all users from the API
//         const response = await fetch(this.userApiUrl, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `${this.authToken}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch users: ${response.statusText}`);
//         }

//         const jsonResponse = await response.json();
//         console.log('Fetched response:', jsonResponse);

//         // Extract the data field (user array) from the response
//         const users = jsonResponse.data;
//         if (!Array.isArray(users)) {
//           console.error('API response data is not an array:', users);
//           throw new Error('Unexpected API response format.');
//         }

//         // Check if the user exists
//         const user = users.find((u: any) => u.email === email && u.password === password);

//         if (user) {
//           // Check if the user is blocked
//           if (user.status === 'blocked') {
//             this.errorMessage = 'You have been blocked by the admin.';
//             alert(this.errorMessage);
//             return; // Stop further execution
//           }

//           // Successful login
//           sessionStorage.setItem('token', 'mock-token'); // Use sessionStorage for session-based login
//           sessionStorage.setItem('user', JSON.stringify(user)); // Store user details
//           localStorage.setItem('authToken', this.authToken); // Store auth token in local storage
//           localStorage.setItem('userId', user._id); // Store user ID in local storage
//           localStorage.setItem('userName', user.name); // Store user name in local storage
//           alert(`Welcome, ${user.name}!`);
//           this.router.navigate(['/dashboard']);
//         } else {
//           // User not found or incorrect credentials
//           this.errorMessage = "Invalid email or password. Please try again.";
//           alert(this.errorMessage);
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         this.errorMessage = 'Login failed. Please try again later.';
//       }
//     } else {
//       this.errorMessage = 'Please fill in all required fields.';
//     }
//   }
// }


























import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  // API endpoint for fetching users
  private userApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers';

  // Authorization token
  private authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        // Fetch all users from the API
        const response = await fetch(this.userApiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${this.authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const jsonResponse = await response.json();

        // Extract the data field (user array) from the response
        const users = jsonResponse.data;
        if (!Array.isArray(users)) {
          throw new Error('Unexpected API response format.');
        }

        // Check if the user exists
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (user) {
          // Check if the user is blocked
          if (user.status === 'Blocked') {
            this.errorMessage = 'You have been blocked by the admin.';
            alert(this.errorMessage);
            return; // Stop further execution
          }

          // Successful login
          sessionStorage.setItem('token', 'mock-token'); // Use sessionStorage for session-based login
          sessionStorage.setItem('user', JSON.stringify(user)); // Store user details
          localStorage.setItem('authToken', this.authToken); // Store auth token in local storage
          localStorage.setItem('userId', user._id); // Store user ID in local storage
          localStorage.setItem('userName', user.name); // Store user name in local storage
          alert(`Welcome, ${user.name}!`);
          this.router.navigate(['/dashboard']);
        } else {
          // User not found or incorrect credentials
          this.errorMessage = 'Invalid email or password. Please try again.';
          alert(this.errorMessage);
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.errorMessage = 'Login failed. Please try again later.';
        alert(this.errorMessage);
      }
    } else {
      this.errorMessage = 'Please fill in all required fields.';
      alert(this.errorMessage);
    }
  }
}
