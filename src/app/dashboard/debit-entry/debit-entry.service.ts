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
  addDebit(debit: any, plotNum: string, memNum: string) {
    this.db.database.ref(`plots/${plotNum}-${memNum}/debits`).push(debit)
    .then(_ => {
      console.log('debit pushed');
    }).catch(err => {
      console.log(err);
    });
  }
}
