import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuardService implements CanActivate {

  constructor(private router: Router, private registerService: RegisterService) {}

  canActivate(): boolean {
    if (!this.registerService.canRegister()) {
      this.router.navigate(['/some-other-page']); // Redirect if not allowed
      return false;
    }
    return true;
  }
} 