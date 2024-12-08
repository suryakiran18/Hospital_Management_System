import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminserviceService } from '../../../services/adminservice/adminservice.service';
import { DoctorserviceService } from '../../../services/doctorservice/doctorservice.service';
import { PatientserviceService } from '../../../services/patientservice/patientservice.service';
import { AppointmentService } from '../../../services/appointmentservice/appointment.service';
import { FeedbackService } from '../../../services/feedbackservice/feedback.service';
import { InventoryService } from '../../../services/inventoryservice/inventory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterOutlet],
  providers: [AdminserviceService, DoctorserviceService, PatientserviceService,AppointmentService,FeedbackService, InventoryService ],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit{

  ngOnInit(): void {

    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
      console.log('Logged-in User:', this.loggedInUser);
  
    } else {
      this.router.navigate(['/login']);
    }
  }
 


  successMessage = '';
  currentView = 'dashboard';
  currentQuote = 'Medicine cure Diseases but only YOU can cure patients!';
  loggedInUser: { username: string; role: string } | null = null;
  patients: any[] = [];

  constructor(

    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  // Navigation Methods
  navigateTo(view: string) {
    this.router.navigate([`/doctor/${view}`]);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    alert('Logged out!');
  }
}


