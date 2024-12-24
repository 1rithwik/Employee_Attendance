import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,NgModel,ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AppService } from '../app/app.service';
import { trigger, transition, style, animate } from '@angular/animations';

export interface RegistrationForm {
  empName: string;
  empPassword: string;
  empEmail: string;
  empPhone: string;
  role: string;
}

@Component({
  selector: 'app-register',
  // standalone: true,
  // imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('bounce', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('0.5s cubic-bezier(.8,-0.6,0.2,1.5)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class RegisterComponent {
  registrationForm: RegistrationForm = {
    empName: '',
    empPassword: '',
    empEmail: '',
    empPhone: '',
    role: 'USER'
  };

  constructor(private appService: AppService,private router: Router) {}

  onSubmit() {
    if (this.validateForm()) {
      console.log(this.registrationForm);
      this.appService.registerUser(this.registrationForm).subscribe({
        next: (response) => {
          console.log("Registration successful!", response);
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error("Registration failed", error);
          alert('Registration failed. Please try again.');
        }
      });
    }
  }

  private validateForm(): boolean {
    if (!this.registrationForm.empName || !this.registrationForm.empPassword || 
        !this.registrationForm.empEmail || !this.registrationForm.empPhone) {
      alert('Please fill in all required fields');
      return false;
    }
    if (!this.validateEmail(this.registrationForm.empEmail)) {
      alert('Please enter a valid email address');
      return false;
    }
    if (!this.validateMobile(this.registrationForm.empPhone)) {
      alert('Please enter a valid mobile number');
      return false;
    }
    return true;
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validateMobile(mobile: string): boolean {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  }
}