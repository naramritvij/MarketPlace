
















// import { Component, OnInit } from '@angular/core';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { PageEvent } from '@angular/material/paginator';
// import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { ListingsService } from '../listings/create-listing/listings.service';
// import { CategoryService } from '../shared/category.service';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatToolbarModule,
//     MatCardModule,
//     MatButtonModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatPaginatorModule,
//   ],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'],
// })
// export class DashboardComponent implements OnInit {
//   user: any; // Logged-in user details
//   listings: any[] = []; // Original list of all listings
//   filteredListings: any[] = []; // Filtered listings to display
//   paginatedListings: any[] = []; // Listings displayed for the current page
//   categories: string[] = []; // Dynamically updated categories
//   errorMessage: string = ''; // Error message for UI display
//   filterForm: FormGroup; // Form for filters
//   orders: any[] = []; // List of all orders to check sold listings
//   authToken: string = ''; // Authorization token
//   pageSize: number = 6; // Number of items per page
//   currentPage: number = 0; // Current page index

//   constructor(
//     private authService: AuthService,
//     private categoryService: CategoryService,
//     private listingsService: ListingsService,
//     private router: Router,
//     private fb: FormBuilder
//   ) {
//     this.filterForm = this.fb.group({
//       category: [''],
//       minPrice: [''],
//       maxPrice: [''],
//     });
//   }

//   async ngOnInit(): Promise<void> {
//     // Retrieve the logged-in user and authentication token
//     this.user = this.authService.getUser();
//     this.authToken = localStorage.getItem('authToken') || '';

//     // Redirect to login page if no user is logged in
//     if (!this.authToken) {
//       console.error('No session token found. Redirecting to login page.');
//       this.router.navigate(['/login']);
//       return;
//     }

//     try {
//       // Fetch listings and orders
//       this.categories = this.categoryService.getCategories();
//       await this.loadListings();
//       await this.loadOrders();
//       this.updateSoldStatus();
//       this.updatePaginatedListings(0, this.pageSize);
//     } catch (error) {
//       console.error('Initialization error:', error);
//       this.errorMessage = 'Failed to initialize dashboard. Please try again later.';
//     }
//   }

//   async loadListings(): Promise<void> {
//     try {
//       console.log('Fetching listings...');
//       const response = await this.listingsService.getAllListings();
//       console.log('API Response:', response);

//       this.listings = Array.isArray(response.data) ? response.data : [];
//       this.listings = this.listings.map((listing) => ({
//         ...listing,
//         description: this.formatText(listing.description || 'No description available.'),
//         createdBy: listing.createdBy || 'Unknown',
//         name: listing.name || 'Unnamed Product',
//         price: listing.price ?? 'N/A',
//         type: listing.type || 'N/A',
//         category: listing.category || 'N/A',
//         sold: false, // Default to not sold
//       }));
//       this.filteredListings = [...this.listings];

//       this.updateCategories();
//       this.categoryService.setCategories(this.categories);
//     } catch (error) {
//       console.error('Error fetching listings:', error);
//       this.errorMessage = 'Unable to fetch listings. Please try again later.';
//     }
//   }

//   async loadOrders(): Promise<void> {
//     try {
//       const response = await fetch(
//         'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/neworder',
//         {
//           method: 'GET',
//           headers: { Authorization: this.authToken },
//         }
//       );
//       const data = await response.json();
//       if (response.ok && data.status === 'success') {
//         this.orders = data.data;
//         console.log('Fetched Orders:', this.orders);
//       } else {
//         console.error('Failed to fetch orders:', data);
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   }

//   updateSoldStatus(): void {
//     // Mark listings as sold based on orders
//     this.listings.forEach((listing) => {
//       const isSold = this.orders.some((order) => order.listingId === listing._id);
//       listing.sold = isSold;
//     });
//     this.filteredListings = [...this.listings];
//     console.log('Updated Listings with Sold Status:', this.listings);
//   }

