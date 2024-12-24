import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  // Example method to check registration eligibility
  canRegister(): boolean {
    // Implement your logic here
    return true; // Replace with actual logic
  }
}



// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AdminauthService } from './adminauth.service';
// @Injectable({
//   providedIn: 'root'
// })
// export class AdminauthguardService  implements CanActivate{
//   constructor(private adminAuthService:AdminauthService,private router:Router) { }
//      canActivate() {
//        
//          if(this.adminAuthService.isUserLoggedIn()){
//              return true;
//          }
//          else{
//              this.router.navigate(['adlogin'])
//              return false;
//          }
//            
//      }
// }