export class LogTimeFormData {
  date: Date;
  taskCategory: string;
  taskDescription: string;
  courseId: number;
  studentId: number;

  constructor(date: Date, taskCategory: string, taskDescription: string, courseId: number, studentId: number) {
    this.date = date;
    this.taskCategory = taskCategory;
    this.taskDescription = taskDescription;
    this.courseId = courseId;
    this.studentId = studentId;
  }
}