import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminserviceService } from '../../../services/adminservice/adminservice.service';
import { DoctorserviceService } from '../../../services/doctorservice/doctorservice.service';
import { PatientserviceService } from '../../../services/patientservice/patientservice.service';
import { AppointmentService } from '../../../services/appointmentservice/appointment.service';
import { FeedbackService } from '../../../services/feedbackservice/feedback.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-patientservices',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  providers: [AdminserviceService, DoctorserviceService, PatientserviceService, AppointmentService, FeedbackService],
  templateUrl: './patientservices.component.html',
  styleUrls: ['./patientservices.component.css'],
})
export class PatientservicesComponent implements OnInit {
  users: any[] = [];
  doctors: any[] = [];
  appointments: any[] = [];
  feedback: any[] = [];
  patients: any[] = [];

  appointmentForm: any = {
    appointmentId: null,
    patientId: null,
    doctorId: null,
    dateTime: '',
    reason: '',
    emergency: false,
  };

  isAppointmentModalVisible: boolean = false;
  isEditing: boolean = false;
  successMessage: string = '';
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
    private adminService: AdminserviceService,
    private doctorService: DoctorserviceService,
    private patientService: PatientserviceService,
    private appointmentService: AppointmentService,
    private feedbackService: FeedbackService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadFeedback();
    this.loadDoctors(); 
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
      console.log('Logged-in User:', this.loggedInUser);
      this.loadAppointments();
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Navigation Methods
  // Navigation Methods
  navigateTo(view: string) {
    this.router.navigate([`/services/${view}`]);
  }
  navigateTopatient(path: string) {
    this.router.navigateByUrl(path);
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
  
  loadAppointments(): void {
    const loggedInDoctorUsername = this.loggedInUser?.username;

    if (!loggedInDoctorUsername) {
      console.error('Logged-in doctor username is missing!');
      return;
    }

    this.appointmentService.getAppointments().subscribe(
      (data: any[]) => {
        console.log('API Response:', data);
        console.log('Logged-in Doctor Username:', loggedInDoctorUsername);

        this.appointments = data.filter((appointment) => {
          const doctorUsername = appointment.patient?.user?.username;
          console.log('Appointment Doctor Username:', doctorUsername);
          return doctorUsername?.toLowerCase() === loggedInDoctorUsername.toLowerCase();
        });

        console.log('Filtered Appointments:', this.appointments);
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  deleteAppointment(appointmentId: number): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(appointmentId).subscribe(
        () => {
          this.loadAppointments();
          this.successMessage = 'Appointment deleted successfully!';
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        (error) => {
          console.error('Error deleting appointment:', error);
          alert('Error deleting appointment!');
        }
      );
    }
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
  
  

  submitAppointmentForm(): void {
    const formattedDateTime = new Date(this.appointmentForm.dateTime).toISOString().slice(0, 19).replace('T', ' ');
  
    const payload = {
      doctor: { doctorId: this.appointmentForm.doctorId },
      patient: { patientId: this.appointmentForm.patientId },
      dateTime: formattedDateTime,
      reason: this.appointmentForm.reason,
      emergency: this.appointmentForm.emergency,
    };
  
    const apiCall = this.isEditing
      ? this.appointmentService.updateAppointment(this.appointmentForm.appointmentId, payload)
      : this.appointmentService.createAppointment(payload);
  
    apiCall.subscribe({
      next: () => {
        this.loadAppointments();
        this.successMessage = this.isEditing
          ? 'Appointment updated successfully!'
          : 'Appointment created successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
        this.closeAppointmentModal();
      },
      error: (error) => {
        console.error('Error submitting appointment:', error);
        alert('Error submitting appointment!');
      },
    });
  }
  

  openCreateAppointmentModal(): void {
    this.isEditing = false;
    this.appointmentForm = {
      appointmentId: null,
      patientId: null,
      doctorId: null,
      dateTime: '',
      reason: '',
      emergency: false,
    };
    this.isAppointmentModalVisible = true;
  }

  openEditAppointmentModal(appointment: any): void {
    this.isEditing = true;
    this.appointmentForm = {
      appointmentId: appointment.appointmentId,
      patientId: appointment.patient.patientId,
      doctorId: appointment.doctor.doctorId,
      dateTime: appointment.dateTime,
      reason: appointment.reason,
      emergency: appointment.emergency,
    };
    this.isAppointmentModalVisible = true;
  }
  

  closeAppointmentModal(): void {
    this.isAppointmentModalVisible = false;
    this.successMessage = '';
    this.appointmentForm = {
      appointmentId: null,
      patientId: null,
      doctorId: null,
      dateTime: '',
      reason: '',
      emergency: false,
    };
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    alert('Logged out!');
  }

}