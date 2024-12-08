import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientservicesComponent } from './patientservices.component';

describe('PatientservicesComponent', () => {
  let component: PatientservicesComponent;
  let fixture: ComponentFixture<PatientservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientservicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
