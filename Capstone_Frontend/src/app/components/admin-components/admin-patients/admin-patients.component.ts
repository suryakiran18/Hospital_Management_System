import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientserviceService } from '../../../services/patientservice/patientservice.service';
@Component({
  selector: 'app-admin-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [PatientserviceService],
  templateUrl: './admin-patients.component.html',
  styleUrl: './admin-patients.component.css'
})



export class AdminPatientsComponent  implements OnInit {

  
  
  patientForm = { 
    patientId: 0, 
    dob: null,      
    phnNum: null,  
    address: '',    
    medicalHistory: '' 
  };

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
 
    private patientService: PatientserviceService,

    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.fetchPatients(); 

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

  // Patient Methods
  fetchPatients() {
    this.patientService.getPatients().subscribe((patients) => {
      this.patients = patients;
      this.cdr.detectChanges();
    });
  }

  openCreatePatientModal() {
    this.isPatientModalVisible = true;
    this.isEditingPatient = false;
    this.patientForm = { 
      patientId: 0, 
      dob: null,  
      phnNum: null, 
      address: '', 
      medicalHistory: '' 
    };
    this.isPatientModalVisible = true;
  }

  openEditPatientModal(patient: any) {
    this.isPatientModalVisible = true;
    this.isEditingPatient = true;
    this.patientForm = { 
      patientId: patient.patientId, 
      dob: patient.dob, 
      phnNum: patient.phnNum, 
      address: patient.address, 
      medicalHistory: patient.medicalHistory 
    };
    this.isPatientModalVisible = true;
  }

  submitPatientForm() {
    const apiCall = this.isEditingPatient
      ? this.patientService.updatePatient(this.patientForm.patientId, this.patientForm)
      : this.patientService.createPatient(this.patientForm);

    apiCall.subscribe(() => {
      this.fetchPatients();
      this.successMessage = this.isEditingPatient ? 'Patient updated successfully!' : 'Patient created successfully!';
      setTimeout(() => (this.successMessage = ''), 3000);
      this.closePatientModal();
    });
  }

  deletePatient(patientId: number) {
    if (confirm('Are you sure?')) {
      this.patientService.deletePatient(patientId).subscribe(() => {
        this.fetchPatients();
        this.successMessage = 'Patient deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      });
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