//   updateCategories(): void {
//     const allCategories = this.listings.map((listing) => listing.category || 'N/A');
//     this.categories = Array.from(new Set(allCategories)).filter((category) => category !== 'N/A');
//     console.log('Updated Categories:', this.categories);
//   }

//   applyFilters(): void {
//     const { category, minPrice, maxPrice } = this.filterForm.value;

//     this.filteredListings = this.listings.filter((listing) => {
//       const matchesCategory = category ? listing.category === category : true;
//       const matchesMinPrice = minPrice ? listing.price >= +minPrice : true;
//       const matchesMaxPrice = maxPrice ? listing.price <= +maxPrice : true;

//       return matchesCategory && matchesMinPrice && matchesMaxPrice;
//     });
//     this.updatePaginatedListings(0, this.pageSize);
//   }

//   updatePaginatedListings(pageIndex: number, pageSize: number): void {
//     const startIndex = pageIndex * pageSize;
//     const endIndex = startIndex + pageSize;
//     this.paginatedListings = this.filteredListings.slice(startIndex, endIndex);
//   }

//   onPageChange(event: PageEvent): void {
//     this.currentPage = event.pageIndex;
//     this.pageSize = event.pageSize;
//     this.updatePaginatedListings(this.currentPage, this.pageSize);
//   }

//   navigateToCreateListing(): void {
//     this.router.navigate(['/create-listing']);
//   }

//   navigateToEditProfile(): void {
//     this.router.navigate(['/edit-profile']);
//   }

//   viewListingDetails(listing: any): void {
//     if (listing.sold) {
//       alert('This listing has been sold and is no longer available.');
//       return;
//     }
//     localStorage.setItem('selectedListing', JSON.stringify(listing));
//     this.router.navigate(['/listing-details', listing._id]);
//   }

//   editListing(listing: any): void {
//     if (!listing) {
//       console.error('No listing provided for editing');
//       return;
//     }
//     console.log('Navigating to edit listing:', listing);
//     this.router.navigate(['/create-listing'], { queryParams: { id: listing._id } });
//   }

//   async deleteListing(listingId: string): Promise<void> {
//     try {
//       const confirmation = confirm('Are you sure you want to delete this listing?');
//       if (!confirmation) return;

//       await this.listingsService.deleteListing(listingId);
//       this.listings = this.listings.filter((listing) => listing._id !== listingId);
//       this.filteredListings = [...this.listings];
//       this.updateCategories();
//     } catch (error) {
//       console.error('Error deleting listing:', error);
//       this.errorMessage = 'Failed to delete listing. Please try again later.';
//     }
//   }

//   formatPrice(price: any): string {
//     return typeof price === 'number' ? `$${price.toFixed(2)}` : 'N/A';
//   }

//   formatText(description: string): string {
//     if (!description) return 'No description available.';
//     const parser = new DOMParser();
//     const decodedString = parser.parseFromString(description, 'text/html').body.textContent || '';
//     return decodedString.replace(/\s+/g, ' ').trim();
//   }

//   // Added Logout Functionality
//   onLogout(): void {
//     const confirmLogout = confirm('Are you sure that you want to logout?');
//     if (confirmLogout) {
//       // Clear user session or token
//       localStorage.removeItem('authToken');
//       console.log('User logged out successfully.');

//       // Navigate to home page
//       this.router.navigate(['/']);
//     }
//   }
// }






















