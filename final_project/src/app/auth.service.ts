// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private userApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers';
//   private authToken =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';
//   private userKey = 'user'; // Key to store user data in sessionStorage

//   constructor() {}

//   /**
//    * Fetch all users from the API
//    * @returns {Promise<any[]>} Array of users
//    */
//   private async fetchUsers(): Promise<any[]> {
//     try {
//       const response = await fetch(this.userApiUrl, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `${this.authToken}`,
//         },
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         console.error('Fetch Users Error:', errorMessage);
//         throw new Error(`Failed to fetch users: ${response.statusText}`);
//       }

//       const data = await response.json();
//       return Array.isArray(data.data) ? data.data : [];
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       throw new Error('Unable to fetch users. Please try again later.');
//     }
//   }

//   /**
//    * Validate login credentials and log the user in
//    * @param email User email
//    * @param password User password
//    * @returns {Promise<{ success: boolean; message?: string }> }
//    */
//   async login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
//     try {
//       const users = await this.fetchUsers();
//       const user = users.find((u) => u.email === email && u.password === password);

//       if (user) {
//         sessionStorage.setItem('token', this.authToken); // Store the token in sessionStorage
//         sessionStorage.setItem(this.userKey, JSON.stringify(user)); // Save user details in sessionStorage
//         console.log(`User ${user.name} logged in successfully.`);
//         return { success: true }; // Login successful
//       }

//       return {
//         success: false,
//         message: 'Invalid credentials. Please check your email and password.',
//       };
//     } catch (error) {
//       console.error('Login error:', error);
//       return { success: false, message: 'Error during login. Please try again later.' };
//     }
//   }

//   /**
//    * Log the user out by clearing sessionStorage
//    */
//   logout(): void {
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem(this.userKey);
//     console.log('User logged out successfully.');
//   }

//   /**
//    * Check if the user is logged in
//    * @returns {boolean} True if logged in, false otherwise
//    */
//   isLoggedIn(): boolean {
//     const token = sessionStorage.getItem('token');
//     return !!token;
//   }

//   /**
//    * Get details of the logged-in user
//    * @returns {any} User details or null if no user is logged in
//    */
//   getUser(): any {
//     const user = sessionStorage.getItem(this.userKey);
//     if (!user) {
//       console.warn('No logged-in user found in sessionStorage.');
//     }
//     return user ? JSON.parse(user) : null;
//   }

//   /**
//    * Clear sessionStorage when the browser or tab is closed
//    */
//   setupSessionClearOnUnload(): void {
//     window.addEventListener('beforeunload', () => {
//       this.logout();
//     });
//   }
// }











// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private userApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers';
//   private authToken =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';
//   private userKey = 'user'; // Key to store user data in sessionStorage

//   constructor() {
//     this.setupSessionClearOnUnload(); // Automatically clear session on browser close
//   }

//   /**
//    * Fetch all users from the API
//    * @returns {Promise<any[]>} Array of users
//    */
//   private async fetchUsers(): Promise<any[]> {
//     try {
//       const response = await fetch(this.userApiUrl, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `${this.authToken}`,
//         },
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         console.error('Fetch Users Error:', errorMessage);
//         throw new Error(`Failed to fetch users: ${response.statusText}`);
//       }

//       const data = await response.json();
//       return Array.isArray(data.data) ? data.data : [];
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       throw new Error('Unable to fetch users. Please try again later.');
//     }
//   }

//   /**
//    * Validate login credentials and log the user in
//    * @param email User email
//    * @param password User password
//    * @returns {Promise<{ success: boolean; message?: string }> }
//    */
//   async login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
//     try {
//       const users = await this.fetchUsers();
//       const user = users.find((u) => u.email === email && u.password === password);

//       if (user) {
//         sessionStorage.setItem('token', this.authToken); // Store the token in sessionStorage
//         sessionStorage.setItem(this.userKey, JSON.stringify(user)); // Save user details in sessionStorage
//         console.log(`User ${user.name} logged in successfully.`);
//         return { success: true }; // Login successful
//       }

//       return {
//         success: false,
//         message: 'Invalid credentials. Please check your email and password.',
//       };
//     } catch (error) {
//       console.error('Login error:', error);
//       return { success: false, message: 'Error during login. Please try again later.' };
//     }
//   }

//   /**
//    * Update user details
//    * @param userId User ID to update
//    * @param updatedData Updated user data
//    * @returns {Promise<any>} API response for user update
//    */
//   async updateUser(userId: string, updatedData: any): Promise<any> {
//     const url = `https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/newusers/${userId}`;
//     try {
//       const response = await fetch(url, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `${this.authToken}`,
//         },
//         body: JSON.stringify(updatedData),
//       });

