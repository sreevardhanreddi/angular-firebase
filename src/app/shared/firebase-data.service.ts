import { Todos } from './model/todo.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  itemsRef: AngularFireList<Todos>;

  constructor(private afd: AngularFireDatabase) {
    this.itemsRef = afd.list('/todos');
  }

  addToList(newName: string) {
    this.itemsRef.push({name: newName});
  }

  removeFromList(key: string) {
    this.itemsRef.remove(key);
  }
}
