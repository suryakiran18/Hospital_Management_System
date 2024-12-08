import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://localhost:8091/feedback'; 

  constructor(private http: HttpClient) { }


  getfeedback(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  createFeedback(feedback: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, feedback);
  }
  
}

