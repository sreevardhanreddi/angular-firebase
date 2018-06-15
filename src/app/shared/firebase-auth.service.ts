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

  public tokenfb: string = '';
  public isSignedIn = false;
  private currentUser: firebase.User;

  register(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/signin']);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/']);
      this.isSignedIn = true;
      console.log('login isSignedIn =>', this.isSignedIn);
      firebase
        .auth()
        .currentUser.getIdToken()
        .then((token: string) => {
          this.tokenfb = token;
          this.isSignedIn = true;
          console.log('token ==>' + this.tokenfb);
          console.log('token ==>' + this.tokenfb.length);
        });
    });
  }
  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.tokenfb = null;
      this.router.navigate(['/home']);
      this.isSignedIn = false;
    });
  }

  isLoggedIn() {
    console.log('isSignedIn loggedIn => ', this.isSignedIn);
    return this.isSignedIn;
  }

  isAuthenticated(): boolean {
    // console.log('isAuthenticated()', this.tokenfb.length > 0);
    // console.log('isAuthenticated token ', this.tokenfb);
    // return this.tokenfb.length > 0;
    console.log('isSignedIn =>', this.isSignedIn);
    return this.isSignedIn;
  }
}
