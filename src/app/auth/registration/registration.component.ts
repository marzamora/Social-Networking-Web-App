import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registrationForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  

  regUser() {
    this.auth.createUser(this.registrationForm.value).then( res=> {
      this.router.navigate(['home']);
    }, error => {
      console.log(error);
    });
  }

}
