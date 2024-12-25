import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://jobzella-server.vercel.app/api'; // Base URL for API requests

  constructor(private http: HttpClient) {}

  getData<T>(endpoint: string): Promise<T> {
    return firstValueFrom(this.http.get<T>(`${this.baseUrl}${endpoint}`));
  }

  postData<T>(endpoint: string, data: any): Promise<T> {
    return firstValueFrom(
      this.http.post<T>(`${this.baseUrl}${endpoint}`, data)
    );
  }

  updateData<T>(endpoint: string, id: number, data: any): Promise<T> {
    return firstValueFrom(
      this.http.put<T>(`${this.baseUrl}${endpoint}/${id}`, data)
    );
  }

  put<T>(endpoint: string, data: any): Promise<T> {
    return firstValueFrom(this.http.put<T>(`${this.baseUrl}${endpoint}`, data));
  }

  deleteData<T>(endpoint: string, id: number): Promise<T> {
    return firstValueFrom(
      this.http.delete<T>(`${this.baseUrl}${endpoint}/${id}`)
    );
  }
}
