// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { LoginComponent } from './login.component';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AppService } from '../app/app.service'; // Import your service
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let appService: AppService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ AppService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form with valid data', () => {
    // Mock the login response
    const mockResponse = {
      token: 'mock-token',
      LoginUser: {
        employeeId: 1,
        empName: 'Test User',
        role: 'ADMIN',
        empPhone: '1234567890',
        empEmail: 'test@example.com',
        empPassword: 'password123',
        lastLoginTime: '2024-12-24',
        loginStatus: 'active',
        lateAttendCount: 2,
        earlyLeaveCount: 3
      }
    };

    spyOn(appService, 'loginUser').and.returnValue(of(mockResponse));
    spyOn(router, 'navigate');

    // Set up form values
    component.loginData = { empName: 'Test User', empPassword: 'password123' };

    // Call the onFormSubmit method
    component.onFormSubmit();

    // Check if the localStorage is updated correctly
    expect(localStorage.getItem('jwtToken')).toBe('mock-token');
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.LoginUser));

    // Check if navigation occurs after successful login
    expect(router.navigate).toHaveBeenCalledWith(['/adminDashboard']);
  });

  it('should handle login failure', () => {
    const errorResponse = { error: 'Invalid credentials' };
    spyOn(appService, 'loginUser').and.returnValue(of(errorResponse));
    spyOn(window, 'alert');

    component.loginData = { empName: 'wrongUser', empPassword: 'wrongPassword' };
    component.onFormSubmit();

    // Check if the alert is called
    expect(window.alert).toHaveBeenCalledWith('Login failed. Please try again.');
  });

  it('should disable the submit button when form is invalid', () => {
    // Initially, the form should be invalid
    component.loginData = { empName: '', empPassword: '' };
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();

    // After setting valid data, the form should be valid
    component.loginData = { empName: 'Test User', empPassword: 'password123' };
    fixture.detectChanges();
    expect(button.disabled).toBeFalsy();
  });
});
