import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DebitEntryService {

  constructor(private db: AngularFireDatabase) { }

  getPlotNumbers() {
    return this.db.list('/plots').valueChanges();
  }
}
