import { Component } from '@angular/core';
import { AppService } from '../app/app.service';

export interface employeesList {
  employeeId: number;
  empName: string;
  role: string;
  empPhone: string;
  empEmail: string;
  empPassword: string;
  lastLoginTime: any;
  loginStatus: String;
  lateAttendCount:Number;
  earlyLeaveCount:Number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  employees:employeesList[]=[];
  filteredEmployees: employeesList[] = [];
  filterStatus: string = 'all';

  constructor(private appservice:AppService){
    this.loadEmployees();
  }

  loadEmployees(){
    this.appservice.getEmployees().subscribe((data:any) => {
      this.employees=data;
      console.log(this.employees);
      this.filteredEmployees = [...this.employees];
    },
    (error: any) => {
      console.error('Error:', error);
    }
  );
  }

  deleteEmployee(index: number) {
    console.log(this.employees[index]);
    const curEmp = this.employees[index];
    console.log(curEmp.employeeId,typeof curEmp.employeeId);
    if (confirm('Are you sure you want to delete this employee?')) {
      this.appservice.deleteEmployee(curEmp.employeeId).subscribe(
        (response: any) => {
          alert('Employee deleted successfully.');
          this.employees = this.employees.filter(
            (employee) => employee.employeeId !== curEmp.employeeId
          );
        },
        (error: any) => {
          console.error('Error:', error);
          alert('Failed to delete the employee.');
        }
      );
    }
  }

  filterByStatus(status: string) {
    this.filterStatus = status;
    if (status === 'true') {
      this.filteredEmployees = this.employees.filter(
        (employee) => employee.loginStatus === 'true'
      );
    } else if (status === 'false') {
      this.filteredEmployees = this.employees.filter(
        (employee) => employee.loginStatus === 'false'
      );
    } else {
      this.filteredEmployees = [...this.employees]; // Show all employees
    }
  }
}
