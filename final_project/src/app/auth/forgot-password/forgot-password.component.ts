//   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-forgot-password',
//   standalone: true,
//   imports: [
//     CommonModule, // Common Angular directives (*ngIf, *ngFor, etc.)
//     ReactiveFormsModule, // Reactive Forms Module
//     MatFormFieldModule, // Material Form Field
//     MatInputModule, // Material Input
//     MatButtonModule, // Material Buttons
//     MatCardModule, // Material Card
//     MatIconModule, // Material Icons (if used)
//   ],
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.css'],
// })
// export class ForgotPasswordComponent {
//   forgotPasswordForm: FormGroup;
//   emailVerified: boolean = false; // Controls visibility of password fields
//   userId: string | null = null; // Stores the user's ID after verification

//   private userApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers'; // GET users
//   private updateUserApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/newusers'; // PUT update password
//   private resetPasswordApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/resetpassword'; // POST reset data
//   private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI'; // Replace with your auth token

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.forgotPasswordForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       newPassword: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', [Validators.required]],
//     });
//   }

//   async verifyEmail(): Promise<void> {
//     const email = this.forgotPasswordForm.get('email')?.value;

//     try {
//       const response = await fetch(this.userApiUrl, {
//         method: 'GET',
//         headers: { Authorization: `${this.authToken}` },
//       });

//       if (response.ok) {
//         const users = await response.json();
//         const user = users.find((u: any) => u.email === email);

//         if (user) {
//           this.emailVerified = true;
//           this.userId = user._id; // Store the user's ID
//         } else {
//           alert('Email not found in the database.');
//         }
//       } else {
//         alert('Failed to fetch users. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error verifying email:', error);
//       alert('An error occurred. Please try again later.');
//     }
//   }

//   async saveNewPassword(): Promise<void> {
//     if (this.forgotPasswordForm.valid && this.userId) {
//       const { newPassword, confirmPassword } = this.forgotPasswordForm.value;

//       if (newPassword !== confirmPassword) {
//         alert('New Password and Confirm Password do not match.');
//         return;
//       }

//       try {
//         const updateResponse = await fetch(`${this.updateUserApiUrl}/${this.userId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `${this.authToken}`,
//           },
//           body: JSON.stringify({ password: newPassword }), // Only update password
//         });

//         if (!updateResponse.ok) {
//           alert('Failed to update the password in the database.');
//           return;
//         }

//         const resetResponse = await fetch(this.resetPasswordApiUrl, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `${this.authToken}`,
//           },
//           body: JSON.stringify({
//             email: this.forgotPasswordForm.get('email')?.value,
//             newPassword: newPassword,
//           }),
//         });

//         if (resetResponse.ok) {
//           alert('Password updated successfully!');
//           this.router.navigate(['/login']); // Redirect to login page
//         } else {
//           alert('Failed to save the reset password data.');
//         }
//       } catch (error) {
//         console.error('Error updating password:', error);
//         alert('An error occurred while saving the new password. Please try again later.');
//       }
//     }
//   }
// }



























import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule, // Angular common directives
    ReactiveFormsModule, // Reactive forms for form validation
    MatFormFieldModule, // Material form fields
    MatInputModule, // Material input fields
    MatButtonModule, // Material buttons
    MatCardModule, // Material cards
    MatIconModule, // Material icons
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  emailVerified: boolean = false; // Toggle to show/hide password fields
  userId: string | null = null; // Stores user's ID after email verification

  // API URLs and Authorization Token
  private userApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers'; // GET users
  private updateUserApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/newusers'; // PUT update password
  private resetPasswordApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/resetpassword'; // POST reset record
  private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  /**
   * Verifies if the entered email exists in the database.
   */
  async verifyEmail(): Promise<void> {
    const email = this.forgotPasswordForm.get('email')?.value;

    try {
      const response = await fetch(this.userApiUrl, {
        method: 'GET',
        headers: { Authorization: `${this.authToken}` },
      });

      if (response.ok) {
        const responseData = await response.json();
        const user = responseData.data.find((u: any) => u.email === email);

        if (user) {
          this.emailVerified = true;
          this.userId = user._id; // Store the user ID
          alert('Email verified! Please proceed to reset your password.');
        } else {
          alert('Email not found. Please check and try again.');
        }
      } else {
        alert('Failed to fetch users. Please try again later.');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      alert('An error occurred. Please try again later.');
    }
  }

  /**
   * Updates the password in the database and logs the reset action.
   */
  async saveNewPassword(): Promise<void> {
    if (this.forgotPasswordForm.valid && this.userId) {
      const { newPassword, confirmPassword } = this.forgotPasswordForm.value;

      if (newPassword !== confirmPassword) {
        alert('New Password and Confirm Password do not match.');
        return;
      }

      try {
        // Update the password in the newusers database
        const updateResponse = await fetch(`${this.updateUserApiUrl}/${this.userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${this.authToken}`,
          },
          body: JSON.stringify({ password: newPassword }),
        });

        if (!updateResponse.ok) {
          alert('Failed to update the password in the database.');
          return;
        }

        // Log the reset password action in resetpassword API
        const resetResponse = await fetch(this.resetPasswordApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${this.authToken}`,
          },
          body: JSON.stringify({
            email: this.forgotPasswordForm.get('email')?.value,
            newPassword: newPassword,
          }),
        });

        if (resetResponse.ok) {
          alert('Password updated successfully!');
          this.router.navigate(['/login']); // Redirect to login
        } else {
          alert('Failed to log the reset password action.');
        }
      } catch (error) {
        console.error('Error saving new password:', error);
        alert('An error occurred while saving the new password. Please try again later.');
      }
    }
  }
}
