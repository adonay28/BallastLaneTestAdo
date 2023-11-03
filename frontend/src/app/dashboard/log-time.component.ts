// log-time-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LogTimeFormData } from './log-time-form.model';
import { TimesheetService } from "../timesheet.service";
import { UserService } from "../user.service";

@Component({
  selector: 'app-log-time-dialog',
  templateUrl: './log-time-dialog.component.html',
})
export class LogTimeDialogComponent {
  formData: LogTimeFormData = new LogTimeFormData(new Date(), '', '', 0 , 0);
  taskCategories: any = {};

  constructor(
    public dialogRef: MatDialogRef<LogTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private timesheetService: TimesheetService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.timesheetService.getAllCategories().subscribe(data => {
        this.taskCategories = data;
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  logTime(): void {
    // Perform the time logging logic here using this.formData
    this.formData.courseId = this.data.course.id;
    this.formData.studentId = this.userService.getUserId();
    this.timesheetService.createLogtime(this.formData).subscribe(data => {
        console.log('registered time : ',data);
        this.dialogRef.close('confirm');
      });
  }
}