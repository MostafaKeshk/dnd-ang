import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../pages/auth/services/auth.service';
import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject AuthService
  const authToken = authService.getToken(); // Get the token from AuthService

  const authReq = authToken
    ? req.clone({
        setHeaders: { Authorization: `${authToken}` }, // Attach token to Authorization header
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['auth/login']);
        // console.error('Unauthorized request - Redirecting to login');
      }
      return throwError(() => error); // Handle other errors globally
    })
  );
};
