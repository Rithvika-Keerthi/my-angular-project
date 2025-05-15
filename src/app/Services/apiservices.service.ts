import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AuthserviceService } from './authservice.service';
@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {
 
 
incomingData = signal<any[]>([]);
 constructor(private http: HttpClient, private authService: AuthserviceService) { }
 
 fetchData() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users', { headers }).subscribe(
      (result) => this.incomingData.set(result)
    );
  }
 
 
 
}