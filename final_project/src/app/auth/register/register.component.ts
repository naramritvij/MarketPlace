import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, // Provides Angular directives like *ngIf, *ngFor
    ReactiveFormsModule, // For reactive forms support
    MatFormFieldModule, // Angular Material Form Field
    MatInputModule, // Angular Material Input Field
    MatButtonModule, // Angular Material Button
    MatCardModule, // Angular Material Card
    MatIconModule, // Angular Material Icon
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMsg: string = '';

  // URL and Authorization Key
  private registerUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/newusers';
  private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Getter methods for form controls
  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      try {
        const response = await fetch(this.registerUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${this.authToken}`, // Include the Authorization Key
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
          alert('Registration successful! Redirecting to login...');
          this.router.navigate(['/login']);
        } else {
          const errorData = await response.json();
          this.errorMsg =
            errorData.message || 'Registration failed. Please try again.';
        }
      } catch (error) {
        console.error('Error during registration:', error);
        this.errorMsg =
          'An error occurred during registration. Please try again later.';
      }
    } else {
      this.errorMsg = 'Please fill in all required fields correctly.';
    }
  }
}
