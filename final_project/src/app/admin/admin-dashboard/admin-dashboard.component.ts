

// import { Component, OnInit, ViewChild } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';

// @Component({
//   selector: 'app-admin-dashboard',
//   standalone: true,
//   imports: [
//     MatTableModule,
//     MatPaginatorModule,
//     MatSortModule,
//     CommonModule,
//     MatButtonModule,
//     MatSnackBarModule,
//   ],
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.css'],
// })
// export class AdminDashboardComponent implements OnInit {
//   adminName: string | null = localStorage.getItem('adminName');
//   users: User[] = [];
//   orders: Order[] = [];
//   allListings: Listing[] = [];
//   orderDataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>();
//   usersWithListings: UserWithListings[] = [];

//   displayedOrderColumns: string[] = [
//     'orderId',
//     'name',
//     'createdBy',
//     'purchasedBy',
//     'amount',
//     'dateTime',
//     'status',
//   ];

//   displayedListingsColumns: string[] = ['id', 'title', 'description', 'createdBy'];

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   // API Endpoints
//   private fetchUsersUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers';
//   private fetchOrdersUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/neworder';
//   private fetchListingsUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newlisting';
//   private deleteListingUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/newlisting';

//   private authKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';

//   constructor(private router: Router, private snackBar: MatSnackBar) {}

//   ngOnInit(): void {
//     this.fetchUsers();
//     this.fetchOrderDetails();
//     this.fetchUsersWithListings();
//     this.fetchAllListings(); // Fetch all listings for the Admin Dashboard
//   }

//   // Fetch all listings
//   async fetchAllListings(): Promise<void> {
//     try {
//       const response = await fetch(this.fetchListingsUrl, {
//         method: 'GET',
//         headers: {
//           Authorization: this.authKey,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.status === 'success') {
//           this.allListings = data.data.map((listing: any) => ({
//             id: listing._id || 'Unknown ID',
//             title: listing.name || 'No Title',
//             description: listing.description || 'No Description',
//             createdBy: listing.createdBy || 'Unknown Creator',
//           }));
//         } else {
//           this.handleError('Failed to fetch all listings.', data.message);
//         }
//       } else {
//         this.handleError('Failed to fetch all listings.', response.statusText);
//       }
//     } catch (error) {
//       this.handleError('An error occurred while fetching all listings.', error);
//     }
//   }

//   // Fetch the list of users
//   async fetchUsers(): Promise<void> {
//     try {
//       const response = await fetch(this.fetchUsersUrl, {
//         method: 'GET',
//         headers: {
//           Authorization: this.authKey,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         this.users = data?.data || [];
//       } else {
//         this.handleError('Failed to fetch users.', response.statusText);
//       }
//     } catch (error) {
//       this.handleError('An error occurred while fetching users.', error);
//     }
//   }

//   // Fetch users and their associated listings
//   async fetchUsersWithListings(): Promise<void> {
//     try {
//       const usersResponse = await fetch(this.fetchUsersUrl, {
//         method: 'GET',
//         headers: {
//           Authorization: this.authKey,
//         },
//       });

//       const listingsResponse = await fetch(this.fetchListingsUrl, {
//         method: 'GET',
//         headers: {
//           Authorization: this.authKey,
//         },
//       });

//       if (usersResponse.ok && listingsResponse.ok) {
//         const usersData = await usersResponse.json();
//         const listingsData = await listingsResponse.json();

//         // Map users with their corresponding listings
//         this.usersWithListings = usersData.data.map((user: any) => {
//           const userListings = listingsData.data.filter(
//             (listing: any) => listing.createdBy === user.email
//           );

//           return {
//             name: user.name || 'Unknown User',
//             email: user.email || 'Unknown Email',
//             listings: userListings.map((listing: any) => ({
//               id: listing._id || 'Unknown ID',
//               title: listing.name || 'No Title',
//               description: listing.description || 'No Description',
//             })),
//           };
//         });

//         // Ensure every user object has a `listings` property
//         this.usersWithListings.forEach((user) => {
//           if (!user.listings) {
//             user.listings = [];
//           }
//         });
//       } else {
//         this.handleError('Failed to fetch users or listings.');
//       }
//     } catch (error) {
//       this.handleError('An error occurred while fetching users with listings.', error);
//     }
//   }

//   // Fetch the list of orders and normalize with listing data
//   async fetchOrderDetails(): Promise<void> {
//     try {
//       const ordersResponse = await fetch(this.fetchOrdersUrl, {
//         method: 'GET',
//         headers: {
//           Authorization: this.authKey,
//         },
//       });

