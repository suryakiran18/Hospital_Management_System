import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FeedbackService } from '../../../services/feedbackservice/feedback.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminserviceService } from '../../../services/adminservice/adminservice.service';
import { DoctorserviceService } from '../../../services/doctorservice/doctorservice.service';
import { PatientserviceService } from '../../../services/patientservice/patientservice.service';
import { AppointmentService } from '../../../services/appointmentservice/appointment.service';
@Component({
  selector: 'app-admin-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AdminserviceService, DoctorserviceService, PatientserviceService,AppointmentService,FeedbackService ],
  templateUrl: './admin-appointments.component.html',
  styleUrl: './admin-appointments.component.css'
})


export class AdminAppointmentsComponent  implements OnInit {

  appointments: any[] = [];

  

  


  isEditing = false;

  isModalVisible = false;

  successMessage = '';
  currentView = 'dashboard';
  currentQuote = 'Have a Wonderful Day!';
  loggedInUser: { username: string; role: string } | null = null;
  patients: any[] = [];

  constructor(

    private appointmentService: AppointmentService,

    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadAppointments(); 
  
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

  
  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe((data: any[]) => {
      this.appointments = data;
    }, error => {
      console.error('Error fetching appointments:', error);
    });
  }

  

  

  deleteAppointment(appointmentId: number): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(appointmentId).subscribe(() => {
        this.loadAppointments();  
        this.successMessage = 'Appointment deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);  
      }, error => {
        console.error('Error deleting appointment:', error);
        alert('Error deleting appointment!');
      });
    }
  }
  

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    alert('Logged out!');
  }
}
