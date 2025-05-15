import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NgChartsModule } from 'ng2-charts';  // <-- Add this line
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
 
bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideHttpClient()
    ]
  }).catch((err) => console.error(err));