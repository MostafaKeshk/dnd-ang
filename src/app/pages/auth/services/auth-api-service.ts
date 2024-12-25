import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private authEndpoint = '/auth'; // Auth-specific endpoint

  constructor(private apiService: ApiService) {}

  // Login request
  login(credentials: { email: string; password: string }): Promise<any> {
    return this.apiService.postData(`${this.authEndpoint}/login`, credentials);
  }

  // Signup request
  signup(credentials: {
    name: string;
    email: string;
    password: string;
  }): Promise<any> {
    return this.apiService.postData(
      `${this.authEndpoint}/register`,
      credentials
    );
  }
}
