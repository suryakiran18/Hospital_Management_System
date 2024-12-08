import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorserviceService {
  private apiUrl = 'http://localhost:8091/doctors'; 

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

createDoctor(doctor: any): Observable<string> {
  return this.http.post<string>(`${this.apiUrl}/create`, doctor, {
    responseType: 'text' as 'json', 
  });
}

  updateDoctor(doctorId: number, doctorData: any) {
    return this.http.put(`${this.apiUrl}/update/${doctorId}`, doctorData, {
      responseType: 'text', 
    });
  }

  deleteDoctor(doctorId: number) {
    return this.http.delete(`${this.apiUrl}/delete/${doctorId}`, {
      responseType: 'text', 
    });
  }
}