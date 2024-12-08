import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorserviceService } from '../../../services/doctorservice/doctorservice.service';
@Component({
  selector: 'app-admin-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DoctorserviceService],
  templateUrl: './admin-doctors.component.html',
  styleUrl: './admin-doctors.component.css'
})



export class AdminDoctorsComponent implements OnInit {

  doctors: any[] = [];

  

  doctorForm = { doctorId: 0, name: '', specialization: '', contactInfo: '', availability: '', department: true };
  
  
  
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

    private doctorService: DoctorserviceService,

 
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.fetchDoctors();
  
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    } else {
      this.router.navigate(['/login']);
    }
  }

  
  // Doctor Methods
  fetchDoctors() {
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
      this.cdr.detectChanges();
    });
  }

  openCreateDoctorModal() {
    this.isEditingDoctor = false;
    this.doctorForm = {
      doctorId: 0,
      name: '',
      specialization: '',
      contactInfo: '',
      availability: '',
      department: true,
    };
    this.isDoctorModalVisible = true;
  }

  openEditDoctorModal(doctor: any) {
    this.isEditingDoctor = true;
    this.doctorForm = { ...doctor };
    this.isDoctorModalVisible = true;
  }

  closeDoctorModal() {
    this.isDoctorModalVisible = false;
    this.successMessage = '';
  }

  submitDoctorForm() {
    const apiCall = this.isEditingDoctor
      ? this.doctorService.updateDoctor(this.doctorForm.doctorId, this.doctorForm)
      : this.doctorService.createDoctor(this.doctorForm);

    apiCall.subscribe(() => {
      this.fetchDoctors();
      this.successMessage = this.isEditingDoctor ? 'Doctor updated successfully!' : 'Doctor created successfully!';
      setTimeout(() => (this.successMessage = ''), 3000);
      this.closeDoctorModal();
    });
  }

  deleteDoctor(doctorId: number) {
    if (confirm('Are you sure?')) {
      this.doctorService.deleteDoctor(doctorId).subscribe(() => {
        this.fetchDoctors();
        this.successMessage = 'Doctor deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      });
    }
  }

  getNextDoctorId(): number {
    if (this.doctors.length === 0) return 1;
    return Math.max(...this.doctors.map((doctor) => doctor.doctorId)) + 1;
  }

  // Navigation Methods
  navigateTo(view: string) {
    this.currentView = view;
  }

  

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    alert('Logged out!');
  }
}