// import { Component, OnInit } from '@angular/core';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { PageEvent } from '@angular/material/paginator';
// import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { ListingsService } from '../listings/create-listing/listings.service';
// import { CategoryService } from '../shared/category.service';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatToolbarModule,
//     MatCardModule,
//     MatButtonModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatPaginatorModule,
//   ],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'],
// })
// export class DashboardComponent implements OnInit {
//   user: any; // Logged-in user details
//   listings: any[] = []; // Original list of all listings
//   filteredListings: any[] = []; // Filtered listings to display
//   paginatedListings: any[] = []; // Listings displayed for the current page
//   categories: string[] = []; // Dynamically updated categories
//   errorMessage: string = ''; // Error message for UI display
//   filterForm: FormGroup; // Form for filters
//   orders: any[] = []; // List of all orders to check sold listings
//   userOrders: any[] = []; // Orders specific to the logged-in user
//   authToken: string = ''; // Authorization token
//   pageSize: number = 6; // Number of items per page
//   currentPage: number = 0; // Current page index

//   constructor(
//     private authService: AuthService,
//     private categoryService: CategoryService,
//     private listingsService: ListingsService,
//     private router: Router,
//     private fb: FormBuilder
//   ) {
//     this.filterForm = this.fb.group({
//       category: [''],
//       minPrice: [''],
//       maxPrice: [''],
//     });
//   }

//   async ngOnInit(): Promise<void> {
//     // Retrieve the logged-in user and authentication token
//     this.user = this.authService.getUser();
//     this.authToken = localStorage.getItem('authToken') || '';

//     // Redirect to login page if no user is logged in
//     if (!this.authToken) {
//       console.error('No session token found. Redirecting to login page.');
//       this.router.navigate(['/login']);
//       return;
//     }

//     try {
//       // Fetch listings and orders
//       this.categories = this.categoryService.getCategories();
//       await this.loadListings();
//       await this.loadOrders();
//       this.filterUserOrders(); // Filter orders specific to the logged-in user
//       this.updateSoldStatus();
//       this.updatePaginatedListings(0, this.pageSize);
//     } catch (error) {
//       console.error('Initialization error:', error);
//       this.errorMessage = 'Failed to initialize dashboard. Please try again later.';
//     }
//   }

//   async loadListings(): Promise<void> {
//     try {
//       console.log('Fetching listings...');
//       const response = await this.listingsService.getAllListings();
//       console.log('API Response:', response);

//       this.listings = Array.isArray(response.data) ? response.data : [];
//       this.listings = this.listings.map((listing) => ({
//         ...listing,
//         description: this.formatText(listing.description || 'No description available.'),
//         createdBy: listing.createdBy || 'Unknown',
//         name: listing.name || 'Unnamed Product',
//         price: listing.price ?? 'N/A',
//         type: listing.type || 'N/A',
//         category: listing.category || 'N/A',
//         sold: false, // Default to not sold
//       }));
//       this.filteredListings = [...this.listings];

//       this.updateCategories();
//       this.categoryService.setCategories(this.categories);
//     } catch (error) {
//       console.error('Error fetching listings:', error);
//       this.errorMessage = 'Unable to fetch listings. Please try again later.';
//     }
//   }

//   async loadOrders(): Promise<void> {
//     try {
//       const response = await fetch(
//         'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/neworder',
//         {
//           method: 'GET',
//           headers: { Authorization: this.authToken },
//         }
//       );
//       const data = await response.json();
//       if (response.ok && data.status === 'success') {
//         this.orders = data.data;
//         console.log('Fetched Orders:', this.orders);
//       } else {
//         console.error('Failed to fetch orders:', data);
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   }

//   filterUserOrders(): void {
//     if (this.user && this.user._id) {
//       this.userOrders = this.orders.filter(order => order.buyerId === this.user._id);
//       console.log('User-specific Orders:', this.userOrders);
//     }
//   }

//   updateSoldStatus(): void {
//     // Mark listings as sold based on orders
//     this.listings.forEach((listing) => {
//       const isSold = this.orders.some((order) => order.listingId === listing._id);
//       listing.sold = isSold;
//     });
//     this.filteredListings = [...this.listings];
//     console.log('Updated Listings with Sold Status:', this.listings);
//   }

