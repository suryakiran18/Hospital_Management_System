import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from '../../../services/feedbackservice/feedback.service';

@Component({
  selector: 'app-admin-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [FeedbackService ],
  templateUrl: './admin-feedback.component.html',
  styleUrl: './admin-feedback.component.css'
})



export class AdminFeedbackComponent implements OnInit {

  feedback :any[]=[]
  
 
  


  isEditing = false;
  isEditingDoctor = false;
  isEditingPatient = false;
  isModalVisible = false;
  isDoctorModalVisible = false;
  isPatientModalVisible = false;
  successMessage = '';
  currentView = 'dashboard';
  currentQuote = 'Have a Wonderful Day!';
  loggedInUser: { username: string; role: string } | null = null;
  patients: any[] = [];

  constructor(

    private FeedbackService : FeedbackService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadFeedback();
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    } else {
      this.router.navigate(['/login']);
    }
  }

 
  // Navigation Methods
  navigateTo(view: string) {
    this.currentView = view;
  }

  
  
  loadFeedback(): void {
    this.FeedbackService.getfeedback().subscribe((data: any[]) => {
      this.feedback = data;
    }, error => {
      console.error('Error fetching feedback:', error);
    });
  }
  

  

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    alert('Logged out!');
  }
}
