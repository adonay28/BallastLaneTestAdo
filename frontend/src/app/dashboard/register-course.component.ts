import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../student.service';
import { UserService } from "../user.service";

@Component({
  selector: 'app-registration-dialog',
  template: `
    <h2 mat-dialog-title>Confirm Registration</h2>
    <mat-dialog-content>
      Are you sure you want to register for the course "{{ data.course.name }}"?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button color="primary" (click)="onYesClick()">Register</button>
    </mat-dialog-actions>
  `,
})
export class RegistrationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RegistrationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course: any },
    private studentService: StudentService,
    private userService: UserService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.studentService.registerCourse(this.userService.getUserId(), this.data.course.id).subscribe(data => {
        console.log('registered: ',data);
        this.dialogRef.close('confirm');
      });
  }
}