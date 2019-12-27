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
  currentUser: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    // Observable attached to global auth object
    this.afAuth.auth.onAuthStateChanged( (user) => {
      if(user) {
        console.log('uid: ' + user.uid);
        this.currentUser = user;
      } else{
        this.currentUser = null;
        console.log('User is succesfully signed out!');
      }
    });

   }

  // Create user with email and password
  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then( userCredential => {
      this.newUser = user;
      console.log(userCredential);
      console.log('Success!');
      userCredential.user.updateProfile({
        displayName: user.firstName + ' ' + user.lastName
      }).catch( error => {
        console.log('Error updating displayName.')
      });
      // insert user record
      this.insertUserData(this.newUser);
      // Navigate to home after registering
      this.router.navigate(['']);
    })
    .catch( error => {
      console.log(error)
    });
  }
  // User login
  login(user) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then( userCredential => {
      if(userCredential){
        this.router.navigate(['']);
      }
    })
    .catch( error => {
      // On failure
      console.log(error);
    });
  }
  // User logout
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
  // Add user doc to firestore TODO: refactor to setUserData
  insertUserData(userCredential: firebase.auth.UserCredential) {
    this.db.collection('users').add({
      first: this.newUser.firstName,
      last: this.newUser.lastName,
      email: this.newUser.email
    });
  }
  
  isAuthenticated(): boolean {
    console.log('Current user: ' + this.currentUser);
    return this.currentUser !== null;
  }

  getUser() {
    return this.currentUser;
  }

  // waits for popup to resolve
  async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.insertUserData(credential);
  }

}
