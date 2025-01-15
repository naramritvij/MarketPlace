
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-order-form',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatButtonModule,
//     FormsModule,
//   ],
//   templateUrl: './order-form.component.html',
//   styleUrls: ['./order-form.component.css'],
// })
// export class OrderFormComponent implements OnInit {
//   name: string = ''; // Buyer's name
//   address: string = ''; // Buyer's address
//   phoneNumber: string = ''; // Buyer's phone number
//   paymentOption: string = ''; // Payment method
//   cardDetails = {
//     cardNumber: '',
//     securityCode: '',
//     expiryMonth: '',
//     expiryYear: '',
//   }; // Card details for card payments
//   listing: any = null; // Listing details (to be fetched from localStorage)
//   isSubmitting: boolean = false; // To track form submission status
//   authToken: string = ''; // Authorization token

//   constructor(private router: Router, private snackBar: MatSnackBar) {}

//   ngOnInit(): void {
//     // Retrieve the authorization token
//     this.authToken = localStorage.getItem('authToken') || '';
//     if (!this.authToken) {
//       this.snackBar.open('Authentication required. Redirecting to login.', 'Close', {
//         duration: 3000,
//       });
//       this.router.navigate(['/login']);
//       return;
//     }

//     // Retrieve the selected listing details from localStorage
//     const storedListing = localStorage.getItem('selectedListing');
//     if (storedListing) {
//       this.listing = JSON.parse(storedListing);
//     } else {
//       this.snackBar.open('No listing selected. Redirecting to dashboard.', 'Close', {
//         duration: 3000,
//       });
//       this.router.navigate(['/dashboard']);
//     }
//   }

//   async placeOrder(): Promise<void> {
//     // Prevent multiple submissions
//     if (this.isSubmitting) return;

//     // Validate phone number
//     if (!this.validatePhoneNumber()) {
//       this.snackBar.open('Phone number must be exactly 10 digits.', 'Close', { duration: 3000 });
//       return;
//     }

//     // Validate card details if payment option is card
//     if (this.paymentOption === 'card' && !this.validateCardDetails()) {
//       this.snackBar.open('Please fill all card details correctly.', 'Close', { duration: 3000 });
//       return;
//     }

//     // Prepare order data
//     const orderData = {
//       listingId: this.listing._id, // ID of the listing
//       listingName: this.listing.name, // Name of the listing
//       buyerId: localStorage.getItem('userId'), // Logged-in user's ID (buyer)
//       buyerName: localStorage.getItem('userName'), // Logged-in user's name (buyer)
//       sellerId: this.listing.createdById, // Seller's ID (from listing details)
//       sellerName: this.listing.createdByName, // Seller's name (from listing details)
//       paymentMethod: this.paymentOption, // Payment option selected
//       address: this.address, // Buyer's address
//       phoneNumber: this.phoneNumber, // Buyer's phone number
//       paymentDetails: this.paymentOption === 'card' ? this.cardDetails : null, // Card details if card payment
//     };

//     this.isSubmitting = true; // Mark submission as in-progress
//     try {
//       const response = await fetch(
//         'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/neworder',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `${this.authToken}`,
//           },
//           body: JSON.stringify(orderData),
//         }
//       );

//       const result = await response.json();
//       if (response.ok && result.status === 'success') {
//         this.snackBar.open('Order placed successfully.', 'Close', { duration: 3000 });

//         // Mark listing as sold
//         this.listing.sold = true;
//         localStorage.removeItem('selectedListing'); // Clear selected listing from storage
//         this.router.navigate(['/dashboard']); // Redirect to dashboard
//       } else {
//         this.snackBar.open(result.message || 'Failed to place order. Please try again.', 'Close', {
//           duration: 3000,
//         });
//       }
//     } catch (error) {
//       console.error('Error placing order:', error);
//       this.snackBar.open('An error occurred. Please try again.', 'Close', { duration: 3000 });
//     } finally {
//       this.isSubmitting = false; // Reset submission state
//     }
//   }

//   validatePhoneNumber(): boolean {
//     // Ensure phone number is exactly 10 digits
//     return /^\d{10}$/.test(this.phoneNumber);
//   }

