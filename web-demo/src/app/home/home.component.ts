import { Component, OnInit } from '@angular/core';
import { User, SwingService } from '../swing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user: User = { username: 'rhenkmann0', password: 'pass' };

  public projects$: Observable<any[]>;
  public users$: Observable<any[]>;
  public providers$: Observable<any[]>;

  constructor(public swing: SwingService) { }

  ngOnInit() {
    this.projects$ = this.swing.getProjects();
    this.users$ = this.swing.getUsers();
    this.providers$ = this.swing.getProviders();
  }

  login() {
    this.swing.login(this.user)
    .subscribe(
      _ => alert('logged in'),
      err => {
        console.error(`err: ${JSON.stringify(err)}`);
        if (err.status === 400) {
          alert('Failed to log in');
        }
      }
    );
  }
}
