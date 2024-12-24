// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AdminDashboardComponent } from './admin-dashboard.component';

// describe('AdminDashboardComponent', () => {
//   let component: AdminDashboardComponent;
//   let fixture: ComponentFixture<AdminDashboardComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AdminDashboardComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AdminDashboardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AppService } from '../app/app.service';
import { of } from 'rxjs';

// Mock the AppService
class MockAppService {
  getEmployees() {
    return of([
      { employeeId: 1, empName: 'John Doe', role: 'Manager', empPhone: '1234567890', empEmail: 'john.doe@example.com', empPassword: 'password123', lastLoginTime: '2024-01-01T10:00:00Z', loginStatus: 'true', lateAttendCount: 0, earlyLeaveCount: 1 },
      { employeeId: 2, empName: 'Jane Smith', role: 'Developer', empPhone: '9876543210', empEmail: 'jane.smith@example.com', empPassword: 'password456', lastLoginTime: '2024-01-02T10:00:00Z', loginStatus: 'false', lateAttendCount: 2, earlyLeaveCount: 0 }
    ]);
  }

  deleteEmployee(employeeId: number) {
    return of({ message: 'Employee deleted successfully' });
  }
}

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let appService: AppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent],
      providers: [
        { provide: AppService, useClass: MockAppService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load employee data on init', () => {
    spyOn(component, 'loadEmployees').and.callThrough();
    component.loadEmployees();
    expect(component.loadEmployees).toHaveBeenCalled();
    expect(component.employees.length).toBeGreaterThan(0);
    expect(component.filteredEmployees).toEqual(component.employees);
  });

  it('should delete employee when deleteEmployee is called', () => {
    const employeeId = component.employees[0].employeeId;
    spyOn(appService, 'deleteEmployee').and.callThrough();
    spyOn(window, 'confirm').and.returnValue(true); // Simulate confirmation

    component.deleteEmployee(0);

    expect(appService.deleteEmployee).toHaveBeenCalledWith(employeeId);
    expect(component.employees.length).toBe(1);
    expect(component.employees[0].employeeId).not.toBe(employeeId);
  });

  it('should not delete employee if user cancels the confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(false); // Simulate cancellation
    const initialLength = component.employees.length;

    component.deleteEmployee(0);

    expect(component.employees.length).toBe(initialLength); // No change in employee list
  });

  it('should filter employees by login status "true"', () => {
    component.filterByStatus('true');
    expect(component.filteredEmployees.length).toBe(1);
    expect(component.filteredEmployees[0].loginStatus).toBe('true');
  });

  it('should filter employees by login status "false"', () => {
    component.filterByStatus('false');
    expect(component.filteredEmployees.length).toBe(1);
    expect(component.filteredEmployees[0].loginStatus).toBe('false');
  });

  it('should show all employees when filter status is "all"', () => {
    component.filterByStatus('all');
    expect(component.filteredEmployees.length).toBe(2);
  });
});
