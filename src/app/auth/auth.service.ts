import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { User } from '../user/user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  newUser: User;
  isLoggedIn: boolean;
  user: User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )

   }

  // Create user with email and password
  createUser(user) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then( userCredential => {
      if (userCredential) {
        this.newUser = userCredential.user;
        this.updateUserData(this.newUser);
      }
      userCredential.user.updateProfile({
        displayName: user.firstName + " " + user.lastName
      }).then( () => {
        this.updateUserData(this.newUser);
      }).catch( error => {
        console.log('Error updating displayName.')
      });
    }).catch( error => {
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
  
  updateUserData({uid, email, photoURL, displayName}: User) {

    const userRef: AngularFirestoreDocument<User> = this.db.doc<User>(`users/${uid}`);

    const data = {
      uid,
      email,
      photoURL,
      displayName
    }
    
    return userRef.set(data, { merge: true} );
  }

  // TODO: Delete this maybe or update it it
  isAuthenticated(): boolean {
    console.log('Current user: ' + this.user);
    return this.user !== null;
  }

  getCurrentUserData(): User {
    return this.afAuth.auth.currentUser;
  }

  // waits for popup to resolve
  async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.router.navigate(['/']);
    return this.updateUserData(credential.user);
  }

}
