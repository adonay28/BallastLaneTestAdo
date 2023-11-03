import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    this.userService.login(this.username, this.password).subscribe(
      (user: any) => {
        console.log('Login successful', user);
        // Redirect or perform actions based on successful login
        this.userService.setAuthenticationStatus(true);
        this.userService.setRoles(user.authorities);
        this.userService.setUserData(user);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
        // Handle authentication error
      }
    );
  }
  navigateToCreateStudent(): void {
    // Navigate to the create student page
    this.router.navigate(['/create-student']);
  }
}