import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { CreateListingComponent } from './listings/create-listing/create-listing.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { OrderFormComponent } from './order-form/order-form.component';

// Admin Components
import { AdminPortalComponent } from './admin/admin-portal/admin-portal.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

// Admin Auth Guard
import { AdminAuthGuard } from './guards/admin-auth.guard';



export const routes: Routes = [
  // User Routes
  { path: '', component: HomeComponent }, // Default route
  { path: 'login', component: LoginComponent }, // User Login page
  { path: 'register', component: RegisterComponent }, // User Registration page
  { path: 'forgot-password', component: ForgotPasswordComponent }, // Forgot Password
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protected route for authenticated users
  },
  {
    path: 'edit-profile',
    component: ProfileComponent,
    canActivate: [AuthGuard], // Protected route for authenticated users
  },
  {
    path: 'create-listing',
    component: CreateListingComponent,
    canActivate: [AuthGuard], // Protected route for creating a listing
  },
  {
    path: 'listing-details/:id', // Dynamic route for listing details
    component: ListingDetailsComponent,
    canActivate: [AuthGuard], // Protected route for authenticated users
  },
  {
    path: 'order-form', // Route for the order form
    component: OrderFormComponent,
    canActivate: [AuthGuard], // Protected route for authenticated users
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    //canActivate: [AuthGuard], // Accessible by Admin users
  },

  // Admin Routes
  { path: 'admin-portal', component: AdminPortalComponent }, // Admin Portal page
  { path: 'admin-login', component: AdminLoginComponent }, // Admin Login page
  { path: 'admin-register', component: AdminRegisterComponent }, // Admin Registration page
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard], // Protected route for admin users
  },

  // Fallback Route
  { path: '**', redirectTo: '' }, // Fallback for unknown routes
];
