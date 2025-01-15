import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-portal',
  standalone: true, // Mark as standalone
  imports: [RouterModule], // Ensure RouterModule is imported for routerLink
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css'],
})
export class AdminPortalComponent {}
