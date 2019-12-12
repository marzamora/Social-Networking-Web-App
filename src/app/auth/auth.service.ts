import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  newUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { }

  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then( userCredential => {
      this.newUser = user;
      console.log(userCredential);
      console.log('Success!')
    })
    .catch( error => {
      console.log(error)
    });
  }

  login(user) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then( userCredential => {
      if(userCredential){
        this.router.navigate(['/']);
      }
    })
    .catch( error => {
      // On failure
      console.log(error);
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
