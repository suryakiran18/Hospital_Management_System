import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsMedicalhostoryComponent } from './patients-medicalhostory.component';

describe('PatientsMedicalhostoryComponent', () => {
  let component: PatientsMedicalhostoryComponent;
  let fixture: ComponentFixture<PatientsMedicalhostoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsMedicalhostoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsMedicalhostoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
