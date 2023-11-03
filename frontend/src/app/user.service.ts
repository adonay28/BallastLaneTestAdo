import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/authenticate';
  private authenticated = false;
  private credentials: string = '';
  private userRoles: string[] = [];
  private userData: any = {};

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    this.credentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(username + ':' + password)
    });

    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    return this.http.post<any>(this.apiUrl, body, { headers,withCredentials: true });
  }

  setRoles(roles: any[]): void {
    this.userRoles = [];
    roles.forEach(role => {
      this.userRoles.push(role.authority);
    });
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  logout(): void {
    this.authenticated = false;
    this.credentials = '';
    this.userRoles = [];
    this.userData = {};
  }

  setAuthenticationStatus(status: boolean): void {
    this.authenticated = status;
  }

  setUserData(data: any): void {
    this.userData = data;
  }

  getUserId(): number {
    return this.userData.id;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getHeaders(): { [key: string]: string } {
    return {
      Authorization: `Basic ${this.credentials}`,
    };
  }
}