import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Constant } from '../Components/Constant/constant';
import { jwtDecode } from 'jwt-decode';

interface User {
  email: string;  
  password: string;
}

interface NewUser {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) {}

  // Login method
  login(userData: User): Observable<any> {
    return this.http.post(Constant.BASE_URI + Constant.LOGIN, userData).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(error);
      })
    );
  }

  // Token operations
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  // Decode JWT
  decodeToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  // Get token expiry
  getTokenExpiry(): Date | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.exp) {
      return new Date(decodedToken.exp * 1000);
    }
    return null;
  }

  // Get user role
  getRole(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.Role) {
      return decodedToken.Role;
    }
    return null;
  }

  // Register new user
  registerUser(newUserData: NewUser): Observable<any> {
    return this.http.post(`${Constant.BASE_URI + Constant.Register}`, newUserData);
  }
  registerManager(newUserData: NewUser): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${Constant.BASE_URI}Auth/admin/register`, newUserData, { headers });
  }

  // Get all customers
  getCustomers(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${Constant.BASE_URI}User`, { headers });
  }

  // Get all hotels
  getHotels(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${Constant.BASE_URI}Hotel`, { headers });
  }

  // Get all categories
  getCategories(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${Constant.BASE_URI}Category`, { headers });
  }

  // Get all bookings
  getBookings(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${Constant.BASE_URI}Booking`, { headers });
  }

  // Get all reviews
  getReviews(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${Constant.BASE_URI}Review`, { headers });
  }

  // ✅ Get total users (Admin)
  // getTotalUsers(): Observable<{ totalUsers: number }> {
  //   const token = this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<{ totalUsers: number }>(`${Constant.BASE_URI}User/total-users`, { headers });
  // }

  // ✅ Get users by role (Admin)
  getUsersByRole(role: string): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${Constant.BASE_URI}User/admin/users-by-role?role=${role}`, { headers });
  }
  
}
