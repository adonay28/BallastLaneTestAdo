import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { CoursesComponent } from "./courses/courses.component";
import { CreateCourseComponent } from "./create-course/create-course.component";
import { TimesheetComponent } from "./timesheet/timesheet.component";
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Add other routes with AuthGuard
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] , data: { expectedRole: 'ROLE_admin' }},
      { path: 'create-course', component: CreateCourseComponent, canActivate: [AuthGuard] , data: { expectedRole: 'ROLE_admin' }},
      { path: 'timesheet', component: TimesheetComponent, canActivate: [AuthGuard] , data: { expectedRole: 'ROLE_student' }}
    ]
  },
  { path: 'create-student', component: CreateStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
