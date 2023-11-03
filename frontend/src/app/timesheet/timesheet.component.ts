import { Component } from '@angular/core';
import { TimesheetService } from "../timesheet.service";
import { UserService } from "../user.service";
import { StudentService } from "../student.service";

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent {
  selectedCourse: any = {};
  timesheetData: any[] = [];
  courses: any[] = [];

  constructor(private timesheetService: TimesheetService, private userService: UserService,
    private studentService: StudentService) {}

  
  ngOnInit() {
    this.getRegisteredCourses();
  }

  fetchTimesheet(): void {
    if (this.selectedCourse) {
      this.timesheetService.getTimesheet( this.userService.getUserId(), this.selectedCourse.id).subscribe(
        (data) => {
          this.timesheetData = data;
        },
        (error) => {
          console.error('Error fetching timesheet:', error);
        }
      );
    }
  }

  getRegisteredCourses() {
    this.studentService.getAllRegisteredCourses(this.userService.getUserId()).subscribe(data => {
      this.courses = data;
    });
  }

  deleteTimesheetEntry(entryId: number): void {
    this.timesheetService.deleteTimesheet(entryId).subscribe(
      () => {
        // Remove the deleted entry from the displayed data
        this.timesheetData = this.timesheetData.filter((entry) => entry.id !== entryId);
      },
      (error) => {
        console.error('Error deleting timesheet entry:', error);
      }
    );
  }

}
