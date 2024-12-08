import { Component,HostListener,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { AppointmentService } from '../../../services/appointmentservice/appointment.service';
@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {

  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  isScrolled: boolean = false;
  loggedInUser: { username: string; role: string } | null = null;

  constructor(private router: Router,    private appointmentService: AppointmentService,) {}

  ngOnInit(): void {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    alert('Logged out!');
  }

  openLink() {
    window.open('https://meet.google.com/kgv-wxbj-yju', '_blank');
  }

  // Scroll to the section
  scrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Handle form submission
  onSubmit() {
    this.appointmentService.sendContactForm(this.contactData)
      .subscribe(
        response => {
          console.log('Message sent successfully:', response);
          alert('Your message has been sent. We will get back to you soon!');
        },
        error => {
          console.error('Error sending message:', error);
          alert('There was an error sending your message. Please try again later.');
        }
      );

      this.contactData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    }


  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  
}