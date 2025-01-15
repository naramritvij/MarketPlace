// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatTableModule } from '@angular/material/table';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { AdminUserService, User } from '../admin-user.service';

// @Component({
//   selector: 'app-manage-users',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatTableModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//   ],
//   templateUrl: './manage-users.component.html',
//   styleUrls: ['./manage-users.component.css'],
// })
// export class ManageUsersComponent implements OnInit {
//   users: User[] = [];
//   newUser: Partial<User> = { name: '', email: '', role: '' };
//   isEditing: boolean = false;
//   currentUserId: number | null = null;

//   constructor(private adminUserService: AdminUserService) {}

//   async ngOnInit(): Promise<void> {
//     await this.fetchUsers();
//   }

//   async fetchUsers(): Promise<void> {
//     try {
//       this.users = await this.adminUserService.getUsers();
//       console.log('Fetched users:', this.users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   }

//   async addUser(): Promise<void> {
//     if (this.newUser.name && this.newUser.email && this.newUser.role) {
//       try {
//         const addedUser = await this.adminUserService.addUser(this.newUser);
//         this.users.push(addedUser);
//         this.resetForm();
//       } catch (error) {
//         console.error('Error adding user:', error);
//       }
//     } else {
//       alert('Please fill all fields before adding a user.');
//     }
//   }

//   editUser(user: User): void {
//     this.isEditing = true;
//     this.currentUserId = user.id;
//     this.newUser = { ...user };
//   }

//   async updateUser(): Promise<void> {
//     if (this.currentUserId && this.newUser.name && this.newUser.email && this.newUser.role) {
//       try {
//         const updatedUser = await this.adminUserService.updateUser(
//           this.currentUserId,
//           this.newUser
//         );
//         const index = this.users.findIndex((u) => u.id === this.currentUserId);
//         this.users[index] = updatedUser;
//         this.resetForm();
//       } catch (error) {
//         console.error('Error updating user:', error);
//       }
//     } else {
//       alert('Please fill all fields before updating a user.');
//     }
//   }

//   async deleteUser(user: User): Promise<void> {
//     try {
//       await this.adminUserService.deleteUser(user.id);
//       this.users = this.users.filter((u) => u.id !== user.id);
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   }

//   resetForm(): void {
//     this.isEditing = false;
//     this.currentUserId = null;
//     this.newUser = { name: '', email: '', role: '' };
//   }
// }












