import { Component } from '@angular/core';
import { AppService } from '../app/app.service';
import { Router } from '@angular/router';

export interface FilterDetails{
  employeeId:Number;
  empName:String;
  empEmail:String;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  profileDetails:any;
  showDetails:string='home';
  timer:number=0;
  timerInterval:any;
  timeSinceLastLogin: string = ''; // Variable to hold the time difference

  filterProfileDetails : FilterDetails ={
    employeeId:0,
    empName:'',
    empEmail:''
  };

  isEditMode = false; // toggle edit form visibility
  editForm = {
    empId: 0,
    empPhone: '',
    empEmail: ''
  };

  constructor(private appservice: AppService, private router: Router) {
    //this.profileDetails = this.appservice.getLoginResponse();
    console.log(localStorage.getItem('lastLoginTime'));
    
  }

  ngOnInit(){
      this.loadUserDetails();
  }

  loadUserDetails(){
    this.profileDetails = {
      employeeId:Number(localStorage.getItem('employeeId')),
      empName: localStorage.getItem('empName'),
      empEmail: localStorage.getItem('empEmail'),
      empPhone: localStorage.getItem('empPhone'),
      lastLoginTime: localStorage.getItem('lastLoginTime'),
      loginStatus: localStorage.getItem('loginStatus'),
      role:localStorage.getItem('role'),
      lateAttendCount: Number(localStorage.getItem('lateAttendCount')),
      earlyLeaveCount: Number(localStorage.getItem('earlyLeaveCount'))
    };

    this.profileDetails.lastLoginTime=new Date(this.profileDetails.lastLoginTime);
    console.log(typeof this.profileDetails.lastLoginTime);
    //console.log(this.profileDetails.empName);
    if (this.profileDetails.loginStatus==='true') {
      this.calculateTimeSinceLastLogin();
    }
    console.log(this.profileDetails);
  }

  calculateTimeSinceLastLogin() {
    const lastLoginTimeString = localStorage.getItem('lastLoginTime');
    if (lastLoginTimeString) {
      const lastLoginTime = new Date(lastLoginTimeString);
      const currentTime = new Date();
      this.timer = Math.floor((currentTime.getTime() - lastLoginTime.getTime())/1000);
      this.startTimer();
      console.log(lastLoginTime,currentTime,this.timer);
    }
  }

  isLoggedIn = localStorage.getItem('loginStatus')==='true'?true:false;

  showProfileDetails(){
    this.showDetails='profile';
  }
  showHomeButton(){
    this.showDetails='home';
  }

  signIn(){
    this.filterProfileDetails.empEmail=this.profileDetails.empEmail;
    this.filterProfileDetails.empName=this.profileDetails.empName;
    this.filterProfileDetails.employeeId=this.profileDetails.employeeId;
    this.appservice.signInToWork(this.profileDetails).subscribe( 
      (response:any)=> {
          console.log('Signed in successfully');
          alert('You are into work');
          this.isLoggedIn=!this.isLoggedIn;
          this.profileDetails.loginStatus="true";
          localStorage.setItem('loginStatus', "true");
          this.startTimer();
      },
      (error: any) => {
        console.error('Sign in failed');
        alert(error);
      });
    }

    signOut(){

      this.filterProfileDetails.empEmail=this.profileDetails.empEmail;
      this.filterProfileDetails.empName=this.profileDetails.empName;
      this.filterProfileDetails.employeeId=this.profileDetails.employeeId;
      this.appservice.signOutToWork(this.profileDetails).subscribe(
        (response:any) =>{
          console.log(response);
          alert('You are out from work');
          this.isLoggedIn=!this.isLoggedIn;
          this.profileDetails.loginStatus="false";
          localStorage.setItem('loginStatus', "false");
          this.resetTimer();
        },
        (error:any) =>{
          console.log(error);
        }
      )
    }

    logout() {
      // Clear user data from local storage
      localStorage.clear();
  
      // Navigate to the login page
      this.router.navigate(['/login']);
    }

    startTimer() {
      //this.timer = 0; // Reset timer to 0
      this.timerInterval = setInterval(() => {
        this.timer++; // Increment timer every second
      }, 1000);
    }

    resetTimer() {
      clearInterval(this.timerInterval); // Clear the interval
      this.timer = 0; // Reset timer to 0
    }

    formatTimer(): string {
      const hours = Math.floor(this.timer / 3600);
      const minutes = Math.floor((this.timer % 3600) / 60);
      const seconds = this.timer % 60;
      return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    }

    pad(value: number): string {
      return value < 10 ? '0' + value : value.toString();
    }

    editDetails() {
      this.isEditMode = true;
      this.editForm.empId = this.profileDetails.employeeId;
      this.editForm.empPhone = '';
      this.editForm.empEmail = '';
    }

    saveDetails() {
      const updatedDetails = {
        employeeId: this.editForm.empId, // Assuming employeeId is the userId
        empPhone: this.editForm.empPhone,
        empEmail: this.editForm.empEmail
      };
  
      this.appservice.editEmployee(updatedDetails).subscribe(
        (response) => {
          alert('Details updated successfully!');
          this.profileDetails.empPhone = this.editForm.empPhone;
          this.profileDetails.empEmail = this.editForm.empEmail;
          this.isEditMode = false; // Hide form after saving
        },
        (error) => {
          console.error('Error updating details:', error);
          if(error.status === 406){
            alert('Error updating details: '+ error.error || 'Invalid input for email or phone number!');
          }
          else{
            alert('An unexpected error occurred. Please try again later.');
          }
        }
      );
    }

    cancelEdit() {
      this.isEditMode = false;
    }
}
