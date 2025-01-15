import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageUsersComponent } from './manage-users.component';
import { AdminUserService } from '../admin-user.service';

describe('ManageUsersComponent', () => {
  let component: ManageUsersComponent;
  let fixture: ComponentFixture<ManageUsersComponent>;
  let mockAdminUserService: jasmine.SpyObj<AdminUserService>;

  beforeEach(async () => {
    // Create mock for AdminUserService
    mockAdminUserService = jasmine.createSpyObj('AdminUserService', [
      'getUsers',
      'addUser',
      'updateUser',
      'deleteUser',
    ]);

    await TestBed.configureTestingModule({
      imports: [ManageUsersComponent],
      providers: [{ provide: AdminUserService, useValue: mockAdminUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on initialization', async () => {
    // Mock the getUsers method to return a resolved promise
    const mockUsers = [{ id: 1, name: 'Test', email: 'test@test.com', role: 'admin' }];
    mockAdminUserService.getUsers.and.resolveTo(mockUsers);

    await component.ngOnInit();
    expect(mockAdminUserService.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should add a user', async () => {
    // Mock the addUser method to return a resolved promise
    const newUser = { id: 2, name: 'New User', email: 'new@test.com', role: 'user' };
    mockAdminUserService.addUser.and.resolveTo(newUser);

    component.newUser = { name: 'New User', email: 'new@test.com', role: 'user' };
    await component.addUser();

    expect(mockAdminUserService.addUser).toHaveBeenCalledWith(component.newUser);
    expect(component.users).toContain(newUser);
  });

  it('should update a user', async () => {
    const updatedUser = { id: 1, name: 'Updated User', email: 'updated@test.com', role: 'admin' };
    mockAdminUserService.updateUser.and.resolveTo(updatedUser);

    component.users = [{ id: 1, name: 'Test', email: 'test@test.com', role: 'admin' }];
    component.currentUserId = 1;
    component.newUser = { name: 'Updated User', email: 'updated@test.com', role: 'admin' };

    await component.updateUser();

    expect(mockAdminUserService.updateUser).toHaveBeenCalledWith(1, component.newUser);
    expect(component.users[0]).toEqual(updatedUser);
  });

  it('should delete a user', async () => {
    // Mock the deleteUser method to return a resolved promise
    mockAdminUserService.deleteUser.and.resolveTo();

    component.users = [
      { id: 1, name: 'Test', email: 'test@test.com', role: 'admin' },
      { id: 2, name: 'To Delete', email: 'delete@test.com', role: 'user' },
    ];

    const userToDelete = component.users[1];
    await component.deleteUser(userToDelete);

    expect(mockAdminUserService.deleteUser).toHaveBeenCalledWith(userToDelete.id);
    expect(component.users).not.toContain(userToDelete);
  });
});
