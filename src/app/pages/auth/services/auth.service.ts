import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiService } from './auth-api-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token'; // Key for the auth token in cookies
  private userKey = 'auth_user'; // Key for user info in cookies

  isLoggedIn = signal<boolean>(false); // Reactive login state
  currentUser = signal<any>(null); // Reactive current user state

  constructor(
    private authApiService: AuthApiService, // Inject the Auth API service
    private cookieService: CookieService // Inject cookie service for token handling
  ) {
    const tokenExists = this.hasToken();
    this.isLoggedIn.set(tokenExists); // Set login state based on token presence
    if (tokenExists) {
      const user = this.getUserFromCookie();
      this.currentUser.set(user); // Set user info from cookies if token exists
    }
  }

  // Login using the Auth API service
  async login(credentials: { email: string; password: string }): Promise<void> {
    return this.authApiService
      .login(credentials)
      .then((response) => this.handleLoginResponse(response))
      .catch((error) => console.error('Login error:', error));
  }

  // Signup using the Auth API service
  async signup(credentials: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> {
    return this.authApiService
      .signup(credentials)
      .then((response) => this.handleLoginResponse(response))
      .catch((error) => console.error('Signup error:', error));
  }

  // Logout by clearing cookies and resetting state
  logout(): void {
    this.cookieService.delete(this.tokenKey, '/');
    this.cookieService.delete(this.userKey, '/');
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
  }

  // Handle login response by setting token and user data in cookies
  private handleLoginResponse(response: { token: string; user: any }): void {
    console.log({ response });
    this.setToken(response.token);
    this.setUser(response.user);
  }

  // Set token in cookies
  private setToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, 1, '/'); // Save token with 1-day expiry
    this.isLoggedIn.set(true); // Update login state
  }

  // Set user information in cookies
  private setUser(user: any): void {
    this.cookieService.set(this.userKey, JSON.stringify(user), 1, '/'); // Save user info with 1-day expiry
    this.currentUser.set(user); // Update current user state
  }

  // Retrieve user info from cookies
  private getUserFromCookie(): any {
    const user = this.cookieService.get(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  // Check if the auth token exists in cookies
  private hasToken(): boolean {
    return this.cookieService.check(this.tokenKey);
  }

  // Retrieve the auth token from cookies
  getToken(): string | null {
    return this.cookieService.get(this.tokenKey) || null;
  }
}
