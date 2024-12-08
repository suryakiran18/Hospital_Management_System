import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent {
  showPassword: boolean = false; 
  username: string = ''; 
  password: string = ''; 

  constructor(private http: HttpClient, private router:Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword; 
  }

  onSubmit(): void {
    const loginPayload = {
      username: this.username,
      password: this.password,
    };
  
    this.http.post<{ username: string, role: string }>('http://localhost:8091/users/login', loginPayload)
      .subscribe({
        next: (response) => {
          // Store the logged-in user's data in localStorage
          localStorage.setItem('loggedInUser', JSON.stringify({
            username: response.username,
            role: response.role
          }));
  
          // Display success message
          alert(`Login successful for ${response.username}`);
  
          // Navigate based on user role
          this.navigateByRole(response.role);
        },
        error: () => {
          // Handle invalid login
          alert('Invalid username or password');
        }
      });
  }
  
  private navigateByRole(role: string): void {
    switch (role) {
      case 'Admin':
        this.router.navigate(['/admin']);
        break;
      case 'Patient':
        this.router.navigate(['/patient']);
        break;
      case 'Doctor':
        this.router.navigate(['/doctor']);
        break;
      default:
        alert('Role not recognized');
        break;
    }
  }
}