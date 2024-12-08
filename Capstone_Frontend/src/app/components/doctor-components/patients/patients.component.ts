import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PatientserviceService } from '../../../services/patientservice/patientservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [PatientserviceService],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})


export class PatientsComponent {

  patientForm = { 
    patientId: 0, 
    dob: null,      
    phnNum: null,  
    address: '',    
    medicalHistory: '' 
  };
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

  isEditing = false;
  isEditingPatient = false;
  isModalVisible = false;
 
  isPatientModalVisible = false;
  successMessage = '';
  currentView = 'dashboard';

  loggedInUser: { username: string; role: string } | null = null;
  patients: any[] = [];
  constructor(

    private patientService: PatientserviceService,

    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

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
