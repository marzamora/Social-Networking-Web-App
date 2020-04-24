import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { User } from '../user/user.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  newUser: any;
  isLoggedIn: boolean;
  user: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    // Observable attached to global auth object
    this.afAuth.auth.onAuthStateChanged( (user) => {
      if(user) {
        this.user = user;
        console.log('uid: ' + user.uid);
        console.log('USER', user);
      } else{
        this.user = null;
        console.log('No user is logged in.');
      }
    });

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        }
      })
    )

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
      this.updateUserData(this.newUser);
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
  // Add user doc to firestore 
  // TODO: refactor to setUserData
  updateUserData({uid, email, photoURL, displayName}: User) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc<User>(`users/${uid}`);

    const data = {
      uid,
      email,
      photoURL,
      displayName
    }
  }
  
  isAuthenticated(): boolean {
    console.log('Current user: ' + this.user);
    return this.user !== null;
  }

  getUser() {
    return this.user;
  }

  // waits for popup to resolve
  async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.router.navigate(['/']);
    return this.updateUserData(credential.user);
  }

}
