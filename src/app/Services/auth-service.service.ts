import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constant } from '../Components/Constant/constant';

interface AuthResponse {
  token: string;
  userId: number;
  role: string;
}
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
export class AuthServiceService {
  private baseUrl = 'https://localhost:7140/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        map(response => {
          this.saveToken(response.token);
          this.isAuthenticatedSubject.next(true);
          return response;
        })
      );
  }

  signup(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, userData)
      .pipe(
        map(response => {
          this.saveToken(response.token);
          this.isAuthenticatedSubject.next(true);
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  registerUser(newUserData: NewUser): Observable<any> {
    return this.http.post(`${Constant.BASE_URI + Constant.Register}`, newUserData);
  }
  registerManager(newUserData: NewUser): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${Constant.BASE_URI}Auth/admin/register`, newUserData, { headers });
  }
}
