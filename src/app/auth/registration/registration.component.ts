import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  registrationForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  regUser() {
    this.auth.createUser(this.registrationForm.value);
  }

}
