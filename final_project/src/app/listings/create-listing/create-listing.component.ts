

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ListingsService } from './listings.service';
// import { AuthService } from '../../auth.service';
// import { CommonModule } from '@angular/common';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatSelectModule } from '@angular/material/select';
// import { MatIconModule } from '@angular/material/icon';
// import { QuillModule } from 'ngx-quill';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-create-listing',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule, // Added to support Reactive Forms
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatCardModule,
//     MatSelectModule,
//     MatIconModule,
//     QuillModule,
//   ],
//   templateUrl: './create-listing.component.html',
//   styleUrls: ['./create-listing.component.css'],
// })
// export class CreateListingComponent implements OnInit {
//   listingForm: FormGroup; // Form group for the listing form
//   successMessage = ''; // Message displayed on successful listing creation or update
//   errorMessage = ''; // Message displayed in case of errors
//   userName = ''; // Name of the currently logged-in user
//   editing = false; // Whether we are editing a listing
//   listingId: string | null = null; // The ID of the listing being edited

//   constructor(
//     private fb: FormBuilder,
//     private listingsService: ListingsService,
//     private router: Router,
//     private authService: AuthService,
//     private route: ActivatedRoute // Inject ActivatedRoute to fetch query params

//   ) {
//     // Initialize the form
//     this.listingForm = this.fb.group({
//       name: ['', [Validators.required]],
//       price: ['', [Validators.required, Validators.min(0)]],
//       description: ['', [Validators.required]], // Quill editor for rich text description
//       type: ['', [Validators.required]],
//       category: ['', [Validators.required]],
//     });
//   }

//   // ngOnInit(): void {
//   //   // Fetch the logged-in user's name from session storage
//   //   const user = this.authService.getUser();
//   //   this.userName = user?.name || 'Unknown User';

//   //   // Check if we are editing an existing listing
//   //   const navigation = this.router.getCurrentNavigation();
//   //   const state = navigation?.extras.state as { listing: any };

//   //   if (state?.listing) {
//   //     console.log('Received listing for editing:', state?.listing);
//   //     this.editing = true; // Editing mode
//   //     this.listingId = state.listing._id; // Store listing ID
//   //     this.listingForm.patchValue(state.listing); // Pre-fill the form with listing data
//   //     console.log('Form values after patchValue:', this.listingForm.value);
//   //   }else {
//   //     console.error('No listing data found in navigation state'); // Debug log
//   //     this.errorMessage = 'No listing data found. Redirecting to dashboard.';
//   //     setTimeout(() => {
//   //       this.router.navigate(['/dashboard']);
//   //     }, 1500); // Redirect to dashboard
//   //   }
//   //   console.log('Received listing for editing:', state?.listing);
//   // }


//   ngOnInit(): void {
//     // Fetch the logged-in user's name
//     const user = this.authService.getUser();
//     this.userName = user?.name || 'Unknown User';

//     // Get listing ID from query params
//     this.route.queryParams.subscribe(async (params) => {
//       const listingId = params['id'];
//       if (listingId) {
//         this.editing = true;
//         this.listingId = listingId;

//         // Fetch the listing from API
//         try {
//           // const listing = await this.listingsService.getListingById(listingId);
//           // if (listing) {
//           //   this.listingForm.patchValue(listing); // Pre-fill the form
//           //   console.log('Form values after patchValue:', this.listingForm.value);
//           // }


//           const response = await this.listingsService.getListingById(listingId);
//         const listing = response.data; // Adjust this to match the API's structure
//         this.listingForm.patchValue({
//           name: listing.name || '',
//           price: listing.price || '',
//           description: listing.description || '',
//           type: listing.type || '',
//           category: listing.category || '',
//         });
//         console.log('Form values after patchValue:', this.listingForm.value);
//         } catch (error) {
//           console.error('Error fetching listing:', error);
//           this.errorMessage = 'Failed to fetch listing details.';
//         }
//       }
//     });
//   }

//   async onSubmit(): Promise<void> {
//     if (this.listingForm.valid) {
//       const formData = { ...this.listingForm.value };

//       // Sanitize the description to remove unwanted HTML tags and entities
//       formData.description = formData.description
//         .replace(/<[^>]+>/g, '') // Remove HTML tags
//         .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces with regular spaces
//         .trim(); // Trim excess whitespace

//       // Attach the logged-in user's name as the creator (if creating a new listing)
//       if (!this.editing) {
//         formData.createdBy = this.userName;
//       }

//       try {
//         if (this.editing && this.listingId) {
//           // Update the listing
//           await this.listingsService.updateListing(this.listingId, formData);
//           this.successMessage = 'Listing updated successfully!';
//         } else {
//           // Create a new listing
//           await this.listingsService.createListing(formData);
//           this.successMessage = 'Listing created successfully!';
//         }

//         // Redirect to the dashboard after showing the success message
//         setTimeout(() => {
//           this.router.navigate(['/dashboard']);
//         }, 1500);
//       } catch (error) {
//         console.error('Error saving listing:', error);
//         this.errorMessage = this.editing
//           ? 'Failed to update listing. Please try again later.'
//           : 'Failed to create listing. Please try again later.';
//       }
//     } else {
//       this.errorMessage = 'Please fill in all required fields.';
//     }
//   }
// }


















import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListingsService } from './listings.service';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';
import { CategoryService } from '../../shared/category.service';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    QuillModule,
  ],
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css'],
})
export class CreateListingComponent implements OnInit {
  @Output() newCategoryAdded = new EventEmitter<string>(); // Event to notify when a new category is added
  listingForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  userName = '';
  editing = false;
  listingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private listingsService: ListingsService,
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.listingForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userName = user?.name || 'Unknown User';

    // Check for editing mode via query params
    this.route.queryParams.subscribe(async (params) => {
      const listingId = params['id'];
      if (listingId) {
        this.editing = true;
        this.listingId = listingId;

        try {
          const response = await this.listingsService.getListingById(listingId);
          const listing = response.data;
          this.listingForm.patchValue({
            name: listing.name || '',
            price: listing.price || '',
            description: listing.description || '',
            type: listing.type || '',
            category: listing.category || '',
          });
        } catch (error) {
          console.error('Error fetching listing:', error);
          this.errorMessage = 'Failed to fetch listing details.';
        }
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.listingForm.valid) {
      const formData = { ...this.listingForm.value };
      formData.description = formData.description
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim();

      if (!this.editing) {
        formData.createdBy = this.userName;
      }

      try {
        if (this.editing && this.listingId) {
          await this.listingsService.updateListing(this.listingId, formData);
          this.successMessage = 'Listing updated successfully!';
        } else {
          await this.listingsService.createListing(formData);
          this.successMessage = 'Listing created successfully!';

          // Emit the new category if it's not already included
          this.categoryService.addCategory(formData.category); // Add category to the service
          this.newCategoryAdded.emit(formData.category);
        }

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      } catch (error) {
        console.error('Error saving listing:', error);
        this.errorMessage = this.editing
          ? 'Failed to update listing. Please try again later.'
          : 'Failed to create listing. Please try again later.';
      }
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