import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string; // Optional status property for blocking
}

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'actions'];
  users: User[] = [];
  newUser: Partial<User> = { name: '', email: '', role: '' };
  isEditing: boolean = false;
  currentUserId: string | null = null;

  private userApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers';
  private adminApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newadmin';
  private deleteUserApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/newusers';
  private deleteAdminApiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/newadmin';
  private addUserApiUrl =
    'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/newusers';
  private addAdminApiUrl =
    'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/newadmin';
  private updateUserApiUrl =
    'https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/newusers';
  private updateAdminApiUrl =
    'https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/newadmin';
  private authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg5YmMzY2FhNWVjNzQ5NDQxMThiYyIsInVzZXJuYW1lIjoibmFyYW0uckBub3J0aGVhc3Rlcm4uZWR1IiwiaWF0IjoxNzMyNTk2NjY2LCJleHAiOjE3MzQ3NTY2NjZ9.OvoVEcseT6whDWYAeJzu2b4kZabFIjnSNNLy4-DZZjI';

  constructor(private snackBar: MatSnackBar) {}

  async ngOnInit(): Promise<void> {
    await this.fetchUsersAndAdmins();
  }

  // Fetch users and admins
  async fetchUsersAndAdmins(): Promise<void> {
    try {
      const userResponse = await fetch(this.userApiUrl, {
        method: 'GET',
        headers: { Authorization: this.authToken },
      });

      if (!userResponse.ok) {
        throw new Error(`Error fetching users: ${userResponse.statusText}`);
      }

      const userData = await userResponse.json();
      const users = userData.data.map((user: any) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'User',
        status: user.status || 'Active',
      }));

      const adminResponse = await fetch(this.adminApiUrl, {
        method: 'GET',
        headers: { Authorization: this.authToken },
      });

      if (!adminResponse.ok) {
        throw new Error(`Error fetching admins: ${adminResponse.statusText}`);
      }

      const adminData = await adminResponse.json();
      const admins = adminData.data.map((admin: any) => ({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: 'Admin',
        status: admin.status || 'Active',
      }));

      this.users = [...users, ...admins];
    } catch (error) {
      console.error('Error fetching users and admins:', error);
      this.snackBar.open('Failed to fetch users and admins.', 'Close', { duration: 3000 });
    }
  }

  // Add a new user
  async addUser(): Promise<void> {
    if (this.newUser.name && this.newUser.email && this.newUser.role) {
      try {
        const apiUrl = this.newUser.role === 'Admin' ? this.addAdminApiUrl : this.addUserApiUrl;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify(this.newUser),
        });

        if (!response.ok) {
          throw new Error(`Error adding user: ${response.statusText}`);
        }

        this.snackBar.open('User added successfully!', 'Close', { duration: 3000 });
        await this.fetchUsersAndAdmins();
        this.resetForm();
      } catch (error) {
        console.error('Error adding user:', error);
        this.snackBar.open('Failed to add user. Please try again.', 'Close', { duration: 3000 });
      }
    } else {
      this.snackBar.open('Please fill all fields before adding a user.', 'Close', { duration: 3000 });
    }
  }

  // Edit an existing user
  editUser(user: User): void {
    this.isEditing = true;
    this.currentUserId = user.id;
    this.newUser = { ...user };
  }

  // Update an existing user
  async updateUser(): Promise<void> {
    if (this.currentUserId && this.newUser.name && this.newUser.email && this.newUser.role) {
      try {
        const response = await fetch(`${this.updateUserApiUrl}/${this.currentUserId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify(this.newUser),
        });

        if (!response.ok) {
          throw new Error(`Error updating user: ${response.statusText}`);
        }

        const updatedUser = await response.json();
        const index = this.users.findIndex((u) => u.id === this.currentUserId);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...updatedUser };
        }

        this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
        this.resetForm();
      } catch (error) {
        console.error('Error updating user:', error);
        this.snackBar.open('Failed to update user. Please try again.', 'Close', { duration: 3000 });
      }
    } else {
      this.snackBar.open('Please fill all fields before updating a user.', 'Close', { duration: 3000 });
    }
  }

  // Delete a user
  async deleteUser(user: User): Promise<void> {
    try {
      const apiUrl = user.role === 'Admin' ? this.deleteAdminApiUrl : this.deleteUserApiUrl;
      const response = await fetch(`${apiUrl}/${user.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: this.authToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`);
      }

      this.users = this.users.filter((u) => u.id !== user.id);
      this.snackBar.open('User deleted successfully!', 'Close', { duration: 3000 });
    } catch (error) {
      console.error('Error deleting user:', error);
      this.snackBar.open('Failed to delete user. Please try again.', 'Close', { duration: 3000 });
    }
  }

  // Block/Unblock a user
  async blockUser(user: User): Promise<void> {
    const newStatus = user.status === 'Blocked' ? 'Active' : 'Blocked';
    try {
      const apiUrl = user.role === 'Admin' ? this.updateAdminApiUrl : this.updateUserApiUrl;
      const response = await fetch(`${apiUrl}/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authToken,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Error blocking/unblocking user: ${response.statusText}`);
      }

      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users[index].status = newStatus;
      }

      this.snackBar.open(
        `User ${newStatus === 'Blocked' ? 'blocked' : 'unblocked'} successfully!`,
        'Close',
        { duration: 3000 }
      );
    } catch (error) {
      console.error('Error updating block status:', error);
      this.snackBar.open('Failed to update user status. Please try again.', 'Close', { duration: 3000 });
    }
  }

  // Reset the form
  resetForm(): void {
    this.isEditing = false;
    this.currentUserId = null;
    this.newUser = { name: '', email: '', role: '' };
  }
}