//       const listingsResponse = await fetch(this.fetchListingsUrl, {
//         method: 'GET',
//         headers: {
//           Authorization: this.authKey,
//         },
//       });

//       if (ordersResponse.ok && listingsResponse.ok) {
//         const ordersData = await ordersResponse.json();
//         const listingsData = await listingsResponse.json();

//         const listingsMap = new Map<string, { name: string; price: number }>();
//         listingsData.data.forEach((listing: any) => {
//           listingsMap.set(listing._id, { name: listing.name, price: listing.price });
//         });

//         this.orders = ordersData.data.map((order: any) => ({
//           orderId: order._id,
//           name: listingsMap.get(order.listingId)?.name || 'Unknown Item',
//           createdBy: order.sellerName || 'Unknown Seller',
//           purchasedBy: order.buyerName || 'Unknown Buyer',
//           amount: listingsMap.get(order.listingId)?.price ?? null,
//           dateTime: this.isValidDate(order.dateTime) ? order.dateTime : null,
//           status: 'Purchased',
//         }));

//         this.orderDataSource.data = this.orders;
//         this.orderDataSource.paginator = this.paginator;
//         this.orderDataSource.sort = this.sort;
//       } else {
//         this.handleError('Failed to fetch orders or listings.');
//       }
//     } catch (error) {
//       this.handleError('An error occurred while fetching order details.', error);
//     }
//   }

//   // Helper to validate date
//   private isValidDate(date: string | null | undefined): boolean {
//     return date ? !isNaN(Date.parse(date)) : false;
//   }

//   // Show notifications
//   private showNotification(message: string): void {
//     this.snackBar.open(message, 'Close', { duration: 3000 });
//   }

//   // Handle errors
//   private handleError(message: string, error?: unknown): void {
//     console.error(message, error || '');
//     this.showNotification(message);
//   }

//   // Logout function
//   logout() {
//     localStorage.removeItem('adminLoggedIn');
//     localStorage.removeItem('adminName');
//     this.router.navigate(['/admin-login']);
//   }
// }

// // Interfaces for Users, Orders, Listings, and User Listings
// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   isBlocked?: boolean;
// }

// interface Order {
//   orderId: string;
//   name: string;
//   createdBy: string;
//   purchasedBy: string;
//   amount: number | null;
//   dateTime: string | null;
//   status: string;
// }

// interface Listing {
//   id: string;
//   title: string;
//   description: string;
//   createdBy: string;
// }

// interface UserWithListings {
//   name: string;
//   email: string;
//   listings: { id: string; title: string; description: string }[];
// }












