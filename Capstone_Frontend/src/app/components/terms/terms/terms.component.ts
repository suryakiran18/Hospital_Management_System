import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { RouterModule } from '@angular/router'; // Required for routerLink

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [FormsModule, RouterModule], // Import FormsModule and RouterModule
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'] // Fixed typo: styleUrl -> styleUrls
})
export class TermsComponent {
  isAgreed = false;
}
