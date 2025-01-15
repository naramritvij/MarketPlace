import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing functionality

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, // Basic Angular directives like *ngIf and *ngFor
    MatCardModule, // Angular Material Card Module
    MatButtonModule, // Angular Material Button Module
    RouterModule, // Import RouterModule to enable routerLink functionality
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
