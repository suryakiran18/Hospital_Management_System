import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientserviceService {
  private apiUrl = 'http://localhost:8091/patients'; 

  constructor(private http: HttpClient) { }

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  createPatient(patient: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/create`, patient, {
      responseType: 'text' as 'json',
    });
  }

  updatePatient(patientId: number, patientData: any) {
    return this.http.put(`${this.apiUrl}/update/${patientId}`, patientData, {
      responseType: 'text',
    });
  }

  deletePatient(patientId: number) {
    return this.http.delete(`${this.apiUrl}/delete/${patientId}`, {
      responseType: 'text',
    });
  }
}