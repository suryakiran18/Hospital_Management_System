import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PatientserviceService } from '../../../services/patientservice/patientservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-medicalhostory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [PatientserviceService],
  templateUrl: './patients-medicalhostory.component.html',
  styleUrls: ['./patients-medicalhostory.component.css']
})
export class PatientsMedicalhostoryComponent implements OnInit {
  patientForm = { 
    patientId: 0, 
    dob: null,      
    phnNum: null,  
    address: '',    
    medicalHistory: '' 
  };
  isEditing = false;
  isEditingPatient = false;
  isModalVisible = false;
  isPatientModalVisible = false;
  successMessage = '';
  currentView = 'dashboard';
  loggedInUser: { username: string; role: string; userId: number } | null = null;
  patients: any[] = [];
  filteredPatients: any[] = []; // To store filtered patients

  constructor(
    private patientService: PatientserviceService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPatients();
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
      console.log('Logged-in User:', this.loggedInUser); 
    } else {
      this.router.navigate(['/login']);
    }
  }

  fetchPatients() {
    this.patientService.getPatients().subscribe((patients) => {
      this.patients = patients;
      this.filterPatientsForLoggedInUser();
      this.cdr.detectChanges();
    });
  }

  filterPatientsForLoggedInUser() {
    if (this.loggedInUser) {
      this.filteredPatients = this.patients.filter(patient => 
        patient.user.username === this.loggedInUser?.username
      );
    }
  }

  closePatientModal() {
    this.isPatientModalVisible = false;
    this.successMessage = '';
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    alert('Logged out!');
  }
}
