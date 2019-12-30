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

  socialProvider: string;

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
    this.router.navigate(['/']);
  }

  recieveSocialSignIn($event) {
    this.socialProvider = $event;
    switch (this.socialProvider) {
      case "google":
        this.auth.signInWithGoogle();
        break;
      case "facebook":
        break;
      default:
        break;
    }
  }
}