//       const responseBody = await response.json();

//       if (!response.ok) {
//         console.error('Update User Error:', responseBody);
//       throw new Error(responseBody.message || 'Failed to update user profile.');
//       }

//       // Check for a success message in the response
//     if (responseBody.message === 'Document updated successfully') {
//       console.log('User profile updated successfully:', responseBody);
//       return responseBody; // Return the response object on success
//     } else {
//       throw new Error('Unexpected response from server.');
//     }

//      // return await response.json();
//     } catch (error) {
//       console.error('Error updating user:', error);
//       throw new Error('Unable to update user. Please try again later.');
//     }
//   }

//   /**
//    * Log the user out by clearing sessionStorage
//    */
//   logout(): void {
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem(this.userKey);
//     console.log('User logged out successfully.');
//   }

//   /**
//    * Check if the user is logged in
//    * @returns {boolean} True if logged in, false otherwise
//    */
//   isLoggedIn(): boolean {
//     const token = sessionStorage.getItem('token');
//     return !!token;
//   }

//   /**
//    * Get details of the logged-in user
//    * @returns {any} User details or null if no user is logged in
//    */
//   getUser(): any {
//     const user = sessionStorage.getItem(this.userKey);
//     if (!user) {
//       console.warn('No logged-in user found in sessionStorage.');
//     }
//     return user ? JSON.parse(user) : null;
//   }

//   /**
//    * Set updated user details in sessionStorage
//    * @param user Updated user object
//    */
//   setUser(user: any): void {
//     sessionStorage.setItem(this.userKey, JSON.stringify(user));
//     console.log('User details updated in sessionStorage.');
//   }

//   /**
//    * Clear sessionStorage when the browser or tab is closed
//    */
//   setupSessionClearOnUnload(): void {
//     window.addEventListener('beforeunload', () => {
//       this.logout();
//     });
//   }
// }





















// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private userApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers';
//   private authToken =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';
//   private userKey = 'user'; // Key to store user data in sessionStorage

//   constructor() {
//     this.setupSessionClearOnUnload(); // Automatically clear session on browser close
//   }

//   /**
//    * Fetch all users from the API
//    * @returns {Promise<any[]>} Array of users
//    */
//   private async fetchUsers(): Promise<any[]> {
//     try {
//       const response = await fetch(this.userApiUrl, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `${this.authToken}`,
//         },
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         console.error('Fetch Users Error:', errorMessage);
//         throw new Error(`Failed to fetch users: ${response.statusText}`);
//       }

//       const data = await response.json();
//       return Array.isArray(data.data) ? data.data : [];
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       throw new Error('Unable to fetch users. Please try again later.');
//     }
//   }

//   /**
//    * Validate login credentials and log the user in
//    * @param email User email
//    * @param password User password
//    * @returns {Promise<{ success: boolean; message?: string }> }
//    */
//   async login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
//     try {
//       const users = await this.fetchUsers();
//       const user = users.find((u) => u.email === email && u.password === password);

//       if (user) {
//         // Check if the user is blocked
//         if (user.status === 'blocked') {
//           return {
//             success: false,
//             message: 'You have been blocked by the admin.',
//           };
//         }

//         sessionStorage.setItem('token', this.authToken); // Store the token in sessionStorage
//         sessionStorage.setItem(this.userKey, JSON.stringify(user)); // Save user details in sessionStorage
//         console.log(`User ${user.name} logged in successfully.`);
//         return { success: true }; // Login successful
//       }

//       return {
//         success: false,
//         message: 'Invalid credentials. Please check your email and password.',
//       };
//     } catch (error) {
//       console.error('Login error:', error);
//       return { success: false, message: 'Error during login. Please try again later.' };
//     }
//   }

//   /**
//    * Update user details
//    * @param userId User ID to update
//    * @param updatedData Updated user data
//    * @returns {Promise<any>} API response for user update
//    */
//   async updateUser(userId: string, updatedData: any): Promise<any> {
//     const url = `https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/newusers/${userId}`;
//     try {
//       const response = await fetch(url, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `${this.authToken}`,
//         },
//         body: JSON.stringify(updatedData),
//       });

//       const responseBody = await response.json();

//       if (!response.ok) {
//         console.error('Update User Error:', responseBody);
//         throw new Error(responseBody.message || 'Failed to update user profile.');
//       }

