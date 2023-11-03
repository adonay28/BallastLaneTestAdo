import { Component } from '@angular/core';
import { StudentService } from "../student.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent {
  errorMessage: string = '';
  student = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    email: '',
    phoneNumber: '',
  };
  constructor(private studentService: StudentService, private router: Router) {}

  createStudent(): void {
    // Call the student service to save the new student
    this.studentService.createStudent(this.student).subscribe(() => {
      // Navigate to the dashboard or any other page after successful creation
      this.errorMessage = '';
      this.router.navigate(['/login']);
    },
    (error) => {
      // Navigate to the dashboard or any other page after successful creation
      this.errorMessage = error;
    }
    );
  }

  cancel(): void {
    this.router.navigate(['/login']);
  }
}