//   validateCardDetails(): boolean {
//     // Validate card details (card number, security code, expiry month and year)
//     const isCardNumberValid = /^\d{16}$/.test(this.cardDetails.cardNumber);
//     const isSecurityCodeValid = /^\d{3}$/.test(this.cardDetails.securityCode);
//     const isExpiryMonthValid = this.cardDetails.expiryMonth.length > 0;
//     const isExpiryYearValid = this.cardDetails.expiryYear.length > 0;

//     return isCardNumberValid && isSecurityCodeValid && isExpiryMonthValid && isExpiryYearValid;
//   }
// }
























import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  name: string = ''; // Buyer's name
  address: string = ''; // Buyer's address
  phoneNumber: string = ''; // Buyer's phone number
  paymentOption: string = ''; // Payment method
  cardDetails = {
    cardNumber: '',
    securityCode: '',
    expiryMonth: '',
    expiryYear: '',
  }; // Card details for card payments
  listing: any = null; // Listing details (to be fetched from localStorage)
  isSubmitting: boolean = false; // To track form submission status
  authToken: string = ''; // Authorization token

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Retrieve the authorization token
    this.authToken = localStorage.getItem('authToken') || '';
    if (!this.authToken) {
      this.snackBar.open('Authentication required. Redirecting to login.', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['/login']);
      return;
    }

    // Retrieve the selected listing details from localStorage
    const storedListing = localStorage.getItem('selectedListing');
    if (storedListing) {
      this.listing = JSON.parse(storedListing);
    } else {
      this.snackBar.open('No listing selected. Redirecting to dashboard.', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['/dashboard']);
    }
  }

  async placeOrder(): Promise<void> {
    // Prevent multiple submissions
    if (this.isSubmitting) return;

    // Validate phone number
    if (!this.validatePhoneNumber()) {
      this.snackBar.open('Phone number must be exactly 10 digits.', 'Close', { duration: 3000 });
      return;
    }

    // Validate card details if payment option is card
    if (this.paymentOption === 'card' && !this.validateCardDetails()) {
      this.snackBar.open('Please fill all card details correctly.', 'Close', { duration: 3000 });
      return;
    }

    // Prepare order data
    const orderData = {
      listingId: this.listing._id, // ID of the listing
      listingName: this.listing.name, // Name of the listing
      buyerId: localStorage.getItem('userId'), // Logged-in user's ID (buyer)
      buyerName: localStorage.getItem('userName'), // Logged-in user's name (buyer)
      sellerId: this.listing.createdById, // Seller's ID (from listing details)
      sellerName: this.listing.createdBy, // Seller's name (from listing details)
      paymentMethod: this.paymentOption, // Payment option selected
      address: this.address, // Buyer's address
      phoneNumber: this.phoneNumber, // Buyer's phone number
      paymentDetails: this.paymentOption === 'card' ? this.cardDetails : null, // Card details if card payment
    };

    this.isSubmitting = true; // Mark submission as in-progress
    try {
      const response = await fetch(
        'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/neworder',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${this.authToken}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();
      if (response.ok && result.status === 'success') {
        this.snackBar.open('Order placed successfully.', 'Close', { duration: 3000 });

        // Mark listing as sold
        this.listing.sold = true;
        localStorage.removeItem('selectedListing'); // Clear selected listing from storage
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      } else {
        this.snackBar.open(result.message || 'Failed to place order. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      this.snackBar.open('An error occurred. Please try again.', 'Close', { duration: 3000 });
    } finally {
      this.isSubmitting = false; // Reset submission state
    }
  }

  validatePhoneNumber(): boolean {
    // Ensure phone number is exactly 10 digits
    return /^\d{10}$/.test(this.phoneNumber);
  }

  validateCardDetails(): boolean {
    // Validate card details (card number, security code, expiry month and year)
    const isCardNumberValid = /^\d{16}$/.test(this.cardDetails.cardNumber);
    const isSecurityCodeValid = /^\d{3}$/.test(this.cardDetails.securityCode);
    const isExpiryMonthValid = this.cardDetails.expiryMonth.length > 0;
    const isExpiryYearValid = this.cardDetails.expiryYear.length > 0;

    return isCardNumberValid && isSecurityCodeValid && isExpiryMonthValid && isExpiryYearValid;
  }
}
