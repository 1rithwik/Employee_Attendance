// import { bootstrapApplication } from '@angular/platform-browser';
// // import { AppComponent } from './app/app.component';
// import { importProvidersFrom } from '@angular/core';
// import { AppRoutingModule } from './app/app-routing.module';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// // import { provideRouter } from '@angular/router';
// // import { routes } from './app/app-routing.module';

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(
//       BrowserModule,
//       BrowserAnimationsModule,
//       AppRoutingModule,
//     ),
//     // provideRouter(routes)
//   ]
// }).catch(err => console.error(err));

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));