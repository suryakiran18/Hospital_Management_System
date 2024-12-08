import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from '../../../services/inventoryservice/inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ InventoryService ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})

export class InventoryComponent  implements OnInit{
  users: any[] = [];
  doctors: any[] = [];
  appointments: any[] = [];
  feedback :any[]=[];
  inventoryItems :any[]=[];
 
  
  userForm = { userId: 0, username: '', password: '', role: '', email: '', phoneNumber: '', isActive: true };
  doctorForm = { doctorId: 0, name: '', specialization: '', contactInfo: '', availability: '', department: true };
  
  ngOnInit(): void {
    this.fetchInventory();
   
   
   
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
      console.log('Logged-in User:', this.loggedInUser);
  
    } else {
      this.router.navigate(['/login']);
    }
  }
 
  inventoryForm = { 
    itemId: 0, 
    name: '', 
    category: '', 
    quantity: 0 
  };
  

  isEditing = false;
  isEditingDoctor = false;
  isEditingPatient = false;
  isModalVisible = false;
  isDoctorModalVisible = false;
  isPatientModalVisible = false;
  successMessage = '';
  currentView = 'dashboard';
  currentQuote = 'Medicine cure Diseases but only YOU can cure patients!';
  loggedInUser: { username: string; role: string } | null = null;
  patients: any[] = [];

  constructor(
 
    private inventoryService : InventoryService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}



// Inventory Methods
fetchInventory() {
  this.inventoryService.getItems().subscribe((inventoryItems) => {
    this.inventoryItems = inventoryItems;
    this.cdr.detectChanges();
  });
}

openCreateInventoryModal() {
  this.isEditing = false;
  this.inventoryForm = {
    itemId: this.getNextItemId(), // Dynamically generate next ID
    name: '',
    category: '',
    quantity: 0,
  };
  this.isModalVisible = true;
}

openEditInventoryModal(item: any) {
  this.isEditing = true;
  this.inventoryForm = { ...item };
  this.isModalVisible = true;
}

closeInventoryModal() {
  this.isModalVisible = false;
  this.successMessage = '';
}

submitInventoryForm() {
  const apiCall = this.isEditing
    ? this.inventoryService.updateItem(this.inventoryForm.itemId, this.inventoryForm)
    : this.inventoryService.createItem(this.inventoryForm);

  apiCall.subscribe(() => {
    this.fetchInventory();
    this.successMessage = this.isEditing ? 'Item updated successfully!' : 'Item created successfully!';
    setTimeout(() => (this.successMessage = ''), 3000);
    this.closeInventoryModal();
  });
}

deleteInventory(itemId: number) {
  if (confirm('Are you sure?')) {
    this.inventoryService.deleteItem(itemId).subscribe(() => {
      this.fetchInventory();
      this.successMessage = 'Item deleted successfully!';
      setTimeout(() => (this.successMessage = ''), 3000);
    });
  }
}

getNextItemId(): number {
  if (!this.inventoryItems || this.inventoryItems.length === 0) return 1;
  return Math.max(...this.inventoryItems.map((item) => item.itemId)) + 1;
}



  // Navigation Methods
  navigateTo(view: string) {
    this.currentView = view;
  }

  
  

  
  
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    alert('Logged out!');
  }
}


