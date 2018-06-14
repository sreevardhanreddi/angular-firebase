import { AngularFireAuth } from 'angularfire2/auth';
import { Todos } from './model/todo.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  itemsRef: AngularFireList<Todos>;
  public userId: string;

  constructor(
    private afd: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
      this.itemsRef = this.afd.list(`/todos/${this.userId}/`);
    });
  }

  addToList(newName: string) {
    this.itemsRef.push({ name: newName });
  }

  removeFromList(key: string) {
    this.itemsRef.remove(key);
  }
}
