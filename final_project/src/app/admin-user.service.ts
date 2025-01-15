

import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  private baseUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document';
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';

  constructor() {}

  private getHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      Authorization: `${this.token}`,
    });
  }

  // Fetch all users
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/findAll/newusers`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users. Status: ${response.status}`);
    }

    return await response.json();
  }

  // Add a new user
  async addUser(user: Partial<User>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/createorupdate/newusers`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Failed to add user. Status: ${response.status}`);
    }

    return await response.json();
  }

  //Update a user by ID
  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/updateOne/newusers/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user. Status: ${response.status}`);
    }

    return await response.json();
  }

  // Delete a user by ID
  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/deleteOne/newusers/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user. Status: ${response.status}`);
    }
  }

  // async updateUser(userId: string, updatedData: any): Promise<void> {
  //   const url = `https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/users/${userId}`;
  //   const response = await fetch(url, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `${this.authToken}`,
  //     },
  //     body: JSON.stringify(updatedData),
  //   });

  //   if (!response.ok) {
  //     throw new Error('Failed to update user profile.');
  //   }
  // }
}






