import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  public token: string;
  public isSignedIn = false;
  private currentUser: firebase.User;

  register(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/']);
      this.isSignedIn = true;
      console.log(this.isSignedIn);
      firebase
        .auth()
        .currentUser.getIdToken()
        .then((token: string) => {
          this.token = token;
          console.log('token ==>' + this.token);
        });
    });
  }
  logout() {
    this.token = null;
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }

  isLoggedIn() {
    if (this.currentUser == null) {
      // console.log(this.currentUser);
      return false;
    }
    // console.log(this.currentUser);
    return true;
  }

  isAuthenticated() {
    console.log('isAuthenticated()', this.token != null);
    return this.token != null;
  }
}
