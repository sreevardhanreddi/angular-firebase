import { FirebaseAuthService } from './../shared/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [FirebaseAuthService]
})
export class HeaderComponent implements OnInit {
  constructor(public fbs: FirebaseAuthService) {}

  ngOnInit() {}

  display(): boolean {
    console.log('header', this.fbs.isSignedIn);
    return this.fbs.isSignedIn;
  }

  logOut() {
    this.fbs.logout();
  }
}
