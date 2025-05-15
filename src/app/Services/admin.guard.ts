import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
 
  canActivate(): boolean {
    const userRole = localStorage.getItem('userRole');
   
    if (userRole === 'Admin') {
      return true;
    }
 
    this.router.navigate(['/login']);
    return false;
  }
}
