import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from '../../../services/feedbackservice/feedback.service';
import { DoctorserviceService } from '../../../services/doctorservice/doctorservice.service';
@Component({
  selector: 'app-patient-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [FeedbackService,DoctorserviceService],
  templateUrl: './patient-feedback.component.html',
  styleUrl: './patient-feedback.component.css'
})
export class PatientFeedbackComponent implements OnInit {

  feedback: any[] = [];
  doctors: any[] = [];
  isEditing: boolean = false;
  successMessage: string = '';


  isAppointmentModalVisible: boolean = false;

  feedbackForm: any = {
    patientId: null,
    doctorId: null,
    rating: null,
    comments: ''
  };
  
  patientForm = {
    patientId: 0,
    dob: null,
    phnNum: null,
    address: '',
    medicalHistory: '',
  };

  isEditingDoctor = false;
  isEditingPatient = false;
  isModalVisible = false;
  isDoctorModalVisible = false;
  isPatientModalVisible = false;

  currentView = 'dashboard';
  currentQuote = 'Have a Wonderful Day!';
  loggedInUser: { username: string; role: string } | null = null;

  constructor(

    private doctorService: DoctorserviceService,

    private feedbackService: FeedbackService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadFeedback();
  this.loadDoctors();
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
      console.log('Logged-in User:', this.loggedInUser);
   
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Navigation Methods
  navigateTo(view: string) {
    this.currentView = view;
  }
  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (data: any[]) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }
  loadFeedback(): void {
    this.feedbackService.getfeedback().subscribe(
      (data: any[]) => {
        this.feedback = data;
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  submitFeedbackForm(): void {
    const feedbackPayload = {
      patient: { patientId: this.feedbackForm.patientId },
      doctor: { doctorId: this.feedbackForm.doctorId },
      rating: this.feedbackForm.rating,
      comments: this.feedbackForm.comments
    };
  
    this.feedbackService.createFeedback(feedbackPayload).subscribe({
      next: () => {
        this.loadFeedback();
        alert('Feedback submitted successfully!');
        this.feedbackForm = { patientId: null, doctorId: null, rating: null, comments: '' };
      },
      error: (error) => {
        console.error('Error submitting feedback:', error);
        alert('Error submitting feedback!');
      }
    });
  }
  
  

 
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    alert('Logged out!');
  }
 
}