//   updateCategories(): void {
//     const allCategories = this.listings.map((listing) => listing.category || 'N/A');
//     this.categories = Array.from(new Set(allCategories)).filter((category) => category !== 'N/A');
//     console.log('Updated Categories:', this.categories);
//   }

//   applyFilters(): void {
//     const { category, minPrice, maxPrice } = this.filterForm.value;

//     this.filteredListings = this.listings.filter((listing) => {
//       const matchesCategory = category ? listing.category === category : true;
//       const matchesMinPrice = minPrice ? listing.price >= +minPrice : true;
//       const matchesMaxPrice = maxPrice ? listing.price <= +maxPrice : true;

//       return matchesCategory && matchesMinPrice && matchesMaxPrice;
//     });
//     this.updatePaginatedListings(0, this.pageSize);
//   }

//   updatePaginatedListings(pageIndex: number, pageSize: number): void {
//     const startIndex = pageIndex * pageSize;
//     const endIndex = startIndex + pageSize;
//     this.paginatedListings = this.filteredListings.slice(startIndex, endIndex);
//   }

//   onPageChange(event: PageEvent): void {
//     this.currentPage = event.pageIndex;
//     this.pageSize = event.pageSize;
//     this.updatePaginatedListings(this.currentPage, this.pageSize);
//   }

//   navigateToCreateListing(): void {
//     this.router.navigate(['/create-listing']);
//   }

//   navigateToEditProfile(): void {
//     this.router.navigate(['/edit-profile']);
//   }

//   viewListingDetails(listing: any): void {
//     if (listing.sold) {
//       alert('This listing has been sold and is no longer available.');
//       return;
//     }
//     localStorage.setItem('selectedListing', JSON.stringify(listing));
//     this.router.navigate(['/listing-details', listing._id]);
//   }

//   editListing(listing: any): void {
//     if (!listing) {
//       console.error('No listing provided for editing');
//       return;
//     }
//     console.log('Navigating to edit listing:', listing);
//     this.router.navigate(['/create-listing'], { queryParams: { id: listing._id } });
//   }

//   async deleteListing(listingId: string): Promise<void> {
//     try {
//       const confirmation = confirm('Are you sure you want to delete this listing?');
//       if (!confirmation) return;

//       await this.listingsService.deleteListing(listingId);
//       this.listings = this.listings.filter((listing) => listing._id !== listingId);
//       this.filteredListings = [...this.listings];
//       this.updateCategories();
//     } catch (error) {
//       console.error('Error deleting listing:', error);
//       this.errorMessage = 'Failed to delete listing. Please try again later.';
//     }
//   }

//   formatPrice(price: any): string {
//     return typeof price === 'number' ? `$${price.toFixed(2)}` : 'N/A';
//   }

//   formatText(description: string): string {
//     if (!description) return 'No description available.';
//     const parser = new DOMParser();
//     const decodedString = parser.parseFromString(description, 'text/html').body.textContent || '';
//     return decodedString.replace(/\s+/g, ' ').trim();
//   }

//   // Added Logout Functionality
//   onLogout(): void {
//     const confirmLogout = confirm('Are you sure that you want to logout?');
//     if (confirmLogout) {
//       // Clear user session or token
//       localStorage.removeItem('authToken');
//       console.log('User logged out successfully.');

//       // Navigate to home page
//       this.router.navigate(['/']);
//     }
//   }
// }


















