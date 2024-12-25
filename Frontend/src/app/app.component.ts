import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterModule } from '@angular/router';
// import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet, RouterLink, RouterLinkActive, BrowserAnimationsModule, RouterModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IAM ATTENDEE';
  constructor(private router: Router) {
    //localStorage.clear();
  }
}