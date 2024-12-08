import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {
  currentQuote = 'Medicine cure Diseases but only YOU can cure patients!';
}
