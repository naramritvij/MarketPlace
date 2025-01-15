
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ListingsService } from '../listings/create-listing/listings.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-listing-details',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     MatButtonModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     FormsModule,
//   ],
//   templateUrl: './listing-details.component.html',
//   styleUrls: ['./listing-details.component.css'],
// })
// export class ListingDetailsComponent implements OnInit {
//   listing: any; // To store listing details
//   reviews: any[] = []; // To store reviews for the listing
//   newReview = { comment: '', rating: 0 }; // Model for the review form
//   errorMessage = ''; // To display error messages if fetching fails
//   isAuthenticated = false; // Track if the user is authenticated
//   isCreator = false; // Track if the user is the creator of the listing
//   isLoading = true; // Track if reviews are still loading
//   authToken: string = ''; // Authentication token
//   userId: string = ''; // Dynamically fetched logged-in user's ID
//   userName: string = ''; // Dynamically fetched logged-in user's name

//   constructor(
//     private route: ActivatedRoute,
//     private listingsService: ListingsService,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {}

//   async ngOnInit(): Promise<void> {
//     this.authToken = localStorage.getItem('authToken') || '';
//     this.userId = localStorage.getItem('userId') || '';
//     this.userName = localStorage.getItem('userName') || 'Unknown User';
//     this.isAuthenticated = !!this.authToken;

//     this.route.params.subscribe(async (params) => {
//       const listingId = params['id'];
//       if (listingId) {
//         await this.fetchListingDetails(listingId);
//         await this.fetchReviews(listingId);
//       }
//     });
//   }

//   // Fetch listing details
//   async fetchListingDetails(listingId: string): Promise<void> {
//     try {
//       const response = await this.listingsService.getListingById(listingId);
//       this.listing = response.data;

//       // Check if the logged-in user is the creator of the listing
//       this.isCreator = this.listing.createdBy === this.userName;
//     } catch (error) {
//       console.error('Error fetching listing details:', error);
//       this.errorMessage = 'Failed to fetch listing details. Please try again later.';
//     }
//   }

//   // Fetch reviews for the listing
//   async fetchReviews(listingId: string): Promise<void> {
//     this.isLoading = true;
//     try {
//       const reviewsResponse = await fetch(
//         'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newreview',
//         {
//           method: 'GET',
//           headers: { Authorization: `${this.authToken}` },
//         }
//       );

//       const reviewsData = await reviewsResponse.json();
//       if (reviewsResponse.ok && reviewsData.status === 'success') {
//         this.reviews = reviewsData.data.filter((review: any) => review.listingId === listingId);
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     } finally {
//       this.isLoading = false;
//     }
//   }

//   // Add a new review
//   async addReview(): Promise<void> {
//     const reviewData = {
//       listingId: this.listing._id,
//       userId: this.userId,
//       userName: this.userName,
//       comment: this.newReview.comment,
//       rating: this.newReview.rating,
//     };

//     try {
//       const response = await fetch(
//         'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/newreview',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `${this.authToken}`,
//           },
//           body: JSON.stringify(reviewData),
//         }
//       );

//       const newReview = await response.json();
//       if (response.ok && newReview.status === 'success') {
//         await this.fetchReviews(this.listing._id);
//         this.snackBar.open(
//           `Thank you, ${this.userName}, your review has been submitted!`,
//           'Close',
//           { duration: 3000 }
//         );
//         this.newReview = { comment: '', rating: 0 };
//       } else {
//         console.error('Failed to add review:', newReview);
//       }
//     } catch (error) {
//       console.error('Error adding review:', error);
//     }
//   }

//   // Open reply form for a specific review
//   openReplyForm(reviewId: string): void {
//     const replyText = prompt('Enter your reply:');
//     if (replyText) {
//       this.replyToReview(reviewId, replyText);
//     }
//   }

//   // Handle reply submission
//   async replyToReview(reviewId: string, replyText: string): Promise<void> {
//     const payload = {
//       reviewId,
//       listingId: this.listing._id,
//       replyText: replyText,
//       replyBy: this.userName,
//     };

//     try {
//       const response = await fetch(
//         'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/replies',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `${this.authToken}`,
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const updatedReply = await response.json();
//       if (response.ok && updatedReply.status === 'success') {
//         const review = this.reviews.find((r) => r._id === reviewId);
//         if (review) review.reply = replyText;

//         this.snackBar.open('Reply added successfully!', 'Close', { duration: 3000 });
//       } else {
//         console.error('Failed to add reply:', updatedReply);
//       }
//     } catch (error) {
//       console.error('Error replying to review:', error);
//     }
//   }

//   // Redirect to the order page
//   redirectToOrder(): void {
//     if (this.isCreator) {
//       this.snackBar.open('You cannot buy your own listing.', 'Close', { duration: 3000 });
//       return;
//     }

//     localStorage.setItem('selectedListing', JSON.stringify(this.listing));
//     this.router.navigate(['/order-form']);
//   }

//   // Navigate back to the dashboard
//   goBack(): void {
//     this.router.navigate(['/dashboard']);
//   }
// }




















import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../listings/create-listing/listings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css'],
})
export class ListingDetailsComponent implements OnInit {
  listing: any; // To store listing details
  reviews: any[] = []; // To store reviews for the listing
  replies: any[] = []; // To store replies for the listing
  newReview = { comment: '', rating: 0 }; // Model for the review form
  errorMessage = ''; // To display error messages if fetching fails
  isAuthenticated = false; // Track if the user is authenticated
  isCreator = false; // Track if the user is the creator of the listing
  isLoading = true; // Track if reviews are still loading
  authToken: string = ''; // Authentication token
  userId: string = ''; // Dynamically fetched logged-in user's ID
  userName: string = ''; // Dynamically fetched logged-in user's name

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.authToken = localStorage.getItem('authToken') || '';
    this.userId = localStorage.getItem('userId') || '';
    this.userName = localStorage.getItem('userName') || 'Unknown User';
    this.isAuthenticated = !!this.authToken;

