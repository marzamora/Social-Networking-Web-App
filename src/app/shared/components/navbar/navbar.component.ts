import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isNavbarOpen: boolean = false;

  constructor(public auth: AuthService) { }

  ngOnInit(): void { }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  signOut() {
    console.log("Signing out ...");
    this.auth.logout();
  }

}
