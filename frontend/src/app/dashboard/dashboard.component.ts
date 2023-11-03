import { Component } from '@angular/core';
import { UserService } from "../user.service";
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationDialogComponent } from "./register-course.component";
import { LogTimeDialogComponent } from "./log-time.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  availableCourses: any[] = [];
  currentCourses: any[] = [];
  constructor(private userService: UserService, private router: Router, private studentService: StudentService, public dialog: MatDialog) {}

  ngOnInit() {
    if (this.userService.hasRole('ROLE_student')){
      this.getAvailableCourses();
      this.getRegisteredCourses();
    }
    
  }

  refresh() {
    if (this.userService.hasRole('ROLE_student')){
      this.getAvailableCourses();
      this.getRegisteredCourses();
    }
  }

  getAvailableCourses() {
    this.studentService.getAllAvailableCourses(this.userService.getUserId()).subscribe(data => {
      this.availableCourses = data;
    });
  }

  getRegisteredCourses() {
    this.studentService.getAllRegisteredCourses(this.userService.getUserId()).subscribe(data => {
      this.currentCourses = data;
    });
  }

  logout(): void {
    // Call your authentication service logout method
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  hasRole(role: string): boolean {
    return this.userService.hasRole(role);
  }

  isTimesheetRoute(): boolean {
    return this.router.url.includes('/dashboard/timesheet');
  }

  openRegistrationDialog(course: any): void {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      width: '250px',
      data: { course: course }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Perform the registration logic here
        console.log('Student registered for the course');
        this.getAvailableCourses();
        this.getRegisteredCourses();
      }
    });
  }

  openLogTimeDialog(course: any): void {
    const dialogRef = this.dialog.open(LogTimeDialogComponent, {
      width: '400px',
      data: { course: course }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Perform the registration logic here
        console.log('Log time done!');
        this.getRegisteredCourses();
      }
    });
  }
}
