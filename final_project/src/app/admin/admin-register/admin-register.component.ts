import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

@Component({
  selector: 'app-admin-register',
  standalone: true, // Mark as standalone
  imports: [FormsModule, CommonModule], // Add CommonModule for *ngIf
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
})
export class AdminRegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private authKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';
  private registerUrl =
    'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/newadmin';

  constructor(private router: Router) {}

  async register() {
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    try {
      const adminData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      const response = await fetch(this.registerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authKey,
        },
        body: JSON.stringify(adminData),
      });

      if (response.ok) {
        alert('Registration successful!');
        this.router.navigate(['/admin-login']);
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        this.errorMessage = errorData?.message || 'Registration failed.';
      }
    } catch (error) {
      console.error('Error:', error);
      this.errorMessage = 'An error occurred. Please try again later.';
    }
  }
}
