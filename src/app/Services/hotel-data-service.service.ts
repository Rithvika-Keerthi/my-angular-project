import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../Models/room.model';
import { Hotel } from '../Models/Hotel.model';

interface SearchParams {
  checkIn?: string;
  checkOut?: string;
  location?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HotelDataServiceService {
  private baseUrl = 'https://localhost:7140/api';

  constructor(private http: HttpClient) {}

  fetchAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}/Hotel`);
  }

  fetchFilteredHotels(searchParams: SearchParams): Observable<Hotel[]> {
    let params = new HttpParams();
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key as keyof SearchParams]) {
        params = params.append(key, searchParams[key as keyof SearchParams]!);
      }
    });
    return this.http.get<Hotel[]>(`${this.baseUrl}/Hotel/search`, { params });
  }

  getRoomsByHotelId(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/Room/Hotel/${hotelId}`);
  }
}
