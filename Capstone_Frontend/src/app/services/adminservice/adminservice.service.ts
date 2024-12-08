import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminserviceService {

  private apiUrl = 'http://localhost:8091/users';  

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${userId}`);
  }

  createUser(user: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/create`, user,{
    responseType: 'text' as 'json', 
  });
  }

  updateUser(userId: number, updatedUser: any): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${userId}`, updatedUser, { responseType: 'text' as 'json' });
  }
}