import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  adminName: string | null = localStorage.getItem('adminName');
  users: User[] = [];
  orders: Order[] = [];
  allListings: Listing[] = [];
  orderDataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  usersWithListings: UserWithListings[] = [];

  displayedOrderColumns: string[] = [
    'orderId',
    'name',
    'createdBy',
    'purchasedBy',
    'amount',
    'dateTime',
    'status',
  ];

  displayedListingsColumns: string[] = ['id', 'title', 'description', 'createdBy', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // API Endpoints
  private fetchUsersUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers';
  private fetchOrdersUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/neworder';
  private fetchListingsUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newlisting';
  private deleteListingUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/newlisting';

  private authKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchOrderDetails();
    this.fetchUsersWithListings();
    this.fetchAllListings(); // Fetch all listings for the Admin Dashboard
  }

  // Fetch all listings
  async fetchAllListings(): Promise<void> {
    try {
      const response = await fetch(this.fetchListingsUrl, {
        method: 'GET',
        headers: {
          Authorization: this.authKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          this.allListings = data.data.map((listing: any) => ({
            id: listing._id || 'Unknown ID',
            title: listing.name || 'No Title',
            description: listing.description || 'No Description',
            createdBy: listing.createdBy || 'Unknown Creator',
          }));
        } else {
          this.handleError('Failed to fetch all listings.', data.message);
        }
      } else {
        this.handleError('Failed to fetch all listings.', response.statusText);
      }
    } catch (error) {
      this.handleError('An error occurred while fetching all listings.', error);
    }
  }

  // Confirm deletion of a listing
  confirmDelete(listing: Listing): void {
    const confirmMessage = `Do you really want to delete the listing titled "${listing.title}" by "${listing.createdBy}"?`;
    if (confirm(confirmMessage)) {
      this.deleteListing(listing.id);
    }
  }

  // Delete a listing
  async deleteListing(listingId: string): Promise<void> {
    try {
      const response = await fetch(`${this.deleteListingUrl}/${listingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: this.authKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          this.allListings = this.allListings.filter((listing) => listing.id !== listingId);
          this.showNotification('Listing deleted successfully!');
        } else {
          this.handleError('Failed to delete listing.', data.message);
        }
      } else {
        this.handleError('Failed to delete listing.', response.statusText);
      }
    } catch (error) {
      this.handleError('An error occurred while deleting the listing.', error);
    }
  }

  // Fetch the list of users
  async fetchUsers(): Promise<void> {
    try {
      const response = await fetch(this.fetchUsersUrl, {
        method: 'GET',
        headers: {
          Authorization: this.authKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.users = data?.data || [];
      } else {
        this.handleError('Failed to fetch users.', response.statusText);
      }
    } catch (error) {
      this.handleError('An error occurred while fetching users.', error);
    }
  }

  // Fetch users and their associated listings
  async fetchUsersWithListings(): Promise<void> {
    try {
      const usersResponse = await fetch(this.fetchUsersUrl, {
        method: 'GET',
        headers: {
          Authorization: this.authKey,
        },
      });

      const listingsResponse = await fetch(this.fetchListingsUrl, {
        method: 'GET',
        headers: {
          Authorization: this.authKey,
        },
      });

      if (usersResponse.ok && listingsResponse.ok) {
        const usersData = await usersResponse.json();
        const listingsData = await listingsResponse.json();

        this.usersWithListings = usersData.data.map((user: any) => {
          const userListings = listingsData.data.filter(
            (listing: any) => listing.createdBy === user.email
          );

          return {
            name: user.name || 'Unknown User',
            email: user.email || 'Unknown Email',
            listings: userListings.map((listing: any) => ({
              id: listing._id || 'Unknown ID',
              title: listing.name || 'No Title',
              description: listing.description || 'No Description',
            })),
          };
        });
      } else {
        this.handleError('Failed to fetch users or listings.');
      }
    } catch (error) {
      this.handleError('An error occurred while fetching users with listings.', error);
    }
  }

  // Fetch the list of orders and normalize with listing data
  async fetchOrderDetails(): Promise<void> {
    try {
      const ordersResponse = await fetch(this.fetchOrdersUrl, {
        method: 'GET',
        headers: {
          Authorization: this.authKey,
        },
      });

      const listingsResponse = await fetch(this.fetchListingsUrl, {
        method: 'GET',
        headers: {
          Authorization: this.authKey,
        },
      });

      if (ordersResponse.ok && listingsResponse.ok) {
        const ordersData = await ordersResponse.json();
        const listingsData = await listingsResponse.json();

        const listingsMap = new Map<string, { name: string; price: number }>();
        listingsData.data.forEach((listing: any) => {
          listingsMap.set(listing._id, { name: listing.name, price: listing.price });
        });

        this.orders = ordersData.data.map((order: any) => ({
          orderId: order._id,
          name: listingsMap.get(order.listingId)?.name || 'Unknown Item',
          createdBy: order.sellerName || 'Unknown Seller',
          purchasedBy: order.buyerName || 'Unknown Buyer',
          amount: listingsMap.get(order.listingId)?.price ?? null,
          dateTime: this.isValidDate(order.dateTime) ? new Date(order.dateTime).toISOString() : new Date().toISOString(),
          status: 'Purchased',
        }));

        this.orderDataSource.data = this.orders;
        this.orderDataSource.paginator = this.paginator;
        this.orderDataSource.sort = this.sort;
      } else {
        this.handleError('Failed to fetch orders or listings.');
      }
    } catch (error) {
      this.handleError('An error occurred while fetching order details.', error);
    }
  }

  // Helper to validate date
  isValidDate(date: any): boolean {
    return !isNaN(Date.parse(date));
  }

  // Show notifications
  private showNotification(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  // Handle errors
  private handleError(message: string, error?: unknown): void {
    console.error(message, error || '');
    this.showNotification(message);
  }

  // Logout function
  logout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminName');
    this.router.navigate(['/admin-login']);
  }
}

// Interfaces for Users, Orders, Listings, and User Listings
interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked?: boolean;
}

interface Order {
  orderId: string;
  name: string;
  createdBy: string;
  purchasedBy: string;
  amount: number | null;
  dateTime: string | null;
  status: string;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  createdBy: string;
}

interface UserWithListings {
  name: string;
  email: string;
  listings: { id: string; title: string; description: string }[];
}