import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ListingsService } from '../listings/create-listing/listings.service';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any; // Logged-in user details
  listings: any[] = []; // Original list of all listings
  filteredListings: any[] = []; // Filtered listings to display
  paginatedListings: any[] = []; // Listings displayed for the current page
  categories: string[] = []; // Dynamically updated categories
  errorMessage: string = ''; // Error message for UI display
  filterForm: FormGroup; // Form for filters
  orders: any[] = []; // List of all orders to check sold listings
  userOrders: any[] = []; // Orders specific to the logged-in user
  authToken: string = ''; // Authorization token
  pageSize: number = 6; // Number of items per page
  currentPage: number = 0; // Current page index
  users: any[] = []; // List of all users to check status

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private listingsService: ListingsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      category: [''],
      minPrice: [''],
      maxPrice: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    // Retrieve the logged-in user and authentication token
    this.user = this.authService.getUser();
    this.authToken = localStorage.getItem('authToken') || '';

    // Redirect to login page if no user is logged in
    if (!this.authToken) {
      console.error('No session token found. Redirecting to login page.');
      this.router.navigate(['/login']);
      return;
    }

    try {
      // Fetch listings, orders, and users
      await this.loadUsers();
      console.log('Fetched Users:', this.users);

      this.categories = this.categoryService.getCategories();
      await this.loadListings();
      await this.loadOrders();
      //await this.loadUsers();

      this.filterUserOrders(); // Filter orders specific to the logged-in user
      this.updateSoldStatus();
      this.updatePaginatedListings(0, this.pageSize);
    } catch (error) {
      console.error('Initialization error:', error);
      this.errorMessage = 'Failed to initialize dashboard. Please try again later.';
    }
  }

  // async loadListings(): Promise<void> {
  //   try {
  //     console.log('Fetching listings...');
  //     const response = await this.listingsService.getAllListings();
  //     console.log('API Response:', response);
  //     console.log('Fetched Listings:', response.data);

  //     this.listings = Array.isArray(response.data) ? response.data : [];
  //     this.listings = this.listings.map((listing) => {
  //       return {
  //         ...listing,
  //         description: this.formatText(listing.description || 'No description available.'),
  //         createdBy: listing.createdBy || 'Unknown',
  //         name: listing.name || 'Unnamed Product',
  //         price: listing.price ?? 'N/A',
  //         type: listing.type || 'N/A',
  //         category: listing.category || 'N/A',
  //         sold: false, // Default to not sold
  //         blocked: this.isOwnerBlocked(listing.createdBy), // Add blocked status
  //       };
  //     });
  //     this.filteredListings = [...this.listings];

  //     this.updateCategories();
  //     this.categoryService.setCategories(this.categories);
  //   } catch (error) {
  //     console.error('Error fetching listings:', error);
  //     this.errorMessage = 'Unable to fetch listings. Please try again later.';
  //   }
  // }



  // async loadListings(): Promise<void> {
  //   try {
  //     console.log('Fetching listings...');
  //     const response = await this.listingsService.getAllListings();
  //     console.log('API Response:', response);
  //     console.log('Fetched Listings:', response.data);

  //     this.listings = Array.isArray(response.data) ? response.data : [];
  //     this.listings = this.listings.map((listing) => {
  //       const blocked = this.isOwnerBlocked(listing.createdBy);

  //       // Log the details for debugging
  //       console.log('Checking listing ownership:', {
  //         createdBy: listing.createdBy,
  //         blocked: blocked,
  //       });

  //       return {
  //         ...listing,
  //         description: this.formatText(listing.description || 'No description available.'),
  //         createdBy: listing.createdBy || 'Unknown',
  //         name: listing.name || 'Unnamed Product',
  //         price: listing.price ?? 'N/A',
  //         type: listing.type || 'N/A',
  //         category: listing.category || 'N/A',
  //         sold: false, // Default to not sold
  //         blocked: blocked, // Add blocked status
  //       };
  //     });
  //     this.filteredListings = [...this.listings];

  //     this.updateCategories();
  //     this.categoryService.setCategories(this.categories);
  //   } catch (error) {
  //     console.error('Error fetching listings:', error);
  //     this.errorMessage = 'Unable to fetch listings. Please try again later.';
  //   }
  // }





  async loadListings(): Promise<void> {
    try {
      console.log('Fetching listings...');
      const response = await this.listingsService.getAllListings();
      console.log('API Response:', response);

      this.listings = Array.isArray(response.data) ? response.data : [];
      this.listings = this.listings.map((listing) => {
        const isBlocked = this.isOwnerBlocked(listing.createdBy); // Check if the owner is blocked
        console.log('Checking listing ownership:', {
          createdBy: listing.createdBy,
          isBlocked,
        }); // Debugging output for each listing
        return {
          ...listing,
          description: this.formatText(listing.description || 'No description available.'),
          createdBy: listing.createdBy || 'Unknown',
          name: listing.name || 'Unnamed Product',
          price: listing.price ?? 'N/A',
          type: listing.type || 'N/A',
          category: listing.category || 'N/A',
          sold: false, // Default to not sold
          blocked: isBlocked, // Add blocked status
        };
      });
      this.filteredListings = [...this.listings];

      this.updateCategories();
      this.categoryService.setCategories(this.categories);
    } catch (error) {
      console.error('Error fetching listings:', error);
      this.errorMessage = 'Unable to fetch listings. Please try again later.';
    }
  }






  async loadOrders(): Promise<void> {
    try {
      console.log('Fetching orders...');
      const response = await fetch(
        'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/neworder',
        {
          method: 'GET',
          headers: { Authorization: this.authToken },
        }
      );
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        this.orders = data.data;
        console.log('Fetched Orders:', this.orders);
      } else {
        console.error('Failed to fetch orders:', data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  async loadUsers(): Promise<void> {
    try {
      console.log('Fetching users...');
      const response = await fetch(
        'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers',
        {
          method: 'GET',
          headers: { Authorization: this.authToken },
        }
      );
      const responseData = await response.json();
      if (response.ok && responseData.status === 'success' && Array.isArray(responseData.data)) {
        this.users = responseData.data;
        console.log('Fetched Users:', this.users);
      } else {
        console.error('Failed to fetch users:', responseData);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  // filterUserOrders(): void {
  //   if (this.user && this.user._id) {
  //     this.userOrders = this.orders.filter(order => order.buyerId === this.user._id).map(order => ({
  //       ...order,
  //      // price: typeof order.price === 'number' ? order.price : 'N/A', // Validate price
  //      price: order.price ?? 'N/A', // Set fallback if price is undefined
  //     }));
  //     console.log('User-specific Orders:', this.userOrders);
  //   }
  // }


  filterUserOrders(): void {
    if (this.user && this.user._id) {
      this.userOrders = this.orders
        .filter(order => order.buyerId === this.user._id)
        .map(order => {
          // Find the matching listing using listingId
          const matchingListing = this.listings.find(listing => listing._id === order.listingId);
          return {
            ...order,
            price: matchingListing ? matchingListing.price : 'N/A', // Use price from listing
          };
        });
      console.log('Mapped User-specific Orders:', this.userOrders);
    }
  }


  updateSoldStatus(): void {
    // Mark listings as sold based on orders
    this.listings.forEach((listing) => {
      const isSold = this.orders.some((order) => order.listingId === listing._id);
      listing.sold = isSold;
    });
    this.filteredListings = [...this.listings];
    console.log('Updated Listings with Sold Status:', this.listings);
  }

  // isOwnerBlocked(createdBy: string): boolean {
  //   const user = this.users.find((user: any) => user.name === createdBy); // Compare by name
  //   console.log(`Checking if user is blocked:`, user);
  //   return user?.status === 'Blocked';
  // }

  // isOwnerBlocked(createdBy: string): boolean {
  //   // Normalize createdBy and user.name for comparison
  //   const user = this.users.find(
  //     (user: any) => user.name.trim().toLowerCase() === createdBy.trim().toLowerCase()
  //   );
  //   return user?.status === 'Blocked';
  // }


  // isOwnerBlocked(createdBy: string): boolean {
  //   const user = this.users.find((user: any) => user.name === createdBy); // Compare createdBy with user name
  //   if (!user) {
  //     console.log(`No user found for createdBy: ${createdBy}`);
  //     return false; // Return false if no matching user is found
  //   }
  //   console.log(`User found for createdBy: ${createdBy}`, { user });
  //   return user?.status === 'Blocked';
  // }






  isOwnerBlocked(createdBy: string): boolean {
    console.log('Checking owner block status:', { createdBy, users: this.users }); // Add debugging information
    const user = this.users.find((user: any) => user.name === createdBy); // Compare by name
    if (!user) {
      console.log(`No user found for createdBy: ${createdBy}`);
      return false; // Return false if no matching user is found
    }
    console.log(`User found for createdBy: ${createdBy}`, { user });
    return user?.status === 'Blocked';
  }




  updateCategories(): void {
    const allCategories = this.listings.map((listing) => listing.category || 'N/A');
    this.categories = Array.from(new Set(allCategories)).filter((category) => category !== 'N/A');
    console.log('Updated Categories:', this.categories);
  }

  applyFilters(): void {
    const { category, minPrice, maxPrice } = this.filterForm.value;

    this.filteredListings = this.listings.filter((listing) => {
      const matchesCategory = category ? listing.category === category : true;
      const matchesMinPrice = minPrice ? listing.price >= +minPrice : true;
      const matchesMaxPrice = maxPrice ? listing.price <= +maxPrice : true;

      return matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
    this.updatePaginatedListings(0, this.pageSize);
  }

  updatePaginatedListings(pageIndex: number, pageSize: number): void {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.paginatedListings = this.filteredListings.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedListings(this.currentPage, this.pageSize);
  }

  navigateToCreateListing(): void {
    this.router.navigate(['/create-listing']);
  }

  navigateToEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  viewListingDetails(listing: any): void {
    if (listing.blocked) {
      alert('This listing is unavailable because the owner is blocked.');
      return;
    }
    if (listing.sold) {
      alert('This listing has been sold and is no longer available.');
      return;
    }
    localStorage.setItem('selectedListing', JSON.stringify(listing));
    this.router.navigate(['/listing-details', listing._id]);
  }

  editListing(listing: any): void {
    if (!listing) {
      console.error('No listing provided for editing');
      return;
    }
    console.log('Navigating to edit listing:', listing);
    this.router.navigate(['/create-listing'], { queryParams: { id: listing._id } });
  }

  async deleteListing(listingId: string): Promise<void> {
    try {
      const confirmation = confirm('Are you sure you want to delete this listing?');
      if (!confirmation) return;

      await this.listingsService.deleteListing(listingId);
      this.listings = this.listings.filter((listing) => listing._id !== listingId);
      this.filteredListings = [...this.listings];
      this.updateCategories();
    } catch (error) {
      console.error('Error deleting listing:', error);
      this.errorMessage = 'Failed to delete listing. Please try again later.';
    }
  }

  // formatPrice(price: any): string {
  //   return typeof price === 'number' ? `$${price.toFixed(2)}` : 'N/A';
  // }

  // formatPrice(price: any): string {
  //   return price && typeof price === 'number' ? `$${price.toFixed(2)}` : 'price';
  // }

  formatPrice(price: any): string {
    if (typeof price === 'number') {
      return `$${price.toFixed(2)}`;
    }
    //return price === 'N/A' ? 'N/A' : 'Invalid Price';
    return price === 'N/A' || !price ? 'N/A' : 'Invalid Price';
  }


  formatText(description: string): string {
    if (!description) return 'No description available.';
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(description, 'text/html').body.textContent || '';
    return decodedString.replace(/\s+/g, ' ').trim();
  }

  // Added Logout Functionality
  onLogout(): void {
    const confirmLogout = confirm('Are you sure that you want to logout?');
    if (confirmLogout) {
      // Clear user session or token
      localStorage.removeItem('authToken');
      console.log('User logged out successfully.');

      // Navigate to home page
      this.router.navigate(['/']);
    }
  }
}
