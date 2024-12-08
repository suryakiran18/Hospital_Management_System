import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogininterfaceComponent } from './logininterface.component';

describe('LogininterfaceComponent', () => {
  let component: LogininterfaceComponent;
  let fixture: ComponentFixture<LogininterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogininterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogininterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
