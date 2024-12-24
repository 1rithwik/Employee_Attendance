import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, LoginResponse } from '../login/login.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'http://localhost:8080'; // Backend URL
  public loginuser:any;

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  loginUser(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  setLoginResponse(response:any){
    this.loginuser=response;
  }

  getLoginResponse(){
    return this.loginuser;
  }

  signInToWork(user:any){
    return this.http.put(`${this.apiUrl}/LogInToWork`, user, {responseType:'text'});
  }

  signOutToWork(user: any) {
    return this.http.put(`${this.apiUrl}/LogOutFromWork`, user, {responseType:'text'});
  }

  getEmployees(){
    return this.http.get(`${this.apiUrl}/employees`);
  }

  deleteEmployee(employeeId:number){
    return this.http.delete(`${this.apiUrl}/employees/${employeeId}`,{responseType:'text'});
  }

  editEmployee(user:any){
    return this.http.put(`${this.apiUrl}/editDetails`, user, {responseType:'text'});
  }

}