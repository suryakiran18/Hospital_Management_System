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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  providers: [AdminserviceService, DoctorserviceService, PatientserviceService,AppointmentService,FeedbackService ],
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  doctors: any[] = [];
  appointments: any[] = [];
  feedback :any[]=[]
  
  userForm = { userId: 0, username: '', password: '', role: '', email: '', phoneNumber: '', isActive: true };
  doctorForm = { doctorId: 0, name: '', specialization: '', contactInfo: '', availability: '', department: true };
  
  
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
    private adminService: AdminserviceService,
    private doctorService: DoctorserviceService,
    private patientService: PatientserviceService,
    private appointmentService: AppointmentService,
    private FeedbackService : FeedbackService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchDoctors();
    this.loadAppointments(); 
    this.fetchPatients(); 
    this.loadFeedback();
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // User Methods
  fetchUsers() {
    this.adminService.getUsers().subscribe((users) => {
      this.users = users;
      this.cdr.detectChanges();
    });
  }

  openCreateUserModal() {
    this.isEditing = false;
    this.userForm = {
      userId: this.getNextUserId(),
      username: '',
      password: '',
      role: '',
      email: '',
      phoneNumber: '',
      isActive: true,
    };
    this.isModalVisible = true;
  }

  openEditUserModal(user: any) {
    this.isEditing = true;
    this.userForm = { ...user };
    this.isModalVisible = true;
  }

  closeUserModal() {
    this.isModalVisible = false;
    this.successMessage = '';
  }

  submitUserForm() {
    const apiCall = this.isEditing
      ? this.adminService.updateUser(this.userForm.userId, this.userForm)
      : this.adminService.createUser(this.userForm);

    apiCall.subscribe(() => {
      this.fetchUsers();
      this.successMessage = this.isEditing ? 'User updated successfully!' : 'User created successfully!';
      setTimeout(() => (this.successMessage = ''), 3000);
      this.closeUserModal();
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure?')) {
      this.adminService.deleteUser(userId).subscribe(() => {
        this.fetchUsers();
        this.successMessage = 'User deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      });
    }
  }

  getNextUserId(): number {
    if (this.users.length === 0) return 1;
    return Math.max(...this.users.map((user) => user.userId)) + 1;
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
    this.router.navigate([`/admin/${view}`]);
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

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe((data: any[]) => {
      this.appointments = data;
    }, error => {
      console.error('Error fetching appointments:', error);
    });
  }

  
  loadFeedback(): void {
    this.FeedbackService.getfeedback().subscribe((data: any[]) => {
      this.feedback = data;
    }, error => {
      console.error('Error fetching feedback:', error);
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
