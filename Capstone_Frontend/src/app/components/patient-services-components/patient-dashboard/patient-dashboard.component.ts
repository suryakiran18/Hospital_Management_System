import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent {
  currentView = 'dashboard';
  currentQuote = 'Have a Wonderful Day!';
}
