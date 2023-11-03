import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private apiUrl = 'http://localhost:8080/api/timesheet'; // Replace with your actual API URL

  constructor(private http: HttpClient, private userService: UserService) {}


  createLogtime(timesheet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, timesheet, { withCredentials: true, headers: this.userService.getHeaders() });
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`, { withCredentials: true,headers: this.userService.getHeaders() });
  }

  getTimesheet(studentId: number, courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${courseId}/${studentId}`, { withCredentials: true,headers: this.userService.getHeaders() });
  }

  deleteTimesheet(timesheetId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${timesheetId}`, { withCredentials: true, headers: this.userService.getHeaders() });
  }
}
