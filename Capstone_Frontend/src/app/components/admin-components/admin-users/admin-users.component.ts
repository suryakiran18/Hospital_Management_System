import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminserviceService } from '../../../services/adminservice/adminservice.service';
@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AdminserviceService],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})



export class AdminUsersComponent  implements OnInit {
  users: any[] = [];

  
  userForm = { userId: 0, username: '', password: '', role: '', email: '', phoneNumber: '', isActive: true };

  
  


  isEditing = false;

  isModalVisible = false;

  successMessage = '';
  currentView = 'dashboard';
  currentQuote = 'Have a Wonderful Day!';
  loggedInUser: { username: string; role: string } | null = null;
  patients: any[] = [];

  constructor(
    private adminService: AdminserviceService,

    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();

    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // User Methods
  fetchUsers() {
    this.adminService.getUsers().subscribe((users) => {
      this.users = users;
      this.cdr.detectChanges();
    });
  }

  openCreateUserModal() {
    this.isEditing = false;
    this.userForm = {
      userId: this.getNextUserId(),
      username: '',
      password: '',
      role: '',
      email: '',
      phoneNumber: '',
      isActive: true,
    };
    this.isModalVisible = true;
  }

  openEditUserModal(user: any) {
    this.isEditing = true;
    this.userForm = { ...user };
    this.isModalVisible = true;
  }

  closeUserModal() {
    this.isModalVisible = false;
    this.successMessage = '';
  }

  submitUserForm() {
    const apiCall = this.isEditing
      ? this.adminService.updateUser(this.userForm.userId, this.userForm)
      : this.adminService.createUser(this.userForm);

    apiCall.subscribe(() => {
      this.fetchUsers();
      this.successMessage = this.isEditing ? 'User updated successfully!' : 'User created successfully!';
      setTimeout(() => (this.successMessage = ''), 3000);
      this.closeUserModal();
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure?')) {
      this.adminService.deleteUser(userId).subscribe(() => {
        this.fetchUsers();
        this.successMessage = 'User deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      });
    }
  }

  getNextUserId(): number {
    if (this.users.length === 0) return 1;
    return Math.max(...this.users.map((user) => user.userId)) + 1;
  }

 
  // Navigation Methods
  navigateTo(view: string) {
    this.currentView = view;
  }

  

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    alert('Logged out!');
  }
}
