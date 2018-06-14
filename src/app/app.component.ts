import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseAuthService } from './shared/firebase-auth.service';
import { FirebaseDataService } from './shared/firebase-data.service';
import { Todos } from './shared/model/todo.model';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  items: string;

  itemsRef: AngularFireList<any>;
  TodosList: Observable<Todos[]>;
  userId: string;
  constructor(
    private afd: AngularFireDatabase,
    private fbds: FirebaseDataService,
    private fbs: FirebaseAuthService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
      this.itemsRef = this.afd.list(`/todos/${this.userId}/`);
      this.TodosList = this.itemsRef
        .snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
    });
  }

  ngOnInit() {}

  display(): boolean {
    return this.fbs.isSignedIn;
  }

  onAdd() {
    this.fbds.addToList(this.items);
  }

  onRemove(key) {
    console.log(key);
    this.fbds.removeFromList(key);
  }
}
