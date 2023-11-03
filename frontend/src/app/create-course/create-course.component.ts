import { Component } from '@angular/core';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  newCourseName: string = '';

  constructor(private courseService: CourseService, private router: Router) { }

  createCourse() {
    const newCourse = { name: this.newCourseName };

    this.courseService.createCourse(newCourse).subscribe(() => {
      // Do something after course creation if needed
      this.router.navigate(['/dashboard/courses']);
    });
  }
}
