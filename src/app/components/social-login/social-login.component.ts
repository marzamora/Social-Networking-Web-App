import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

  provider: string = "";

  @Output() socialSignInEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  sendSocialSignIn(provider: string) {
    switch (provider) {
      case "google":
        this.provider = "google";
        break;
      default:
        console.log("Provider switch is broken.")
        break;
    }    
    this.socialSignInEvent.emit(this.provider);
  }

}
