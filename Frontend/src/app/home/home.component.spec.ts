// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HomeComponent } from './home.component';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HomeComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AppService } from '../app/app.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Mock the AppService
class MockAppService {
  signInToWork() {
    return of({ message: 'Signed in successfully' });
  }

  signOutToWork() {
    return of({ message: 'Signed out successfully' });
  }

  editEmployee() {
    return of({ message: 'Details updated successfully!' });
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let appService: AppService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: AppService, useClass: MockAppService },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load user details on init', () => {
    spyOn(component, 'loadUserDetails').and.callThrough();
    component.ngOnInit();
    expect(component.loadUserDetails).toHaveBeenCalled();
    expect(component.profileDetails).toBeDefined();
  });

  it('should calculate time since last login', () => {
    const lastLoginTime = new Date().toISOString();
    localStorage.setItem('lastLoginTime', lastLoginTime);
    spyOn(component, 'calculateTimeSinceLastLogin').and.callThrough();

    component.loadUserDetails();
    component.calculateTimeSinceLastLogin();
    expect(component.calculateTimeSinceLastLogin).toHaveBeenCalled();
    expect(component.timer).toBeGreaterThanOrEqual(0);
  });

  it('should toggle isLoggedIn based on login status', () => {
    localStorage.setItem('loginStatus', 'true');
    component.loadUserDetails();
    expect(component.isLoggedIn).toBeTrue();

    localStorage.setItem('loginStatus', 'false');
    component.loadUserDetails();
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should call signInToWork and update login status', () => {
    spyOn(appService, 'signInToWork').and.callThrough();
    component.signIn();
    expect(appService.signInToWork).toHaveBeenCalled();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should call signOutToWork and update login status', () => {
    spyOn(appService, 'signOutToWork').and.callThrough();
    component.signOut();
    expect(appService.signOutToWork).toHaveBeenCalled();
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should clear localStorage and navigate to login page on logout', () => {
    spyOn(localStorage, 'clear');
    component.logout();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should toggle isEditMode when editDetails is called', () => {
    component.editDetails();
    expect(component.isEditMode).toBeTrue();
  });

  it('should save updated details when saveDetails is called', () => {
    const updatedDetails = { employeeId: 1, empPhone: '1234567890', empEmail: 'test@example.com' };
    spyOn(appService, 'editEmployee').and.callThrough();
    component.saveDetails();
    expect(appService.editEmployee).toHaveBeenCalled();
    expect(component.profileDetails.empPhone).toEqual(updatedDetails.empPhone);
    expect(component.profileDetails.empEmail).toEqual(updatedDetails.empEmail);
  });

  it('should cancel editing when cancelEdit is called', () => {
    component.cancelEdit();
    expect(component.isEditMode).toBeFalse();
  });
});