    this.route.params.subscribe(async (params) => {
      const listingId = params['id'];
      if (listingId) {
        await this.fetchListingDetails(listingId);
        await this.fetchReviewsAndReplies(listingId);
      }
    });
  }

  // Fetch listing details
  async fetchListingDetails(listingId: string): Promise<void> {
    try {
      const response = await this.listingsService.getListingById(listingId);
      this.listing = response.data;

      // Check if the logged-in user is the creator of the listing
      this.isCreator = this.listing.createdBy === this.userName;
    } catch (error) {
      console.error('Error fetching listing details:', error);
      this.errorMessage = 'Failed to fetch listing details. Please try again later.';
    }
  }

  // Fetch reviews and their replies for the listing
  // async fetchReviewsAndReplies(listingId: string): Promise<void> {
  //   this.isLoading = true;
  //   try {
  //     // Fetch reviews
  //     const reviewsResponse = await fetch(
  //       'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newreview',
  //       {
  //         method: 'GET',
  //         headers: { Authorization: `${this.authToken}` },
  //       }
  //     );
  //     const reviewsData = await reviewsResponse.json();

  //     // Fetch replies
  //     const repliesResponse = await fetch(
  //       'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/replies',
  //       {
  //         method: 'GET',
  //         headers: { Authorization: `${this.authToken}` },
  //       }
  //     );
  //     const repliesData = await repliesResponse.json();

  //     if (reviewsResponse.ok && repliesResponse.ok) {
  //       // Filter reviews and replies for the specific listing
  //       const filteredReviews = reviewsData.filter((review: any) => review.listingId === listingId);
  //       const filteredReplies = repliesData.filter((reply: any) => reply.listingId === listingId);

  //       // Merge replies into their respective reviews
  //       filteredReviews.forEach((review: any) => {
  //         review.replies = filteredReplies.filter((reply: any) => reply.reviewId === review._id);
  //       });

  //       this.reviews = filteredReviews;
  //     }
  //   } catch (error) {
  //     console.error('Error fetching reviews and replies:', error);
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }



// Fetch reviews and their replies for the listing
async fetchReviewsAndReplies(listingId: string): Promise<void> {
  this.isLoading = true;
  try {
    // Fetch reviews
    const reviewsResponse = await fetch(
      'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newreview',
      {
        method: 'GET',
        headers: { Authorization: `${this.authToken}` },
      }
    );

    const reviewsData = await reviewsResponse.json();

    // Ensure reviewsData contains the "data" array
    const reviewsArray = Array.isArray(reviewsData.data) ? reviewsData.data : [];

    // Filter reviews by listingId
    const filteredReviews = reviewsArray.filter(
      (review: any) => review.listingId === listingId
    );

    // Fetch replies
    const repliesResponse = await fetch(
      'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/replies',
      {
        method: 'GET',
        headers: { Authorization: `${this.authToken}` },
      }
    );

    const repliesData = await repliesResponse.json();

    // Ensure repliesData contains the "data" array
    const repliesArray = Array.isArray(repliesData.data) ? repliesData.data : [];

    // Filter replies by listingId
    const filteredReplies = repliesArray.filter(
      (reply: any) => reply.listingId === listingId
    );

    // Merge replies into their respective reviews
    filteredReviews.forEach((review: any) => {
      review.replies = filteredReplies.filter(
        (reply: any) => reply.reviewId === review._id
      );
    });

    this.reviews = filteredReviews; // Update the reviews list with replies
  } catch (error) {
    console.error('Error fetching reviews and replies:', error);
  } finally {
    this.isLoading = false;
  }
}



  // Add a new review
  async addReview(): Promise<void> {
    const reviewData = {
      listingId: this.listing._id,
      userId: this.userId,
      userName: this.userName,
      comment: this.newReview.comment,
      rating: this.newReview.rating,
    };

    try {
      const response = await fetch(
        'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/newreview',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${this.authToken}`,
          },
          body: JSON.stringify(reviewData),
        }
      );

      const newReview = await response.json();
      if (response.ok && newReview.status === 'success') {
        await this.fetchReviewsAndReplies(this.listing._id);
        this.snackBar.open(
          `Thank you, ${this.userName}, your review has been submitted!`,
          'Close',
          { duration: 3000 }
        );
        this.newReview = { comment: '', rating: 0 };
      } else {
        console.error('Failed to add review:', newReview);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  }

  // Add a reply to a review
  async replyToReview(reviewId: string, replyText: string): Promise<void> {
    const payload = {
      reviewId,
      listingId: this.listing._id,
      replyText,
      replyBy: this.userName,
    };

    try {
      const response = await fetch(
        'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/replies',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${this.authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const updatedReply = await response.json();
      if (response.ok && updatedReply.status === 'success') {
        await this.fetchReviewsAndReplies(this.listing._id);
        this.snackBar.open('Reply added successfully!', 'Close', { duration: 3000 });
      } else {
        console.error('Failed to add reply:', updatedReply);
      }
    } catch (error) {
      console.error('Error replying to review:', error);
    }
  }

  // Redirect to the order page
  redirectToOrder(): void {
    if (this.isCreator) {
      this.snackBar.open('You cannot buy your own listing.', 'Close', { duration: 3000 });
      return;
    }

    localStorage.setItem('selectedListing', JSON.stringify(this.listing));
    this.router.navigate(['/order-form']);
  }

  // Navigate back to the dashboard
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
