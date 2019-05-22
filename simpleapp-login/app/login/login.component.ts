import { Component, OnInit } from '@angular/core';
import { BackendService, User } from '~/shared/backend.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {

  user: User;
  
  constructor(private backendService:BackendService, private router:Router) {
    this.user = new User();
    this.user.username = "rhenkmann0";
    this.user.password = "pass";
  }

  ngOnInit() {
  }

  login(){
    console.log(JSON.stringify(this.user));
    this.backendService.login(this.user).subscribe(
      data => {
        console.log('login success', JSON.stringify(data));
        this.router.navigate(["/home"]);
      },
      error => alert('Something went wrong '+ JSON.stringify(error))
    );
  }
}
