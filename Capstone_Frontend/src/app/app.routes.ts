import { Routes } from '@angular/router';
import { LogininterfaceComponent } from './components/logininterface/logininterface/logininterface.component';
import { LoginComponent } from './components/login/login/login.component';
import { TermsComponent } from './components/terms/terms/terms.component';
import { AdminComponent } from './components/admin-components/admin/admin.component';
import { DoctorComponent } from './components/doctor-components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient/patient.component';
import { PatientservicesComponent } from './components/patient-services-components/patientservices/patientservices.component';
import { DoctorDashboardComponent } from './components/doctor-components/doctor-dashboard/doctor-dashboard.component';
import { AppointmentsComponent } from './components/doctor-components/appointments/appointments.component';
import { InventoryComponent } from './components/doctor-components/inventory/inventory.component';
import { PatientsComponent } from './components/doctor-components/patients/patients.component';
import { PatientDashboardComponent } from './components/patient-services-components/patient-dashboard/patient-dashboard.component';
import { PatientAppointmentsComponent } from './components/patient-services-components/patient-appointments/patient-appointments.component';
import { PatientFeedbackComponent } from './components/patient-services-components/patient-feedback/patient-feedback.component';
import { AdminDashboardComponent } from './components/admin-components/admin-dashboard/admin-dashboard.component';
import { AdminAppointmentsComponent } from './components/admin-components/admin-appointments/admin-appointments.component';
import { AdminUsersComponent } from './components/admin-components/admin-users/admin-users.component';
import { AdminDoctorsComponent } from './components/admin-components/admin-doctors/admin-doctors.component';
import { AdminPatientsComponent } from './components/admin-components/admin-patients/admin-patients.component';
import { AdminFeedbackComponent } from './components/admin-components/admin-feedback/admin-feedback.component';
import { PatientsMedicalhostoryComponent } from './components/patient-services-components/patients-medicalhostory/patients-medicalhostory.component';
import { AuthGuard } from './auth.guard';



export const routes: Routes = [
  { path: '', component: LogininterfaceComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }, 
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'doctors', component: AdminDoctorsComponent },
      { path: 'patients', component: AdminPatientsComponent },
      { path: 'appointments', component: AdminAppointmentsComponent },
      { path: 'feedback', component: AdminFeedbackComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { 
    path: 'patient', 
    component: PatientComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Patient'] }, 
  },
  { 
    path: 'doctor', 
    component: DoctorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Doctor'] }, 
    children: [
      { path: 'dashboard', component: DoctorDashboardComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'patients', component: PatientsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { 
    path: 'services', 
    component: PatientservicesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Patient'] },
    children: [
      { path: 'dashboard', component: PatientDashboardComponent },
      { path: 'appointments', component: PatientAppointmentsComponent },
      { path: 'feedback', component: PatientFeedbackComponent },
      { path: 'medicalhistory', component: PatientsMedicalhostoryComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
