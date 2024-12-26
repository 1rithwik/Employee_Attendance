import { Component } from '@angular/core';
import { AppService } from '../app/app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface LoginForm {
  empName: string;
  empPassword: string;
}

export interface LoginResponse {
  token: string;
  LoginUser:{
    empoyeeId: number;
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
}

@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: LoginForm = {
    empName: '',
    empPassword: '',
  };

  constructor(private appService: AppService, private router: Router) { }
  onFormSubmit() {
    this.appService.loginUser(this.loginData).subscribe(
      (response: any) => {
        
        const token = Object.keys(response)[0];
        const user = response[token];
        console.log(token,"annnnnnnndddddddddd", user);
        if(user && user.role){
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('employeeId',user.employeeId);
          localStorage.setItem('empName',user.empName);
          localStorage.setItem('empPhone', user.empPhone);
          localStorage.setItem('empEmail', user.empEmail);
          localStorage.setItem('empPassword', user.empPassword);
          localStorage.setItem('lastLoginTime', user.lastLoginTime);
          localStorage.setItem('loginStatus', user.loginStatus);
          localStorage.setItem('lateAttendCount', user.lateAttendCount);
          localStorage.setItem('earlyLeaveCount', user.earlyLeaveCount);
          localStorage.setItem('role',user.role);
          console.log("Form submitted successfully!", response);
          console.log(token);
          alert('Login successful!');
          
          if(user.role == 'ADMIN'){
            this.router.navigate(['/adminDashboard']);
          }
          else{
            this.router.navigate(['/home']);
          }
        }

      },
      error => {
        console.error("Error submitting form", error);
        alert('Login failed. Please try again.');
      }
    );
  }
  
}
