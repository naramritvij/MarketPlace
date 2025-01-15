




import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
 // private baseUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document';
  // Authorization token
  private authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';

  constructor() {}

  /**
   * Fetch all listings from the API
   * @returns {Promise<any[]>} Array of listings
   */
  async getAllListings(): Promise<{data: any[]}> {
    try {

      console.log('Auth Token:', this.authToken);
    const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newlisting', {
      method: 'GET',
      headers: {
        //'Content-Type': 'application/json',
        Authorization: `${this.authToken}`,
      },
    });


    console.log('Response:', response);

    if (!response.ok) {
      const errorMessage = await response.text();
    console.error('Error details:', errorMessage);
      throw new Error(`Error fetching listings: ${response.statusText}`);
    }

    const data = await response.json();
      console.log('Fetched Listings:', data);
      return data;

    //return await response.json();

  } catch (error) {
    console.error('Unexpected error in getAllListings:', error);
    throw error;
  }
  }

  // /**
  //  * Create a new listing
  //  * @param {any} data Listing data to be sent to the API
  //  * @returns {Promise<any>} Response data from the API
  //  */
  async createListing(data: any): Promise<any> {
    const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/newlisting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.authToken}`,
      },
      body: JSON.stringify(data),
    });

    console.log('Response:', response);

    if (!response.ok) {
      throw new Error(`Error creating listing: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Delete a listing by its ID
   * @param {string} listingId ID of the listing to delete
   * @returns {Promise<void>} No return value
   */
  async deleteListing(listingId: string): Promise<void> {
    const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/newlisting/${listingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting listing: ${response.statusText}`);
    }
  }

  /**
   * Update an existing listing
   * @param {string} listingId ID of the listing to update
   * @param {any} data Updated listing data
   * @returns {Promise<any>} Updated listing data
   */
  async updateListing(listingId: string, data: any): Promise<any> {
    const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/newlisting/${listingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.authToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error updating listing: ${response.statusText}`);
    }

    return await response.json();
  }





  /**
 * Fetch a listing by its ID
 * @param {string} listingId - The ID of the listing to fetch
 * @returns {Promise<any>} The listing data
 */
async getListingById(listingId: string): Promise<any> {
  try {
    const response = await fetch(
      `https://smooth-comfort-405104.uc.r.appspot.com/document/findOne/newlisting/${listingId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${this.authToken}`,
        },
      }
    );

    console.log('Response:', response);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error fetching listing: ${errorMessage}`);
    }

    const data = await response.json();
    console.log('Fetched Listing:', data);
    return data; // Return the fetched listing
  } catch (error) {
    console.error('Unexpected error in getListingById:', error);
    throw error;
  }
}


}








