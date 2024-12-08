import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8091/appointments';

  constructor(private http: HttpClient) { }

  // Fetch all appointments
  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Create a new appointment
  createAppointment(appointment: any){
    return this.http.post<any>(`${this.apiUrl}/create`, appointment,
      { responseType: 'text' as 'json', });
    
    
  }

  // Update an existing appointment
  updateAppointment(appointmentId: number, appointment: any) {
    return this.http.put<any>(`${this.apiUrl}/update/${appointmentId}`, appointment ,
      { responseType: 'text' as 'json', });
    
  }

  rejectAppointment(appointmentId: number): Observable<string> {
    return this.http.put<string>(
      `${this.apiUrl}/reject/${appointmentId}`,
      {},
      { responseType: 'text' as 'json' }
    );
  }
  

  // Delete an appointment
  deleteAppointment(appointmentId: number){
    return this.http.delete(`${this.apiUrl}/delete/${appointmentId}`, 
      { responseType: 'text' });
  }
  approveAppointment(appointmentId: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/approve/${appointmentId}`, {},
      {responseType: 'text' as 'json'}
    );
  }
  sendSOS(appointmentId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/sendSOS/${appointmentId}`, {});
  }

    // Send the contact form data to the backend
    sendContactForm(contactData: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/contact`, contactData,
        { responseType: 'text' as 'json' });
    }
 
}
