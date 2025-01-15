// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatCardModule,
//   ],
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css'],
// })
// export class ProfileComponent implements OnInit {
//   profileForm: FormGroup; // Form for profile details
//   successMessage = ''; // Message on success
//   errorMessage = ''; // Message on error
//   userId = ''; // Store the user ID for API updates

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.profileForm = this.fb.group({
//       name: ['', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]],
//     });
//   }

//   ngOnInit(): void {
//     // Get the logged-in user from the AuthService
//     const user = this.authService.getUser();

//     if (!user) {
//       // Redirect to login if no user is logged in
//       this.router.navigate(['/login']);
//       return;
//     }

//     // Set user details in the form and store user ID
//     this.userId = user._id;
//     this.profileForm.patchValue({
//       name: user.name,
//       email: user.email,
//     });
//   }

//   async onSave(): Promise<void> {
//     // Ensure the form is valid before attempting an update
//     if (this.profileForm.valid) {
//       try {
//         const updatedUser = { ...this.profileForm.value };

//         // Call AuthService to update the user details
//         const response = await this.authService.updateUser(this.userId, updatedUser);

//         // if (response && response.success) {
//         //   this.successMessage = 'Profile updated successfully!';
//         //   updatedUser._id = this.userId; // Retain user ID
//         //   localStorage.setItem('user', JSON.stringify(updatedUser)); // Update local storage
//         // } else {
//         //   throw new Error(response?.message || 'Unknown error during update.');
//         // }

//         // Handle success response
//       if (response.message === 'Document updated successfully') {
//         this.successMessage = 'Profile updated successfully!';
//         updatedUser._id = this.userId; // Retain user ID
//         localStorage.setItem('user', JSON.stringify(updatedUser)); // Update local storage
//         this.authService.setUser(updatedUser); // Update AuthService cache
//       } else {
//         throw new Error('Unexpected response from server.');
//       }
//       } catch (error) {
//         console.error('Error updating profile:', error);
//         this.errorMessage = 'Failed to update profile. Please try again later.';
//       }
//     } else {
//       this.errorMessage = 'Please fill in all required fields.';
//     }
//   }
// }















import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup; // Form for profile details
  successMessage = ''; // Message on success
  errorMessage = ''; // Message on error
  userId = ''; // Store the user ID for API updates
  loading = false; // Loading state
  showPopup = false; // Popup visibility

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Get the logged-in user from the AuthService
    const user = this.authService.getUser();

    if (!user) {
      // Redirect to login if no user is logged in
      this.router.navigate(['/login']);
      return;
    }

    // Set user details in the form and store user ID
    this.userId = user._id;
    this.profileForm.patchValue({
      name: user.name,
      email: user.email,
    });
  }

  async onSave(): Promise<void> {
    // Ensure the form is valid before attempting an update
    if (this.profileForm.valid) {
      this.loading = true;
      try {
        const updatedUser = { ...this.profileForm.value };

        // Call AuthService to update the user details
        const response = await this.authService.updateUser(this.userId, updatedUser);

        if (response.message === 'Document updated successfully') {
          this.successMessage = 'Profile updated successfully!';
          updatedUser._id = this.userId; // Retain user ID
          localStorage.setItem('user', JSON.stringify(updatedUser)); // Update local storage
          this.authService.setUser(updatedUser); // Update AuthService cache

          // Show success popup and redirect after 2 seconds
          this.showPopup = true;
          setTimeout(() => {
            this.showPopup = false;
            this.router.navigate(['/dashboard']); // Redirect to dashboard
          }, 2000);
        } else {
          throw new Error('Unexpected response from server.');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        this.errorMessage = 'Failed to update profile. Please try again later.';
      } finally {
        this.loading = false;
      }
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
