import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  private apiUrl = 'http://localhost:8091/inventory';

  constructor(private http: HttpClient) {}

  // Fetch all inventory items
  getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  // Delete an inventory item by its ID
  deleteItem(itemId: number) {
    return this.http.delete(`${this.apiUrl}/delete/${itemId}`,{
    responseType: 'text',
    });
  }

 

  // Create a new inventory item
  createItem(item: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/create`, item, {
      responseType: 'text' as 'json',
    });
  }

  // Update an existing inventory item
  updateItem(itemId: number, updatedItem: any): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${itemId}`, updatedItem, {
      responseType: 'text' as 'json',
    });
  }
}
