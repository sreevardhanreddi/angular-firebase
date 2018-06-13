import { FirebaseAuthService } from './../shared/firebase-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [FirebaseAuthService]
})
export class SignInComponent implements OnInit {
  constructor(private fbs: FirebaseAuthService) {}

  ngOnInit() {}

  onSignIn(email, password) {
    console.log(email, password);
    console.log(this.fbs.isSignedIn);
    this.fbs.login(email, password);
  }
}
