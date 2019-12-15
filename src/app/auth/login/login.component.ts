import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    this.auth.login(this.loginForm.value);
  }

  goHome() {
    this.router.navigate(['']);
  }

}
