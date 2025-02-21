import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7265';

  constructor(private http: HttpClient) {}

  signIn(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials,{ withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  signUp(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  getToken(): string {
    return localStorage.getItem('access_token')!; 
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/user/profile`).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }


  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<any>(`${this.baseUrl}/refresh-token`, { refreshToken }).pipe(
      switchMap((tokens: any) => {
        localStorage.setItem('access_token', tokens.accessToken);
        localStorage.setItem('refresh_token', tokens.refreshToken);
        return tokens;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
