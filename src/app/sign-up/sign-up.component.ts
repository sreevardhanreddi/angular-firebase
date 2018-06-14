import { FirebaseAuthService } from './../shared/firebase-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private fbs: FirebaseAuthService) {}

  ngOnInit() {}

  signUp(email, password) {
    console.log(email, password);
    this.fbs.register(email, password);
  }
}
