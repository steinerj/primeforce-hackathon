import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwingService, User } from '../swing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user: User = {
    username: 'rbezarra2',
    password: 'pass'
  };

  public showPassword = false;

  constructor(
    private router: Router,
    private swing: SwingService,
  ) { }

  public login() {
    this.swing.login(this.user)
    .subscribe(
      _ => this.onLoggedIn(),
      err => this.onError(err)
    );
  }

  private onLoggedIn() {
    // alert('loggedIn');
    this.router.navigate(['/providers']);
  }

  private onError(err) {
    console.error(`err: ${JSON.stringify(err)}`);
    if (err.status === 400) {
      alert('Failed to log in');
    }
  }
}