//       // Check for a success message in the response
//       if (responseBody.message === 'Document updated successfully') {
//         console.log('User profile updated successfully:', responseBody);
//         return responseBody; // Return the response object on success
//       } else {
//         throw new Error('Unexpected response from server.');
//       }
//     } catch (error) {
//       console.error('Error updating user:', error);
//       throw new Error('Unable to update user. Please try again later.');
//     }
//   }

//   /**
//    * Log the user out by clearing sessionStorage
//    */
//   logout(): void {
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem(this.userKey);
//     console.log('User logged out successfully.');
//   }

//   /**
//    * Check if the user is logged in
//    * @returns {boolean} True if logged in, false otherwise
//    */
//   isLoggedIn(): boolean {
//     const token = sessionStorage.getItem('token');
//     return !!token;
//   }

//   /**
//    * Get details of the logged-in user
//    * @returns {any} User details or null if no user is logged in
//    */
//   getUser(): any {
//     const user = sessionStorage.getItem(this.userKey);
//     if (!user) {
//       console.warn('No logged-in user found in sessionStorage.');
//     }
//     return user ? JSON.parse(user) : null;
//   }

//   /**
//    * Set updated user details in sessionStorage
//    * @param user Updated user object
//    */
//   setUser(user: any): void {
//     sessionStorage.setItem(this.userKey, JSON.stringify(user));
//     console.log('User details updated in sessionStorage.');
//   }

//   /**
//    * Clear sessionStorage when the browser or tab is closed
//    */
//   setupSessionClearOnUnload(): void {
//     window.addEventListener('beforeunload', () => {
//       this.logout();
//     });
//   }
// }















import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers';
  private authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';
  private userKey = 'user'; // Key to store user data in sessionStorage

  constructor() {
    this.setupSessionClearOnUnload(); // Automatically clear session on browser close
  }

  /**
   * Fetch all users from the API
   * @returns {Promise<any[]>} Array of users
   */
  private async fetchUsers(): Promise<any[]> {
    try {
      const response = await fetch(this.userApiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${this.authToken}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Fetch Users Error:', errorMessage);
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Unable to fetch users. Please try again later.');
    }
  }

  /**
   * Validate login credentials and log the user in
   * @param email User email
   * @param password User password
   * @returns {Promise<{ success: boolean; message?: string }> }
   */
  async login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
    try {
      const users = await this.fetchUsers();
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        // Check if the user is blocked
        if (user.status === 'Blocked') {
          console.warn(`Blocked user (${user.email}) attempted to log in.`);
          return {
            success: false,
            message: 'You have been blocked by the admin.',
          };
        }

        // Successful login
        sessionStorage.setItem('token', this.authToken); // Store the token in sessionStorage
        sessionStorage.setItem(this.userKey, JSON.stringify(user)); // Save user details in sessionStorage
        console.log(`User ${user.name} logged in successfully.`);
        return { success: true }; // Login successful
      }

      return {
        success: false,
        message: 'Invalid credentials. Please check your email and password.',
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Error during login. Please try again later.' };
    }
  }

  /**
   * Update user details
   * @param userId User ID to update
   * @param updatedData Updated user data
   * @returns {Promise<any>} API response for user update
   */
  async updateUser(userId: string, updatedData: any): Promise<any> {
    const url = `https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/newusers/${userId}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${this.authToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        console.error('Update User Error:', responseBody);
        throw new Error(responseBody.message || 'Failed to update user profile.');
      }

      // Check for a success message in the response
      if (responseBody.message === 'Document updated successfully') {
        console.log('User profile updated successfully:', responseBody);
        return responseBody; // Return the response object on success
      } else {
        throw new Error('Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Unable to update user. Please try again later.');
    }
  }

  /**
   * Log the user out by clearing sessionStorage
   */
  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem(this.userKey);
    console.log('User logged out successfully.');
  }

  /**
   * Check if the user is logged in
   * @returns {boolean} True if logged in, false otherwise
   */
  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  /**
   * Get details of the logged-in user
   * @returns {any} User details or null if no user is logged in
   */
  getUser(): any {
    const user = sessionStorage.getItem(this.userKey);
    if (!user) {
      console.warn('No logged-in user found in sessionStorage.');
    }
    return user ? JSON.parse(user) : null;
  }

  /**
   * Set updated user details in sessionStorage
   * @param user Updated user object
   */
  setUser(user: any): void {
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
    console.log('User details updated in sessionStorage.');
  }

  /**
   * Clear sessionStorage when the browser or tab is closed
   */
  setupSessionClearOnUnload(): void {
    window.addEventListener('beforeunload', () => {
      this.logout();
    });
  }
}
