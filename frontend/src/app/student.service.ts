import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8080/api/students'; // Replace with your actual API URL

  constructor(private http: HttpClient, private userService: UserService) {}

  createStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, student).pipe(
      catchError(this.handleError)
    );
  }

  getAllAvailableCourses(studentId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${studentId}/availablecourses`, { withCredentials: true,headers: this.userService.getHeaders() });
  }

  getAllRegisteredCourses(studentId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${studentId}/registeredcourses`, { withCredentials: true,headers: this.userService.getHeaders() });
  }

  registerCourse(studentId:number, courseId:number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/${studentId}/registerCourse/${courseId}`, null, { withCredentials: true,headers: this.userService.getHeaders() });
  }
  
  private handleError(error: HttpErrorResponse) {
    // Log the error to the console (you might want to log it to a server)
    console.error('An error occurred:', error.error);

    // Return an observable with a user-facing error message
    return throwError(error.error);
  }
  
}
