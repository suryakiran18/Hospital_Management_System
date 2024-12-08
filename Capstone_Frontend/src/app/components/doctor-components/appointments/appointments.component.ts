import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointmentservice/appointment.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AppointmentService ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})


export class AppointmentsComponent implements OnInit{

  appointments: any[] = [];

 
  
  
  
  ngOnInit(): void {

    this.loadAppointments(); 
   
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
      console.log('Logged-in User:', this.loggedInUser);
      this.loadAppointments(); 
    } else {
      this.router.navigate(['/login']);
    }
  }
 


  isEditing = false;
  isEditingDoctor = false;
  isEditingPatient = false;
  isModalVisible = false;
  isDoctorModalVisible = false;
  isPatientModalVisible = false;
  successMessage = '';
  currentView = 'dashboard';
  currentQuote = 'Medicine cure Diseases but only YOU can cure patients!';
  loggedInUser: { username: string; role: string } | null = null;
  patients: any[] = [];

  constructor(

    private appointmentService: AppointmentService,
 
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}






  // Navigation Methods
  navigateTo(view: string) {
    this.currentView = view;
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
          const doctorUsername = appointment.doctor?.user?.username;
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
  
  approveAppointment(appointmentId: number): void {
    if (confirm('Are you sure you want to approve this appointment?')) {
      this.appointmentService.approveAppointment(appointmentId).subscribe(
        (response: string) => {
          console.log('API Response:', response); // Log the response
          this.successMessage = response; // Set the success message
          this.loadAppointments(); // Reload the appointments
          setTimeout(() => (this.successMessage = ''), 3000); // Clear the message after 3 seconds
        },
        (error) => {
          console.error('Error approving appointment:', error);
          alert('Error approving appointment!');
        }
      );
    }
  }
  
  rejectAppointment(appointmentId: number): void {
    if (confirm('Are you sure you want to reject this appointment?')) {
      this.appointmentService.rejectAppointment(appointmentId).subscribe(
        (response: string) => {
          console.log('API Response:', response); // Log the response
          this.successMessage = response; // Set the success message
          this.loadAppointments(); // Reload the appointments
          setTimeout(() => (this.successMessage = ''), 3000); // Clear the message after 3 seconds
        },
        (error) => {
          console.error('Error rejecting appointment:', error);
          alert('Error rejecting appointment!');
        }
      );
    }
  }
  
  
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    alert('Logged out!');
  }
}


