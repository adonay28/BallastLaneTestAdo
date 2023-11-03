import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8080/api/courses'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient, private userService: UserService) {}

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { withCredentials: true,headers: this.userService.getHeaders() });
  }

  getCourseById(courseId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${courseId}`, { withCredentials: true, headers: this.userService.getHeaders() });
  }

  createCourse(course: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, course, { withCredentials: true, headers: this.userService.getHeaders() });
  }

  updateCourse(courseId: number, updatedCourse: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${courseId}`, updatedCourse, { withCredentials: true, headers: this.userService.getHeaders() });
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${courseId}`, { withCredentials: true, headers: this.userService.getHeaders() });
  }
}
