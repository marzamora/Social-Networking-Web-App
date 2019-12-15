import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  newUser: any;
  isLoggedIn: boolean;
  currentUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    // Observer attached to global auth object
    this.afAuth.auth.onAuthStateChanged( user => {
      if(user) {
        console.log('uid: ' + user.uid);
        this.currentUser = user;
        this.isLoggedIn = true;
      } else {
        console.log('User is signed out');
        this.currentUser = null;
        this.isLoggedIn = false;
      }
    });
   }

  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then( userCredential => {
      this.newUser = user;
      console.log(userCredential);
      console.log('Success!')
      // insert user record
      this.insertUserData(this.newUser);
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

  insertUserData(userCredential: firebase.auth.UserCredential) {
    this.db.collection('users').add({
      first: this.newUser.firstName,
      last: this.newUser.lastName,
      email: this.newUser.email
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  getUser() {
    return this.currentUser;
  }

}
